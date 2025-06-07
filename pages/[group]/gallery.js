import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Upload, Heart, Download, Camera, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export async function getStaticPaths() {
  return {
    paths: ACCESS_GROUPS.map((g) => ({ params: { group: g.key.toLowerCase() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const group = params.group.toLowerCase();
  const valid = ACCESS_GROUPS.map((g) => g.key.toLowerCase());
  if (!valid.includes(group)) return { notFound: true };
  return { props: { group } };
}

export default function GalleryPage({ group }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('unknown');

  useEffect(() => {
    testConnection();
    fetchPhotos();
  }, []);

  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
      console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
      
      // Test database connection
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('Database connection error:', error);
        setConnectionStatus(`database_error: ${error.message}`);
      } else {
        console.log('Database connection successful');
        
        // Test storage bucket access
        try {
          const { data: files, error: bucketError } = await supabase.storage
            .from('gallery-photos')
            .list('', { limit: 1 });
          
          if (bucketError) {
            console.error('Bucket access error:', bucketError);
            if (bucketError.message.includes('not found')) {
              setConnectionStatus('bucket_missing');
            } else {
              setConnectionStatus(`bucket_error: ${bucketError.message}`);
            }
          } else {
            console.log('Storage bucket accessible');
            setConnectionStatus('connected');
          }
        } catch (storageError) {
          console.error('Storage test failed:', storageError);
          setConnectionStatus('storage_error');
        }
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('failed');
    }
  };

  const fetchPhotos = async () => {
    try {
      console.log('Fetching photos from Supabase...');
      console.log('Supabase client initialized:', !!supabase);
      console.log('Environment check:', {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      });
      
      // Test basic connection first
      const { data: testData, error: testError } = await supabase
        .from('gallery_photos')
        .select('count', { count: 'exact', head: true });
      
      if (testError) {
        console.error('Connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      // Now fetch the actual data
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase query error:', error);
        throw new Error(`Database query failed: ${error.message}`);
      }
      
      console.log('Photos fetched successfully:', data?.length || 0);
      setPhotos(data || []);
      
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
      
      // More detailed error message
      if (error.message.includes('Failed to fetch')) {
        alert('Network error: Unable to connect to the database. Please check your internet connection and try again.');
      } else {
        alert(`Error loading photos: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) {
        setUploading(false);
        return;
      }

      console.log('Starting upload for file:', file.name);

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        setUploading(false);
        return;
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading to path:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Save to database
      const { data: dbData, error: dbError } = await supabase
        .from('gallery_photos')
        .insert([{
          url: publicUrl,
          file_path: filePath,
          uploaded_by: group,
          file_name: file.name,
          created_at: new Date().toISOString()
        }])
        .select();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      console.log('Database insert successful:', dbData);

      // Refresh photos
      await fetchPhotos();
      
      // Show success message
      alert('Photo uploaded successfully!');

    } catch (error) {
      console.error('Error uploading photo:', error);
      
      // More detailed error messaging
      if (error.message.includes('Failed to fetch')) {
        alert('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('row-level security')) {
        alert('Permission error: Unable to upload photo. Please contact the administrator.');
      } else if (error.message.includes('storage')) {
        alert('Storage error: Unable to save photo to cloud storage. Please try again.');
      } else {
        alert(`Error uploading photo: ${error.message}. Please check console for details.`);
      }
    } finally {
      setUploading(false);
    }
  };

  const downloadPhoto = async (photo) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = photo.file_name || 'wedding-photo.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading photo:', error);
    }
  };

  const deletePhoto = async (photo) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery-photos')
        .remove([photo.file_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photo.id);

      if (dbError) {
        console.error('Database delete error:', dbError);
        throw dbError;
      }

      // Refresh photos
      await fetchPhotos();
      alert('Photo deleted successfully!');

    } catch (error) {
      console.error('Error deleting photo:', error);
      alert(`Error deleting photo: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 relative bg-cream">
        <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <Camera className="w-8 h-8 text-burgundy" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-4">Wedding Memories</h1>
          <p className="text-navy/70 mb-4 sm:mb-6 text-sm sm:text-base px-2">
            Share your favorite moments from our special day! Upload photos and browse memories captured by family and friends.
          </p>
          


          {/* Upload Button */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <label className="inline-flex items-center px-4 sm:px-6 py-3 bg-burgundy text-ivory rounded-lg cursor-pointer hover:bg-burgundy/90 transition-colors text-sm sm:text-base">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {uploading ? 'Uploading...' : 'Add Photos'}
              <input
                type="file"
                accept="image/*"
                onChange={uploadPhoto}
                disabled={uploading}
                className="hidden"
                multiple={false}
              />
            </label>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy"></div>
            <p className="mt-2 text-navy/70">Loading photos...</p>
          </div>
        )}

        {/* Connection Status */}
        {!loading && connectionStatus !== 'connected' && connectionStatus !== 'unknown' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Connection Issue:</strong> {connectionStatus}
            </p>
            <p className="text-red-600 text-xs mt-1">
              Photo uploads and viewing may not work properly. Please refresh the page or contact support.
            </p>
          </div>
        )}



        {/* Photo Grid */}
        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group bg-ivory rounded-lg overflow-hidden shadow-lg cursor-pointer"
                style={{ aspectRatio: '1', minHeight: '150px' }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.url}
                  alt="Wedding memory"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 sm:gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPhoto(photo);
                    }}
                    className="p-1 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 text-navy" />
                  </button>
                  {/* Only show delete button if uploaded by current group */}
                  {photo.uploaded_by === group && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePhoto(photo);
                      }}
                      className="p-1 sm:p-2 bg-red-500/90 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-navy/30 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-navy mb-2">No photos yet</h3>
            <p className="text-navy/70">Be the first to share a beautiful memory!</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedPhoto.url}
                alt="Wedding memory"
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
              <button
                onClick={() => downloadPhoto(selectedPhoto)}
                className="absolute bottom-4 right-4 p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <Download className="w-5 h-5 text-navy" />
              </button>
            </div>
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

GalleryPage.noLayout = true; 