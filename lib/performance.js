// lib/performance.js
// Performance optimization utilities for the wedding website

// Image optimization utilities
export const getOptimizedImageUrl = (url, width = 800, quality = 75) => {
  // For Supabase storage URLs, add transformation parameters
  if (url.includes('supabase')) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('width', width);
    urlObj.searchParams.set('quality', quality);
    return urlObj.toString();
  }
  return url;
};

// Lazy loading intersection observer
export const createLazyLoader = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce utility for search and scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
};

// Image compression before upload
export const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Photo batch processing for gallery
export const processBatch = async (items, batchSize = 5, processor) => {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
    
    // Small delay between batches to prevent overwhelming
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  return results;
};

// Virtual scrolling helper for large lists
export const calculateVisibleItems = (scrollTop, itemHeight, containerHeight, totalItems) => {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    totalItems - 1
  );
  
  return {
    startIndex: Math.max(0, startIndex),
    endIndex,
    visibleItems: endIndex - startIndex + 1
  };
};

// Performance metrics collection
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    try {
      const result = await fn(...args);
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${name} failed after ${end - start} milliseconds:`, error);
      throw error;
    }
  };
};

// Connection quality detection
export const getConnectionQuality = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  return null;
};

// Adaptive loading based on connection
export const getAdaptiveSettings = () => {
  const connection = getConnectionQuality();
  
  if (!connection) {
    return { quality: 75, batchSize: 10, preload: true };
  }

  switch (connection.effectiveType) {
    case 'slow-2g':
    case '2g':
      return { quality: 40, batchSize: 3, preload: false };
    case '3g':
      return { quality: 60, batchSize: 5, preload: false };
    case '4g':
    default:
      return { quality: 80, batchSize: 10, preload: true };
  }
}; 