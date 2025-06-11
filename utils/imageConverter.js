// Utility to handle HEIC file detection and provide user guidance
export const isHEICFile = (file) => {
  if (!file) return false;
  
  // Check file extension
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
    return true;
  }
  
  // Check MIME type (some browsers may provide this)
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    return true;
  }
  
  return false;
};

// Get user-friendly message about HEIC files
export const getHEICMessage = () => {
  return {
    title: "HEIC File Detected",
    message: "HEIC files cannot be displayed in web browsers. Please convert to JPG or PNG first, or use a different photo.",
    suggestions: [
      "On iPhone: Go to Settings > Camera > Formats > Choose 'Most Compatible'",
      "Convert using online tools like CloudConvert or HEICtoJPEG",
      "Use photo editing apps that support HEIC conversion"
    ]
  };
};

// Detect if browser supports HEIC (currently none do natively)
export const browserSupportsHEIC = () => {
  return false; // No browsers currently support HEIC natively
};

// Alternative: Client-side conversion (would require additional libraries)
// This is a placeholder for future implementation
export const convertHEICToJPG = async (file) => {
  throw new Error("HEIC conversion not implemented. Please convert the file manually before uploading.");
}; 