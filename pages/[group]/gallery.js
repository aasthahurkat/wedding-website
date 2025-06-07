import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Heart, Download, Camera, ChevronLeft, ChevronRight, X, ExternalLink, Upload } from 'lucide-react';
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('unknown');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [photosPerPage] = useState(20);

  // Touch handling for swipe navigation
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    testConnection();
    fetchPhotos();
  }, [currentPage]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedPhotoIndex !== null) {
        if (e.key === 'Escape') {
          setSelectedPhotoIndex(null);
        } else if (e.key === 'ArrowLeft') {
          navigatePhoto('prev');
        } else if (e.key === 'ArrowRight') {
          navigatePhoto('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhotoIndex, photos]);

  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      const { error } = await supabase
        .from('gallery_photos')
        .select('count', { count: 'exact', head: true });

      if (error) {
        console.error('Database connection error:', error);
        setConnectionStatus(`database_error: ${error.message}`);
      } else {
        console.log('Database connection successful');
        
        // Test storage bucket access
        try {
          const { error: bucketError } = await supabase.storage
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
      
      // Get total count first
      const { count, error: countError } = await supabase
        .from('gallery_photos')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw new Error(`Count query failed: ${countError.message}`);
      }

      setTotalPhotos(count || 0);

      // Fetch paginated photos with limit and offset
      const from = (currentPage - 1) * photosPerPage;
      const to = from + photosPerPage - 1;

      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw new Error(`Database query failed: ${error.message}`);
      }

      console.log(`Photos fetched successfully: ${data?.length || 0} of ${count} total`);
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
      alert(`Error loading photos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (event) => {
    try {
      setUploading(true);
      const files = Array.from(event.target.files);
      
      if (files.length === 0) {
        setUploading(false);
        return;
      }

      // Limit number of files that can be uploaded at once
      const filesToUpload = files.slice(0, 5);
      
      if (filesToUpload.length < files.length) {
        alert(`Only uploading ${filesToUpload.length} photos at a time for best performance.`);
      }

      for (const file of filesToUpload) {
        console.log('Starting upload for file:', file.name);

        // Check file size (limit to 5MB for better performance)
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Please keep files under 5MB for better performance.`);
          continue;
        }

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file. Only images are allowed.`);
          continue;
        }

        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('gallery-photos').getPublicUrl(filePath);

        // Save to database
        const { data: dbData, error: dbError } = await supabase
          .from('gallery_photos')
          .insert([
            {
              url: publicUrl,
              file_path: filePath,
              uploaded_by: group,
              file_name: file.name,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }
      }
      
      // Refresh photos
      await fetchPhotos();

      alert(`${filesToUpload.length} photo(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(`Error uploading photo: ${error.message}`);
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
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

  // Touch event handlers for swipe navigation
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedPhotoIndex < photos.length - 1) {
      // Swipe left = next photo
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      // Swipe right = previous photo
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const navigatePhoto = (direction) => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(photos.length - 1, selectedPhotoIndex + 1)
      : Math.max(0, selectedPhotoIndex - 1);
    
    setSelectedPhotoIndex(newIndex);
  };

  const openModal = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const totalPages = Math.ceil(totalPhotos / photosPerPage);
  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 relative bg-cream">
        <div
          className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <Camera className="w-8 h-8 text-burgundy" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-navy mb-4">Wedding Memories</h1>
            <p className="text-navy/70 mb-4 sm:mb-6 text-sm sm:text-base px-2">
              Share your favorite moments from our special day! Browse memories and add your photos.
            </p>
            
            {/* Upload Guidelines */}
            <div className="mb-6 bg-burgundy/5 rounded-lg p-4 max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-navy/80 text-sm mb-3">
                  <strong>📸 Share Your Photos:</strong>
                </p>
                                <div className="text-navy/70 text-xs space-y-2 leading-relaxed">
                  <p><strong>Gallery:</strong> Upload your best 5-10 photos here for immediate display (JPG, PNG, HEIC files under 5MB each)</p>
                 <p><strong>Google Drive:</strong> This is where you can share everything—all your photos, videos, and candid moments without any limits. We can't wait to relive the celebrations through your eyes!</p></div>
              </div>
            </div>

            {/* Upload Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              
              {/* Gallery Upload Button */}
              <label className="inline-flex items-center px-6 py-3 bg-burgundy text-ivory rounded-lg cursor-pointer hover:bg-burgundy/90 transition-colors text-sm font-medium shadow-sm">
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Add Photos to Gallery'}
                <input
                  type="file"
                  accept="image/*,.heic,.HEIC"
                  onChange={uploadPhoto}
                  disabled={uploading}
                  className="hidden"
                  multiple
                />
              </label>

              {/* Google Drive Button */}
              <a 
                href="https://drive.google.com/drive/folders/your-folder-id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-navy text-ivory rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium shadow-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Upload to Google Drive (Coming Soon)
              </a>

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
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative group bg-ivory rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    style={{ aspectRatio: '1', minHeight: '120px' }}
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={photo.url}
                      alt="Wedding memory"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPhoto(photo);
                        }}
                        className="p-1 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 text-navy" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 bg-burgundy text-ivory rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  <span className="text-navy">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 bg-burgundy text-ivory rounded-lg disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && photos.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-navy/30 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-navy mb-2">No photos yet</h3>
              <p className="text-navy/70 mb-4">Be the first to share a beautiful memory!</p>
            </div>
          )}

          {/* Enhanced Photo Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
              onClick={closeModal}
            >
              {/* Modal Content Container */}
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-60 text-white bg-black/60 hover:bg-black/80 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                {photos.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePhoto('prev');
                      }}
                      disabled={selectedPhotoIndex === 0}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePhoto('next');
                      }}
                      disabled={selectedPhotoIndex === photos.length - 1}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Photo Container - Fixed sizing with swipe support */}
                <div 
                  className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    src={selectedPhoto.url}
                    alt="Wedding memory"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ maxWidth: '90vw', maxHeight: '80vh' }}
                  />
                  
                  {/* Download Button */}
                  <button
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                  >
                    <Download className="w-5 h-5 text-navy" />
                  </button>

                  {/* Photo Counter */}
                  {photos.length > 1 && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                      {selectedPhotoIndex + 1} of {photos.length}
                    </div>
                  )}
                </div>
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
