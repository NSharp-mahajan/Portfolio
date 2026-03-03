// Debug sessionStorage for loading grid
console.log('=== Session Storage Debug ===');

// 1. Check current sessionStorage
const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
console.log('Current hasSeenSplash:', hasSeenSplash);

// 2. Clear sessionStorage to test loading
console.log('Clearing sessionStorage...');
sessionStorage.removeItem('hasSeenSplash');

// 3. Check again
const afterClear = sessionStorage.getItem('hasSeenSplash');
console.log('After clear:', afterClear);

// 4. Test setting sessionStorage
console.log('Setting sessionStorage...');
sessionStorage.setItem('hasSeenSplash', 'true');

// 5. Check after setting
const afterSet = sessionStorage.getItem('hasSeenSplash');
console.log('After set:', afterSet);

// 6. Instructions for testing
console.log('\n🧪 Testing Instructions:');
console.log('1. Run this script in browser console');
console.log('2. Refresh the page (F5)');
console.log('3. Should see loading grid');
console.log('4. Navigate away and back');
console.log('5. Should skip loading (direct orbital icons)');
console.log('6. Refresh again (F5)');
console.log('7. Should see loading grid again');

console.log('\n🔧 Manual Reset:');
console.log('sessionStorage.removeItem("hasSeenSplash");');
console.log('Then refresh page to test loading grid');
