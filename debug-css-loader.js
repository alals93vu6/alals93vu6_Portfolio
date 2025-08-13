// Debug script to test CSS loader functionality
console.log('=== CSS Loader Debug Script ===');

// Test device detection
function testDeviceDetection() {
    const MOBILE_BREAKPOINT = 768;
    const currentWidth = window.innerWidth;
    const detectedType = currentWidth >= MOBILE_BREAKPOINT ? 'desktop' : 'mobile';
    
    console.log(`Screen width: ${currentWidth}px`);
    console.log(`Detected device type: ${detectedType}`);
    
    return detectedType;
}

// Test CSS file existence
async function testCSSFileExistence() {
    const cssFiles = [
        'CSS/desktop/index/base.css',
        'CSS/desktop/index/hero.css',
        'CSS/mobile/index/base.css', 
        'CSS/mobile/index/hero.css'
    ];
    
    console.log('Testing CSS file existence...');
    
    for (const file of cssFiles) {
        try {
            const response = await fetch(file, { method: 'HEAD' });
            console.log(`✅ ${file}: ${response.status === 200 ? 'EXISTS' : 'NOT FOUND'}`);
        } catch (error) {
            console.log(`❌ ${file}: ERROR - ${error.message}`);
        }
    }
}

// Check if ResponsiveCSSLoader is available
function testLoaderAPI() {
    console.log('Testing ResponsiveCSSLoader API...');
    
    if (window.ResponsiveCSSLoader) {
        console.log('✅ ResponsiveCSSLoader is available');
        console.log('Current device type:', window.ResponsiveCSSLoader.getCurrentDeviceType());
        console.log('Is loading:', window.ResponsiveCSSLoader.isLoading());
        
        // Test force reload
        console.log('Testing force reload...');
        window.ResponsiveCSSLoader.forceReload();
    } else {
        console.log('❌ ResponsiveCSSLoader is NOT available');
    }
}

// Check loaded stylesheets
function checkLoadedStylesheets() {
    console.log('Checking currently loaded stylesheets...');
    
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach((link, index) => {
        console.log(`${index + 1}. ${link.href} (id: ${link.id || 'none'})`);
    });
}

// Main test function
function runAllTests() {
    console.log('\n=== Running All Tests ===');
    
    testDeviceDetection();
    testCSSFileExistence();
    testLoaderAPI();
    checkLoadedStylesheets();
    
    console.log('=== Tests Complete ===\n');
}

// Auto-run tests when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000);
    });
} else {
    setTimeout(runAllTests, 1000);
}

// Export for manual testing
window.debugCSSLoader = {
    testDeviceDetection,
    testCSSFileExistence,
    testLoaderAPI,
    checkLoadedStylesheets,
    runAllTests
};