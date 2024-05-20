const getImageContentType = (imageData) => {
  // Determine the content type based on the image data
  if (imageData.startsWith("data:image/jpeg")) {
    return "image/jpeg";
  } else if (imageData.startsWith("data:image/png")) {
    return "image/png";
  } else if (imageData.startsWith("data:image/jpg")) {
    return "image/jpeg";
  }
  // Default to JPEG if content type cannot be determined
  return "image/jpeg";
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });

module.exports = {
  getImageContentType,
  fileToBase64,
};
