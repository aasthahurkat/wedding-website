/**
 * Multi-Cloud Storage Manager
 * Distributes photos across multiple free tiers for maximum storage
 */

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if environment variables are available
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Storage provider configurations
const STORAGE_PROVIDERS = {
  CLOUDINARY: {
    name: 'Cloudinary',
    freeLimit: 25 * 1024 * 1024 * 1024, // 25GB
    priority: 1,
    usedFor: ['thumbnails', 'previews'],
    endpoint: process.env.CLOUDINARY_URL
  },
  
  AWS_S3: {
    name: 'AWS S3',
    freeLimit: 5 * 1024 * 1024 * 1024, // 5GB
    priority: 2,
    usedFor: ['fullSize', 'uploads'],
    config: {
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_S3_BUCKET
    }
  },
  
  GOOGLE_CLOUD: {
    name: 'Google Cloud Storage',
    freeLimit: 5 * 1024 * 1024 * 1024, // 5GB
    priority: 3,
    usedFor: ['backups', 'archives'],
    config: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
      bucket: process.env.GOOGLE_CLOUD_BUCKET
    }
  },
  
  BACKBLAZE_B2: {
    name: 'Backblaze B2',
    freeLimit: 10 * 1024 * 1024 * 1024, // 10GB
    priority: 4,
    usedFor: ['coldStorage', 'longTerm'],
    config: {
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
      applicationKey: process.env.BACKBLAZE_APPLICATION_KEY,
      bucketId: process.env.BACKBLAZE_BUCKET_ID
    }
  }
};

// Track storage usage (in production, this would be in database)
let storageUsage = {
  CLOUDINARY: 0,
  AWS_S3: 0,
  GOOGLE_CLOUD: 0,
  BACKBLAZE_B2: 0
};

/**
 * Smart storage allocation based on file type and available capacity
 */
export function selectStorageProvider(fileSize, fileType = 'photo') {
  // Priority order based on use case
  const providers = Object.entries(STORAGE_PROVIDERS)
    .sort((a, b) => a[1].priority - b[1].priority);
  
  for (const [key, provider] of providers) {
    const currentUsage = storageUsage[key];
    const remainingSpace = provider.freeLimit - currentUsage;
    
    if (remainingSpace >= fileSize) {
      return {
        provider: key,
        config: provider.config,
        remainingSpace,
        endpoint: provider.endpoint
      };
    }
  }
  
  // If all free tiers are full, use the one with most remaining space
  const fallback = providers.reduce((best, [key, provider]) => {
    const remaining = provider.freeLimit - storageUsage[key];
    return remaining > best.remaining ? { key, remaining, provider } : best;
  }, { remaining: 0 });
  
  return {
    provider: fallback.key,
    config: fallback.provider.config,
    remainingSpace: fallback.remaining,
    endpoint: fallback.provider.endpoint,
    warning: 'Approaching free tier limits'
  };
}

/**
 * Update storage usage tracking
 */
export function updateStorageUsage(provider, bytesUsed) {
  storageUsage[provider] += bytesUsed;
  
  // Log usage for monitoring
  console.log(`Storage Update - ${provider}: ${(storageUsage[provider] / 1024 / 1024 / 1024).toFixed(2)}GB used`);
  
  return storageUsage[provider];
}

/**
 * Get current storage status across all providers
 */
export function getStorageStatus() {
  return Object.entries(STORAGE_PROVIDERS).map(([key, provider]) => ({
    provider: key,
    name: provider.name,
    used: storageUsage[key],
    limit: provider.freeLimit,
    usagePercent: (storageUsage[key] / provider.freeLimit * 100).toFixed(1),
    remainingGB: ((provider.freeLimit - storageUsage[key]) / 1024 / 1024 / 1024).toFixed(2)
  }));
}

/**
 * Image optimization pipeline
 */
export async function optimizeImage(imageBuffer, options = {}) {
  const sharp = require('sharp');
  
  const sizes = {
    thumbnail: { width: 150, quality: 80 },
    preview: { width: 800, quality: 85 },
    full: { width: 1920, quality: 90 },
    ...options
  };
  
  const optimized = {};
  
  for (const [size, config] of Object.entries(sizes)) {
    optimized[size] = await sharp(imageBuffer)
      .resize(config.width, null, { withoutEnlargement: true })
      .webp({ quality: config.quality })
      .toBuffer();
  }
  
  return optimized;
}

/**
 * Upload to selected storage provider
 */
export async function uploadToProvider(provider, fileBuffer, fileName, metadata = {}) {
  try {
    switch (provider.provider) {
      case 'CLOUDINARY':
        return await uploadToCloudinary(fileBuffer, fileName, metadata);
      
      case 'AWS_S3':
        return await uploadToS3(fileBuffer, fileName, metadata, provider.config);
      
      case 'GOOGLE_CLOUD':
        return await uploadToGoogleCloud(fileBuffer, fileName, metadata, provider.config);
      
      case 'BACKBLAZE_B2':
        return await uploadToBackblaze(fileBuffer, fileName, metadata, provider.config);
      
      default:
        throw new Error(`Unsupported storage provider: ${provider.provider}`);
    }
  } catch (error) {
    console.error(`Upload failed for ${provider.provider}:`, error);
    throw error;
  }
}

// Individual provider upload functions
async function uploadToCloudinary(fileBuffer, fileName, metadata) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary not configured. Please add credentials to .env.local');
    }

    // Convert buffer to base64 for Cloudinary upload
    const base64String = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'wedding-photos',
      public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
      resource_type: 'image',
      tags: ['wedding', metadata.group || 'general'],
      context: {
        uploaded_by: metadata.uploadedBy || 'unknown',
        group: metadata.group || 'general'
      }
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      provider: 'CLOUDINARY',
      fileSize: result.bytes,
      metadata: {
        ...metadata,
        cloudinaryId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      }
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

async function uploadToS3(fileBuffer, fileName, metadata, config) {
  // Implementation needed - see setup instructions  
  throw new Error('AWS S3 not configured. See setup instructions.');
}

async function uploadToGoogleCloud(fileBuffer, fileName, metadata, config) {
  // Implementation needed - see setup instructions
  throw new Error('Google Cloud not configured. See setup instructions.');
}

async function uploadToBackblaze(fileBuffer, fileName, metadata, config) {
  // Implementation needed - see setup instructions
  throw new Error('Backblaze B2 not configured. See setup instructions.');
} 