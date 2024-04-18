import { useState, useEffect } from 'react';

const imageCache = {}; // Global object to store preloaded images

function preloadImages(folders) {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const preloadPromises = [];

    folders.forEach((folder) => {
      const folderPath = `../assets/images/${folder}`; // Assuming your folder structure

      // Get all image and GIF files from the folder (adjust extensions as needed)
      const imageExtensions = ['jpg', 'jpeg', 'png'];
      const gifExtensions = ['gif'];
      const supportedExtensions = [...imageExtensions, ...gifExtensions];

      preloadPromises.push(
        fetch(`${folderPath}`) // Get folder contents (adjust fetch logic if needed)
          .then((response) => response.text()) // Assuming text-based directory listing
          .then((text) => {
            const imageFiles = text
              .split('\n') // Split lines
              .filter((file) => supportedExtensions.includes(file.split('.').pop().toLowerCase())) // Filter based on extensions
              .map((file) => `${folderPath}/${file}`); // Build full image paths

            return Promise.all(
              imageFiles.map((imagePath) => {
                if (!imageCache[imagePath]) { // Check if already cached
                  const image = new Image();
                  image.src = imagePath;
                  imageCache[imagePath] = image; // Cache for future usage
                }
                return imageCache[imagePath].decode(); // Trigger image loading (may not be necessary)
              })
            );
          })
      );
    });

    Promise.all(preloadPromises).then(() => {
      setLoadedImages(imageCache); // Update state with cached images
    });
  }, [folders]); // Re-run useEffect if folders change

  return loadedImages;
}

// Usage:
const preloadedImages = preloadImages(['exercise_images', 'exercise_gifs', 'default_workout_images']);

// Access preloaded images:
const absBeginnerImage = preloadedImages[`../assets/images/exercise_images/abs-beginner.jpg`];
