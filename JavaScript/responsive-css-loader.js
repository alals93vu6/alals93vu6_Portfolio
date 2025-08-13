/* ========================================================================
   響應式CSS動態載入器 - Responsive CSS Dynamic Loader
   ========================================================================
   
   功能說明:
   1. 檢測螢幕尺寸 (≥768px為Desktop, <768px為Mobile)
   2. 動態載入對應的CSS文件
   3. 監聽視窗大小變化，必要時重新載入CSS
   4. 提供載入狀態指示
   
   使用方式:
   在HTML的<head>中引入此腳本，它會自動執行
   
   ======================================================================== */

(function() {
    'use strict';
    
    // ====== 配置選項 ======
    const CONFIG = {
        // 斷點設置 (像素)
        MOBILE_BREAKPOINT: 768,
        
        // CSS文件路徑配置 (首頁專用)
        CSS_PATHS: {
            desktop: {
                base: 'CSS/desktop/index/base.css',
                hero: 'CSS/desktop/index/hero.css', 
                profileSection: 'CSS/desktop/index/profileSection.css',
                totalWorks: 'CSS/desktop/index/totalWorks.css',
                contactInfo: 'CSS/desktop/index/contactInfo.css'
            },
            mobile: {
                base: 'CSS/mobile/index/base.css',
                hero: 'CSS/mobile/index/hero.css',
                profileSection: 'CSS/mobile/index/profileSection.css', 
                totalWorks: 'CSS/mobile/index/totalWorks.css',
                contactInfo: 'CSS/mobile/index/contactInfo.css'
            }
        },
        
        // 防抖延遲時間 (毫秒)
        RESIZE_DEBOUNCE_DELAY: 300,
        
        // 載入超時時間 (毫秒) 
        LOAD_TIMEOUT: 3000
    };
    
    // ====== 全域變數 ======
    let currentDeviceType = null; // 'desktop' 或 'mobile'
    let loadedStylesheets = []; // 已載入的CSS文件追蹤
    let resizeTimer = null; // 視窗大小變化防抖計時器
    let isLoading = false; // 是否正在載入中
    
    // ====== 工具函數 ======
    
    /**
     * 檢測當前設備類型
     * @returns {string} 'desktop' 或 'mobile'
     */
    function detectDeviceType() {
        return window.innerWidth >= CONFIG.MOBILE_BREAKPOINT ? 'desktop' : 'mobile';
    }
    
    /**
     * 預載入關鍵圖片
     * @param {string} deviceType - 設備類型
     */
    function preloadCriticalImages(deviceType) {
        // 根據設備類型選擇對應的圖片
        const baseImages = [
            'Assets/image/index/SpinePage.png',
            'Assets/image/index/webPage.png',
            'Assets/image/index/UnityPage.png'
        ];
        
        // ProfileSection背景圖片根據設備類型選擇
        const profileImages = deviceType === 'mobile' 
            ? [
                'Assets/image/index/profileSectionA_Mobile.png',
                'Assets/image/index/profileSectionB_Mobile.png'
              ]
            : [
                'Assets/image/index/profileSectionA.png',
                'Assets/image/index/profileSectionB.png'
              ];
        
        // Hero背景圖片根據設備類型選擇（包含A和B兩張）
        const heroImages = deviceType === 'mobile' 
            ? [
                'Assets/image/index/HeroPage_BackGroundA_Mobile.png',
                'Assets/image/index/HeroPage_BackGroundB_Mobile.png'
              ]
            : [
                'Assets/image/index/HeroPage_BackGroundA.png',
                'Assets/image/index/HeroPage_BackGroundB.png'
              ];
        
        const images = [...heroImages, ...profileImages, ...baseImages];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
            // 預載入但不阻塞主要流程
        });
        
        console.log(`🖼️ 開始預載入 ${images.length} 張關鍵圖片`);
    }
    
    
    /**
     * 顯示載入指示器
     */
    function showLoadingIndicator() {
        // 移除現有的載入指示器
        const existing = document.querySelector('.css-loading');
        if (existing) {
            existing.remove();
        }
        
        // 創建載入指示器
        const loader = document.createElement('div');
        loader.className = 'css-loading';
        loader.innerHTML = `
            <div style="margin-bottom: 1rem;">🎨 載入樣式中...</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">正在為您的設備優化體驗</div>
        `;
        document.body.appendChild(loader);
        
        // 隱藏主要內容
        document.body.classList.add('content-hidden');
    }
    
    /**
     * 隱藏載入指示器
     */
    function hideLoadingIndicator() {
        const loader = document.querySelector('.css-loading');
        if (loader) {
            loader.remove();
        }
        
        // 顯示主要內容
        document.body.classList.remove('content-hidden');
        document.body.classList.add('content-visible');
    }
    
    /**
     * 移除已載入的CSS文件
     */
    function removeLoadedStylesheets() {
        // 移除動態載入的CSS
        loadedStylesheets.forEach(link => {
            if (link && link.parentNode) {
                link.parentNode.removeChild(link);
            }
        });
        loadedStylesheets = [];
        
        // 同時移除fallback CSS
        const fallbackBase = document.getElementById('fallback-base');
        const fallbackHero = document.getElementById('fallback-hero');
        if (fallbackBase && fallbackBase.parentNode) {
            fallbackBase.parentNode.removeChild(fallbackBase);
        }
        if (fallbackHero && fallbackHero.parentNode) {
            fallbackHero.parentNode.removeChild(fallbackHero);
        }
    }
    
    /**
     * 載入單個CSS文件
     * @param {string} href - CSS文件路徑
     * @param {string} id - CSS link元素的ID
     * @returns {Promise} - 載入完成的Promise
     */
    function loadStylesheet(href, id) {
        return new Promise((resolve, reject) => {
            // 檢查是否已存在相同ID的樣式表
            const existing = document.getElementById(id);
            if (existing) {
                resolve();
                return;
            }
            
            // 創建link元素
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.id = id;
            
            // 設置載入超時
            const timeoutId = setTimeout(() => {
                reject(new Error(`載入CSS超時: ${href}`));
            }, CONFIG.LOAD_TIMEOUT);
            
            // 載入成功處理
            link.onload = () => {
                clearTimeout(timeoutId);
                loadedStylesheets.push(link);
                console.log(`✅ CSS已載入: ${href}`);
                resolve();
            };
            
            // 載入失敗處理
            link.onerror = () => {
                clearTimeout(timeoutId);
                console.error(`❌ CSS載入失敗: ${href}`);
                reject(new Error(`無法載入CSS: ${href}`));
            };
            
            // 加入到文檔頭部
            document.head.appendChild(link);
        });
    }
    
    /**
     * 載入指定設備類型的所有CSS文件
     * @param {string} deviceType - 'desktop' 或 'mobile' 
     */
    async function loadCSSForDevice(deviceType) {
        if (isLoading) {
            console.log('⏳ CSS載入中，跳過重複請求');
            return;
        }
        
        if (currentDeviceType === deviceType) {
            console.log(`✅ ${deviceType} CSS已載入，無需重複載入`);
            return;
        }
        
        isLoading = true;
        // showLoadingIndicator(); // 暫時移除載入指示器避免黑屏
        
        try {
            console.log(`🔄 開始載入 ${deviceType} CSS...`);
            
            // 只有在切換到不同設備類型時才移除舊CSS
            if (currentDeviceType && currentDeviceType !== deviceType) {
                removeLoadedStylesheets();
            } else if (!currentDeviceType) {
                // 首次載入，根據設備類型決定是否移除fallback
                if (deviceType === 'mobile') {
                    removeLoadedStylesheets(); // 手機版需要移除桌面fallback
                } else {
                    // 桌面版使用現有的fallback，只需要載入剩餘的CSS
                    console.log('🔄 桌面版使用現有fallback CSS');
                }
            }
            
            // 獲取對應設備的CSS路徑
            const cssPaths = CONFIG.CSS_PATHS[deviceType];
            
            if (!cssPaths) {
                throw new Error(`未找到 ${deviceType} 的CSS配置`);
            }
            
            // 並行載入CSS文件
            const loadPromises = Object.entries(cssPaths).map(([name, path]) => {
                const id = `css-${deviceType}-${name}`;
                
                // 如果是桌面版首次載入，跳過已經載入的fallback CSS
                if (!currentDeviceType && deviceType === 'desktop' && (name === 'base' || name === 'hero')) {
                    console.log(`⏩ 跳過 ${name}，使用現有fallback`);
                    return Promise.resolve(); // 跳過已存在的CSS
                }
                
                return loadStylesheet(path, id);
            });
            
            // 等待所有CSS載入完成
            await Promise.all(loadPromises);
            
            // 更新當前設備類型
            currentDeviceType = deviceType;
            
            console.log(`✅ ${deviceType} CSS載入完成`);
            
            // 延遲預載入圖片，避免阻塞初始載入
            setTimeout(() => preloadCriticalImages(deviceType), 2000);
            
            // 觸發自定義事件，通知其他腳本
            window.dispatchEvent(new CustomEvent('cssLoaded', {
                detail: { deviceType }
            }));
            
        } catch (error) {
            console.error('❌ CSS載入過程中發生錯誤:', error);
            
            // 載入失敗時的fallback處理 - 加載桌面版CSS作為後備
            console.warn('⚠️ 嘗試載入桌面版CSS作為後備方案');
            try {
                const fallbackPaths = CONFIG.CSS_PATHS.desktop;
                const fallbackPromises = Object.entries(fallbackPaths).map(([name, path]) => {
                    const id = `css-fallback-${name}`;
                    return loadStylesheet(path, id);
                });
                await Promise.all(fallbackPromises);
                currentDeviceType = 'desktop';
                console.log('✅ 後備CSS載入完成');
            } catch (fallbackError) {
                console.error('❌ 後備CSS載入也失敗:', fallbackError);
                alert('樣式載入失敗，請刷新頁面重試');
            }
            
        } finally {
            isLoading = false;
            // hideLoadingIndicator(); // 暫時移除載入指示器避免黑屏
        }
    }
    
    /**
     * 視窗大小變化處理函數 (防抖)
     */
    function handleResize() {
        // 清除舊的計時器
        clearTimeout(resizeTimer);
        
        // 設置新的計時器
        resizeTimer = setTimeout(() => {
            const newDeviceType = detectDeviceType();
            
            if (newDeviceType !== currentDeviceType) {
                console.log(`📱 設備類型變化: ${currentDeviceType} → ${newDeviceType}`);
                loadCSSForDevice(newDeviceType);
            }
        }, CONFIG.RESIZE_DEBOUNCE_DELAY);
    }
    
    /**
     * 初始化響應式CSS載入器
     */
    function init() {
        console.log('🚀 響應式CSS載入器初始化...');
        
        // 檢測初始設備類型並載入對應CSS
        const initialDeviceType = detectDeviceType();
        console.log(`📱 檢測到設備類型: ${initialDeviceType}`);
        
        // 載入對應的CSS
        loadCSSForDevice(initialDeviceType);
        
        // 監聽視窗大小變化
        window.addEventListener('resize', handleResize);
        
        // 監聽方向變化 (移動設備)
        window.addEventListener('orientationchange', () => {
            // 方向變化後稍微延遲檢測，等待實際尺寸更新
            setTimeout(handleResize, 500);
        });
        
        console.log('✅ 響應式CSS載入器初始化完成');
    }
    
    // ====== 公開API ======
    
    // 將一些函數暴露到全域，供其他腳本使用
    window.ResponsiveCSSLoader = {
        getCurrentDeviceType: () => currentDeviceType,
        forceReload: () => {
            currentDeviceType = null;
            loadCSSForDevice(detectDeviceType());
        },
        isLoading: () => isLoading
    };
    
    // ====== 自動初始化 ======
    
    // DOM載入完成後自動初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM已經載入完成，直接初始化
        init();
    }
    
})();