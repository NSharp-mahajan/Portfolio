// Debug script to check loading bar and collage
console.log('=== Debug Loading Bar and Collage ===');

// 1. Clear localStorage
localStorage.clear();
console.log('✅ Cleared localStorage');

// 2. Check if images exist
const imageUrls = [
  '/src/assets/images/image1.jpg',
  '/src/assets/images/image2.jpg',
  '/src/assets/images/image3.jpg',
  '/src/assets/images/image4.jpg',
  '/src/assets/images/image5.jpg',
  '/src/assets/images/image6.jpg',
  '/src/assets/images/image7.jpg',
  '/src/assets/images/image8.jpg'
];

console.log('🔍 Checking image paths:');
imageUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

// 3. Reload page to see loading bar
console.log('🔄 Refresh the page to see loading bar and collage grid');
console.log('📊 Expected behavior:');
console.log('   1. Landing page with 8 images (4x2 grid)');
console.log('   2. Loading bar appears after 500ms');
console.log('   3. Progress bar fills up');
console.log('   4. Transitions to next page with orbital icons');

// 4. Manual trigger for testing
setTimeout(() => {
  console.log('⏰ 5 seconds passed - you should see loading animation');
}, 5000);
