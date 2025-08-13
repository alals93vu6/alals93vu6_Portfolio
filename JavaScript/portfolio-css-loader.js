/* ========================================================================
   作品集頁面響應式CSS載入器 - Portfolio Responsive CSS Loader
   ======================================================================== 
   
   用途: 為作品集子頁面提供動態響應式CSS載入功能
   - 自動檢測設備類型（桌面版/手機版）
   - 根據螢幕寬度動態載入對應的CSS檔案
   - 處理設備方向變化和窗口大小調整
   - 預載關鍵資源提升性能
   
   頁面支援:
   - Portfolio_aubotMe.html (關於我)
   - Portfolio_unity.html (Unity作品)
   - Portfolio_HTML.html (網頁作品)
   
   ======================================================================== */

(function() {
    'use strict';

    // 設定參數
    const BREAKPOINT = 769;  // 斷點設定：769px (768px及以下為手機版)
    const DEBOUNCE_DELAY = 100;  // 防抖延遲
    let currentLoadedCSS = null;  // 當前載入的CSS類型
    let loadTimeout = null;
    let isLoading = false;  // 載入狀態標記

    /**
     * 設備類型檢測
     * @returns {string} 'desktop' | 'mobile'
     */
    function getDeviceType() {
        // 769px以上為桌面版，768px及以下為手機版（包含平板）
        return window.innerWidth >= BREAKPOINT ? 'desktop' : 'mobile';
    }

    /**
     * 獲取當前頁面類型
     * @returns {string} 'aboutMe' | 'unity' | 'html' | 'unknown'
     */
    function getPageType() {
        const pathname = window.location.pathname.toLowerCase();
        if (pathname.includes('aubotme') || pathname.includes('about')) return 'aboutMe';
        if (pathname.includes('unity')) return 'unity';
        if (pathname.includes('html') || pathname.includes('web')) return 'html';
        return 'unknown';
    }

    /**
     * 構建CSS檔案路徑
     * @param {string} deviceType - 設備類型
     * @param {string} pageType - 頁面類型
     * @returns {string} CSS檔案路徑
     */
    function buildCSSPath(deviceType, pageType) {
        if (deviceType === 'desktop') {
            return 'CSS/introduce.css';  // 桌面版統一使用introduce.css
        } else {
            // 手機版使用各自的CSS檔案
            const mobilePages = {
                'aboutMe': 'CSS/mobile/aboutMe/aboutMe.css',
                'unity': 'CSS/mobile/unity/unity.css',
                'html': 'CSS/mobile/html/html.css'
            };
            return mobilePages[pageType] || 'CSS/introduce.css';
        }
    }

    /**
     * 移除現有的CSS連結
     */
    function removeExistingCSS() {
        const existingLinks = document.querySelectorAll('link[rel="stylesheet"][data-responsive="true"]');
        existingLinks.forEach(link => {
            link.remove();
        });
    }

    /**
     * 載入CSS檔案
     * @param {string} cssPath - CSS檔案路徑
     * @returns {Promise} 載入Promise
     */
    function loadCSS(cssPath) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.setAttribute('data-responsive', 'true');
            
            link.onload = () => {
                console.log(`✅ Portfolio CSS載入完成: ${cssPath}`);
                resolve();
            };
            
            link.onerror = (error) => {
                console.error(`❌ Portfolio CSS載入失敗: ${cssPath}`, error);
                reject(error);
            };
            
            document.head.appendChild(link);
        });
    }

    /**
     * 主要載入函數
     */
    async function loadResponsiveCSS() {
        if (isLoading) return;
        
        const deviceType = getDeviceType();
        const pageType = getPageType();
        
        // 如果已載入相同類型的CSS，不重複載入
        if (currentLoadedCSS === `${deviceType}-${pageType}`) {
            return;
        }
        
        isLoading = true;
        
        try {
            const cssPath = buildCSSPath(deviceType, pageType);
            
            console.log(`🔄 Portfolio 載入${deviceType}版CSS: ${cssPath} (頁面: ${pageType})`);
            
            // 移除舊的CSS並載入新的
            removeExistingCSS();
            await loadCSS(cssPath);
            
            currentLoadedCSS = `${deviceType}-${pageType}`;
            
            // 觸發自定義事件，通知其他腳本CSS載入完成
            const event = new CustomEvent('portfolioCSSLoaded', {
                detail: { deviceType, pageType, cssPath }
            });
            window.dispatchEvent(event);
            
        } catch (error) {
            console.error('Portfolio CSS載入過程發生錯誤:', error);
            
            // 載入失敗時嘗試使用桌面版CSS作為備用方案
            if (deviceType === 'mobile') {
                try {
                    await loadCSS('CSS/introduce.css');
                    currentLoadedCSS = `desktop-${pageType}`;
                    console.log('🔄 已載入備用桌面版CSS');
                } catch (fallbackError) {
                    console.error('備用CSS載入也失敗:', fallbackError);
                }
            }
        } finally {
            isLoading = false;
        }
    }

    /**
     * 防抖處理的重新載入函數
     */
    function debouncedReload() {
        if (loadTimeout) {
            clearTimeout(loadTimeout);
        }
        
        loadTimeout = setTimeout(() => {
            loadResponsiveCSS();
        }, DEBOUNCE_DELAY);
    }

    /**
     * 初始化函數
     */
    async function init() {
        console.log('🚀 Portfolio響應式CSS載入器啟動中...');
        console.log(`📊 當前視窗寬度: ${window.innerWidth}px, 設備: ${getDeviceType()}, 頁面類型: ${getPageType()}`);
        
        // 立即載入適當的CSS，使用await確保載入完成
        await loadResponsiveCSS();
        
        // 監聽視窗大小變化
        window.addEventListener('resize', debouncedReload);
        
        // 監聽設備方向變化
        window.addEventListener('orientationchange', () => {
            // orientationchange事件觸發後稍等片刻再處理
            setTimeout(debouncedReload, 300);
        });
        
        console.log('✅ Portfolio響應式CSS載入器已完成初始化');
    }

    /**
     * 預載關鍵CSS資源（可選）
     */
    function preloadCriticalCSS() {
        const deviceType = getDeviceType();
        const pageType = getPageType();
        const alternateCSSPath = buildCSSPath(
            deviceType === 'desktop' ? 'mobile' : 'desktop', 
            pageType
        );
        
        // 預載另一種設備的CSS
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = alternateCSSPath;
        document.head.appendChild(link);
    }

    // 確保在DOM和所有資源載入前就開始初始化
    // 這樣可以避免顯示錯誤的CSS再切換的問題
    if (document.readyState === 'loading') {
        // 如果文檔還在載入中，立即執行而不等待DOMContentLoaded
        console.log('📄 文檔載入中，立即初始化CSS載入器');
        setTimeout(init, 0);
    } else if (document.readyState === 'interactive') {
        // DOM載入完成但資源可能還在載入
        console.log('📄 DOM已載入，立即初始化CSS載入器');
        init();
    } else {
        // 文檔完全載入完成
        console.log('📄 文檔完全載入，初始化CSS載入器');
        init();
    }

    // 提供全域介面供外部調用
    window.PortfolioCSSLoader = {
        reload: loadResponsiveCSS,
        getDeviceType: getDeviceType,
        getPageType: getPageType,
        getCurrentCSS: () => currentLoadedCSS
    };

})();