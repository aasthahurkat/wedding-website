import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ACCESS_GROUPS } from '../../data/accessGroups';
import { Heart, Download, Camera, ChevronLeft, ChevronRight, X, ExternalLink, Upload, Check, ZoomIn, Info, AlertCircle } from 'lucide-react';
import { isHEICFile, getHEICMessage } from '../../utils/imageConverter';
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
  const router = useRouter();
  const { token } = router.query;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isChampion, setIsChampion] = useState(false);
  const [championInfo, setChampionInfo] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  
  // Filtering state removed - no longer filtering by events
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [photosPerPage] = useState(20); // 20 photos per page

  // Touch handling for swipe navigation
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Calculated values - moved before useEffect
  const totalPages = Math.ceil(totalPhotos / photosPerPage);
  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;
  const paginatedPhotos = photos.slice((currentPage - 1) * photosPerPage, currentPage * photosPerPage);

  // Custom toast function
  const showToast = (message, type = 'success') => {
    setUploadMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  // Check if user is a champion based on token
  useEffect(() => {
    if (token) {
      const validTokens = {
        'aastha-family-champion': 'Aastha Family Champion',
        'preetesh-family-champion': 'Preetesh Family Champion',
        'friends-champion-1': 'Friends Champion 1',
        'friends-champion-2': 'Friends Champion 2'
      };

      if (validTokens[token]) {
        setIsChampion(true);
        setChampionInfo({
          token: token,
          name: validTokens[token]
        });
      }
    }
  }, [token]);

  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  // Enhanced touch event handlers for swipe detection
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
    const isLeftSwipe = distance > 20;
    const isRightSwipe = distance < -20;

    if (isLeftSwipe && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const navigatePhoto = (direction) => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(photos.length - 1, selectedPhotoIndex + 1)
      : Math.max(0, selectedPhotoIndex - 1);
    
    if (newIndex !== selectedPhotoIndex) {
      setImageLoading(true);
      setSelectedPhotoIndex(newIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (selectedPhotoIndex > 0) {
          navigatePhoto('prev');
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (selectedPhotoIndex < photos.length - 1) {
          navigatePhoto('next');
        }
          break;
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto, selectedPhotoIndex, photos.length]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      let url = `/api/photos/supabase?group=${group}&page=${currentPage}&limit=${photosPerPage}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
        setTotalPhotos(data.totalCount || 0);
      } else {
        console.error('Failed to fetch photos');
        // Fall back to legacy API if Supabase fails
        await fetchPhotosLegacy();
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Fall back to legacy API if error
      await fetchPhotosLegacy();
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotosLegacy = async () => {
    try {
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
        setTotalPhotos(data.photos?.length || 0);
      } else {
        console.error('Legacy API also failed:', response.status);
        setPhotos([]);
        setTotalPhotos(0);
      }
    } catch (error) {
      console.error('Error with legacy API:', error);
      setPhotos([]);
      setTotalPhotos(0);
    }
  };

  const uploadPhoto = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0 || !isChampion) return;

    setUploading(true);
    
    try {
      const filesToUpload = files.slice(0, 5);
      
      if (filesToUpload.length < files.length) {
        showToast(`Only uploading ${filesToUpload.length} photos at a time for best performance.`);
      }

      for (const file of filesToUpload) {
        if (file.size > 5 * 1024 * 1024) {
          showToast(`File ${file.name} is too large. Please keep files under 5MB.`, 'error');
          continue;
        }

        if (!file.type.startsWith('image/') && !isHEICFile(file)) {
          showToast(`${file.name} is not an image file. Only images are allowed.`, 'error');
          continue;
        }

        // Warn about HEIC files but still allow upload
        if (isHEICFile(file)) {
          const heicMsg = getHEICMessage();
          showToast(`Warning: ${file.name} is a HEIC file. It will upload but may not display properly in browsers. Consider converting to JPG first.`, 'error');
          // Continue with upload anyway - some people may want to store them
        }

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('uploaderToken', token);
        formData.append('group', group);

        const response = await fetch('/api/photos/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }
      }

      await fetchPhotos();
      showToast(`${filesToUpload.length} photo${filesToUpload.length > 1 ? 's' : ''} uploaded successfully! 🎉`);
    } catch (error) {
      console.error('Upload error:', error);
      showToast(`Failed to upload photos: ${error.message}`, 'error');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const downloadPhoto = async (photo) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = photo.filename || `wedding-photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      showToast('Photo downloaded successfully! 📱');
    } catch (error) {
      console.error('Download failed:', error);
      window.open(photo.url, '_blank');
    }
  };

  const openModal = (photo, index) => {
    setImageLoading(true);
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
    setImageLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentGroup={group} />
      <main className="flex-1 relative bg-cream">
        <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm" />
        <div className="relative z-10 pt-24 pb-12 px-4 max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif text-navy mb-4">
              Wedding Memories
            </h1>
            <p className="text-lg text-navy/80 max-w-2xl mx-auto">
              Share your favorite moments from our special day! Browse memories and add your photos.
            </p>
          </div>
            
          {/* Share Your Photos Section */}
            <div className="mb-6 bg-burgundy/5 rounded-lg p-4 max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-navy/80 text-sm mb-3">
                  <strong>📸 Share Your Photos:</strong>
                </p>
                <div className="text-navy/70 text-xs space-y-2 leading-relaxed">
                  {isChampion && (
                    <p><strong>Gallery:</strong> Upload your best 5-10 photos here for immediate display (JPG, PNG, HEIC files under 5MB each)</p>
                  )}
                  <p><strong>Google Drive:</strong> Share all your photos, videos, and candid moments with us! Upload everything to our shared drive - we can't wait to see the celebrations through your eyes!</p>
                </div>
              </div>
            </div>

            {/* Upload Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              
              {/* Gallery Upload Button */}
            {isChampion && (
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
            )}

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

          {/* Upload Progress */}
          {uploading && (
            <div className="flex items-center justify-center gap-2 text-burgundy mb-6">
              <div className="w-4 h-4 border-2 border-burgundy/30 border-t-burgundy rounded-full animate-spin"></div>
              <span>Adding your photos...</span>
            </div>
          )}

          {/* Photo Stats */}
          {!loading && photos.length > 0 && (
            <div className="flex justify-center items-center gap-4 text-sm text-navy/60 mb-8">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>{totalPhotos} photo{totalPhotos === 1 ? '' : 's'}</span>
              </div>
              {totalPages > 1 && (
                <>
                  <div>•</div>
                  <div>Page {currentPage} of {totalPages}</div>
                </>
              )}
            </div>
          )}

          {/* Photo Grid */}
          {!loading && photos.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8">
                {paginatedPhotos.map((photo, index) => {
                  const globalIndex = (currentPage - 1) * photosPerPage + index;
                  return (
                  <div
                    key={photo.id}
                      className="group relative bg-ivory rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                    style={{ aspectRatio: '1', minHeight: '120px' }}
                      onClick={() => openModal(photo, globalIndex)}
                  >
                    {photo.url?.toLowerCase().includes('.heic') ? (
                      // HEIC files are not supported by browsers - show conversion message
                      <div className="w-full h-full bg-burgundy/10 flex flex-col items-center justify-center text-center p-4">
                        <Camera className="w-8 h-8 text-burgundy/60 mb-2" />
                        <p className="text-xs text-burgundy/80 mb-1 font-medium">HEIC Photo</p>
                        <p className="text-xs text-burgundy/60">Tap to view</p>
                      </div>
                    ) : (
                      <Image
                        src={photo.url}
                        alt={photo.caption || "A moment from our wedding day"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        quality={75}
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image load error:', photo.url);
                          // For unsupported formats, show placeholder
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    )}
                    
                    {/* Error fallback for non-HEIC images */}
                    <div 
                      className="w-full h-full bg-burgundy/10 flex flex-col items-center justify-center text-center p-4" 
                      style={{ display: 'none' }}
                    >
                      <AlertCircle className="w-8 h-8 text-burgundy/60 mb-2" />
                      <p className="text-xs text-burgundy/80 mb-1 font-medium">Image Error</p>
                      <p className="text-xs text-burgundy/60">Format not supported</p>
                    </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <ZoomIn className="w-6 h-6 text-burgundy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-6 py-3 bg-burgundy text-ivory rounded-full disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 hover:bg-burgundy/90 hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-full transition-all duration-200 ${
                          currentPage === i + 1
                            ? 'bg-burgundy text-ivory shadow-lg scale-110'
                            : 'bg-burgundy/20 text-burgundy hover:bg-burgundy/30 hover:scale-105'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-6 py-3 bg-burgundy text-ivory rounded-full disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 hover:bg-burgundy/90 hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Enhanced Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-burgundy/20 border-t-burgundy rounded-full animate-spin"></div>
                <Camera className="w-6 h-6 text-burgundy absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-xl font-serif text-navy mb-2">Loading photos...</h3>
              <p className="text-navy/60 text-center max-w-md">Getting everything ready for you</p>
            </div>
          )}

          {/* Elegant Empty State */}
          {!loading && photos.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-6">
                <Heart className="w-20 h-20 text-burgundy/30 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4">Photos Coming Soon</h3>
              <p className="text-navy/70 mb-6 max-w-md mx-auto leading-relaxed">
                {isChampion 
                  ? "You're one of our trusted photo champions! Start sharing photos from our wedding day."
                  : "Our photo champions are getting ready to share moments from our celebration."
                }
              </p>
              {isChampion && (
                <p className="text-burgundy/80 text-sm">
                  Use the "Add Photos" button above to get started ✨
                </p>
              )}
            </div>
          )}

          {/* Refined Photo Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 bg-black/98 z-[9999] flex items-center justify-center backdrop-blur-lg"
              onClick={closeModal}
            >
              {/* Elegant Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="fixed top-20 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:scale-110 z-[99999] backdrop-blur-sm"
                style={{ 
                  zIndex: 99999,
                  position: 'fixed',
                  top: '80px',
                  right: '16px'
                }}
                title="Close photo (ESC)"
              >
                <X className="w-5 h-5 stroke-2" />
              </button>

              {/* Floating Download Button */}
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(selectedPhoto);
                }}
                className="fixed top-36 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:scale-110 z-[99999] backdrop-blur-sm"
                style={{ 
                  zIndex: 99999,
                  position: 'fixed',
                  top: '144px',
                  right: '16px'
                }}
                title="Download photo"
              >
                <Download className="w-5 h-5 stroke-2" />
                </button>

              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Minimal Top Bar */}
                <div className="absolute top-0 left-0 right-0 z-[10002] bg-gradient-to-b from-black/60 to-transparent p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-sm rounded-full border border-white/20">
                      Photo {selectedPhotoIndex + 1} of {photos.length}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/50 text-xs mr-16">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs border border-white/10">ESC</kbd>
                    <span className="hidden sm:inline">to close</span>
                  </div>
                </div>

                {/* Refined Navigation Arrows */}
                {selectedPhotoIndex > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePhoto('prev');
                      }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[10001] w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg opacity-70 hover:opacity-100"
                    title="Previous photo (← key)"
                    >
                    <ChevronLeft className="w-6 h-6 stroke-2" />
                    </button>
                )}

                {selectedPhotoIndex < photos.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePhoto('next');
                      }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[10001] w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg opacity-70 hover:opacity-100"
                    title="Next photo (→ key)"
                    >
                    <ChevronRight className="w-6 h-6 stroke-2" />
                    </button>
                )}

                {/* Enhanced Photo Container */}
                <div 
                  className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center p-8 sm:p-12"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  style={{ touchAction: 'pan-x' }}
                >
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {selectedPhoto.url?.toLowerCase().includes('.heic') ? (
                    // HEIC files cannot be displayed in browsers
                    <div className="max-w-md bg-black/40 backdrop-blur-md rounded-lg p-8 text-center border border-white/20">
                      <Camera className="w-16 h-16 text-white/70 mx-auto mb-4" />
                      <h3 className="text-xl text-white mb-2 font-serif">HEIC Photo</h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        This photo is in HEIC format and cannot be displayed in web browsers. 
                        HEIC files need to be converted to JPG/PNG to be viewed online.
                      </p>
                      <button
                        onClick={() => downloadPhoto(selectedPhoto)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy/90 text-white rounded-full transition-all duration-200 hover:scale-105"
                      >
                        <Download className="w-4 h-4" />
                        Download Original
                      </button>
                    </div>
                  ) : (
                    <img
                      src={selectedPhoto.url}
                      alt="Wedding memory"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ease-out"
                      style={{ 
                        maxWidth: '90vw', 
                        maxHeight: '80vh',
                        filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.4))',
                        opacity: imageLoading ? 0 : 1,
                        transform: imageLoading ? 'scale(0.95)' : 'scale(1)'
                      }}
                      onLoad={() => setImageLoading(false)}
                      onError={() => {
                        setImageLoading(false);
                        console.error('Modal image load error:', selectedPhoto.url);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="fixed top-24 right-4 z-[60] animate-in slide-in-from-right duration-300">
              <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl backdrop-blur-sm border ${
                uploadMessage.includes('Failed') || uploadMessage.includes('too large') || uploadMessage.includes('not an image') 
                  ? 'bg-red-500/95 text-white border-red-400/50' 
                  : 'bg-green-500/95 text-white border-green-400/50'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  uploadMessage.includes('Failed') || uploadMessage.includes('too large') || uploadMessage.includes('not an image')
                    ? 'bg-red-400' 
                    : 'bg-green-400'
                }`}>
                  {uploadMessage.includes('Failed') || uploadMessage.includes('too large') || uploadMessage.includes('not an image') ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{uploadMessage}</p>
                </div>
                <button 
                  onClick={() => setShowSuccessToast(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
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