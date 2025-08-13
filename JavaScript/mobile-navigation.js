/* ========================================================================
   手機版導航控制器 - Mobile Navigation Controller
   ========================================================================
   
   功能說明:
   1. 漢堡選單開關控制
   2. 導航選單顯示/隱藏
   3. 觸控友好的互動體驗
   4. 自動檢測設備類型並啟用/停用功能
   
   使用方式:
   在HTML頁面引入此腳本，會自動初始化手機版導航功能
   
   ======================================================================== */

(function() {
    'use strict';
    
    // ====== 配置選項 ======
    const CONFIG = {
        // 斷點設置 (像素) - 與CSS載入器保持一致
        MOBILE_BREAKPOINT: 768,
        
        // CSS類名配置
        CLASSES: {
            hamburgerMenu: 'hamburger-menu',
            navLinks: 'nav-links',
            active: 'active',
            navOpen: 'nav-open'
        },
        
        // 動畫時間 (毫秒)
        ANIMATION_DURATION: 300,
        
        // 觸控事件防抖時間 (毫秒)
        TOUCH_DEBOUNCE: 150
    };
    
    // ====== 全域變數 ======
    let hamburgerButton = null;
    let navLinks = null;
    let isNavOpen = false;
    let isAnimating = false;
    let touchDebounceTimer = null;
    let currentDeviceType = null;
    
    // ====== 工具函數 ======
    
    /**
     * 檢測當前設備類型
     * @returns {string} 'desktop' 或 'mobile'
     */
    function detectDeviceType() {
        return window.innerWidth >= CONFIG.MOBILE_BREAKPOINT ? 'desktop' : 'mobile';
    }
    
    /**
     * 防抖函數
     * @param {Function} func - 要防抖的函數
     * @param {number} delay - 延遲時間
     * @returns {Function} 防抖後的函數
     */
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    /**
     * 記錄日誌
     * @param {string} message - 日誌信息
     * @param {string} level - 日誌級別 ('log', 'warn', 'error')
     */
    function log(message, level = 'log') {
        if (console && console[level]) {
            console[level](`[MobileNav] ${message}`);
        }
    }
    
    // ====== 導航控制函數 ======
    
    /**
     * 開啟導航選單
     */
    function openNavigation() {
        if (isAnimating || isNavOpen) return;
        
        isAnimating = true;
        isNavOpen = true;
        
        // 添加CSS類觸發動畫
        hamburgerButton.classList.add(CONFIG.CLASSES.active);
        navLinks.classList.add(CONFIG.CLASSES.active);
        document.body.classList.add(CONFIG.CLASSES.navOpen);
        
        // 防止背景滾動
        document.body.style.overflow = 'hidden';
        
        // 設置焦點到第一個導航連結 (可訪問性)
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => {
                firstLink.focus();
            }, CONFIG.ANIMATION_DURATION / 2);
        }
        
        // 動畫完成後重置狀態
        setTimeout(() => {
            isAnimating = false;
            log('導航選單已開啟');
        }, CONFIG.ANIMATION_DURATION);
        
        // 觸發自定義事件
        window.dispatchEvent(new CustomEvent('mobileNavOpen'));
    }
    
    /**
     * 關閉導航選單
     */
    function closeNavigation() {
        if (isAnimating || !isNavOpen) return;
        
        isAnimating = true;
        isNavOpen = false;
        
        // 移除CSS類觸發動畫
        hamburgerButton.classList.remove(CONFIG.CLASSES.active);
        navLinks.classList.remove(CONFIG.CLASSES.active);
        document.body.classList.remove(CONFIG.CLASSES.navOpen);
        
        // 恢復背景滾動
        document.body.style.overflow = '';
        
        // 動畫完成後重置狀態
        setTimeout(() => {
            isAnimating = false;
            log('導航選單已關閉');
        }, CONFIG.ANIMATION_DURATION);
        
        // 觸發自定義事件
        window.dispatchEvent(new CustomEvent('mobileNavClose'));
    }
    
    /**
     * 切換導航選單狀態
     */
    function toggleNavigation() {
        if (isAnimating) return;
        
        if (isNavOpen) {
            closeNavigation();
        } else {
            openNavigation();
        }
    }
    
    // ====== 事件處理函數 ======
    
    /**
     * 漢堡選單點擊處理
     * @param {Event} event - 點擊事件
     */
    function handleHamburgerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // 防抖處理
        clearTimeout(touchDebounceTimer);
        touchDebounceTimer = setTimeout(() => {
            toggleNavigation();
        }, CONFIG.TOUCH_DEBOUNCE);
    }
    
    /**
     * 導航連結點擊處理
     * @param {Event} event - 點擊事件
     */
    function handleNavLinkClick(event) {
        // 點擊導航連結時關閉選單
        const isInternalLink = event.target.tagName === 'A' && 
                              event.target.getAttribute('href') && 
                              !event.target.getAttribute('href').startsWith('http');
        
        if (isInternalLink) {
            setTimeout(closeNavigation, 100); // 稍微延遲確保連結點擊生效
        }
    }
    
    /**
     * 背景點擊處理 (關閉選單)
     * @param {Event} event - 點擊事件
     */
    function handleBackgroundClick(event) {
        // 如果點擊的不是導航區域，則關閉選單
        if (isNavOpen && 
            !navLinks.contains(event.target) && 
            !hamburgerButton.contains(event.target)) {
            closeNavigation();
        }
    }
    
    /**
     * 鍵盤事件處理
     * @param {KeyboardEvent} event - 鍵盤事件
     */
    function handleKeydown(event) {
        // ESC 鍵關閉選單
        if (event.key === 'Escape' && isNavOpen) {
            closeNavigation();
            hamburgerButton.focus(); // 返回焦點到漢堡按鈕
        }
    }
    
    /**
     * 視窗大小變化處理
     */
    function handleResize() {
        const newDeviceType = detectDeviceType();
        
        // 如果從手機切換到桌面，關閉手機版導航
        if (currentDeviceType === 'mobile' && newDeviceType === 'desktop') {
            if (isNavOpen) {
                closeNavigation();
            }
        }
        
        currentDeviceType = newDeviceType;
        
        // 根據設備類型啟用/停用功能
        toggleMobileNavigation(newDeviceType === 'mobile');
    }
    
    // ====== 初始化和清理函數 ======
    
    /**
     * 綁定事件監聽器
     */
    function bindEventListeners() {
        if (!hamburgerButton || !navLinks) return;
        
        // 漢堡選單點擊事件
        hamburgerButton.addEventListener('click', handleHamburgerClick);
        hamburgerButton.addEventListener('touchend', handleHamburgerClick);
        
        // 導航連結點擊事件
        navLinks.addEventListener('click', handleNavLinkClick);
        
        // 背景點擊事件 (關閉選單)
        document.addEventListener('click', handleBackgroundClick);
        document.addEventListener('touchend', handleBackgroundClick);
        
        // 鍵盤事件
        document.addEventListener('keydown', handleKeydown);
        
        // 視窗大小變化事件
        window.addEventListener('resize', debounce(handleResize, 250));
        
        log('事件監聽器已綁定');
    }
    
    /**
     * 移除事件監聽器
     */
    function unbindEventListeners() {
        if (hamburgerButton) {
            hamburgerButton.removeEventListener('click', handleHamburgerClick);
            hamburgerButton.removeEventListener('touchend', handleHamburgerClick);
        }
        
        if (navLinks) {
            navLinks.removeEventListener('click', handleNavLinkClick);
        }
        
        document.removeEventListener('click', handleBackgroundClick);
        document.removeEventListener('touchend', handleBackgroundClick);
        document.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('resize', handleResize);
        
        log('事件監聽器已移除');
    }
    
    /**
     * 啟用/停用手機版導航功能
     * @param {boolean} enable - 是否啟用
     */
    function toggleMobileNavigation(enable) {
        if (enable) {
            bindEventListeners();
        } else {
            unbindEventListeners();
            if (isNavOpen) {
                closeNavigation();
            }
        }
    }
    
    /**
     * 初始化手機版導航
     */
    function initializeMobileNavigation() {
        // 尋找DOM元素
        hamburgerButton = document.querySelector('.' + CONFIG.CLASSES.hamburgerMenu);
        navLinks = document.querySelector('.' + CONFIG.CLASSES.navLinks);
        
        if (!hamburgerButton || !navLinks) {
            log('未找到必要的DOM元素，跳過手機版導航初始化', 'warn');
            return false;
        }
        
        // 檢測初始設備類型
        currentDeviceType = detectDeviceType();
        log(`檢測到設備類型: ${currentDeviceType}`);
        
        // 根據設備類型決定是否啟用功能
        if (currentDeviceType === 'mobile') {
            toggleMobileNavigation(true);
        }
        
        // 設置可訪問性屬性
        hamburgerButton.setAttribute('aria-label', '切換導航選單');
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-controls', 'navigation-menu');
        
        navLinks.setAttribute('id', 'navigation-menu');
        navLinks.setAttribute('aria-hidden', 'true');
        
        log('手機版導航初始化完成');
        return true;
    }
    
    /**
     * 清理函數
     */
    function cleanup() {
        unbindEventListeners();
        
        if (isNavOpen) {
            closeNavigation();
        }
        
        // 清理計時器
        clearTimeout(touchDebounceTimer);
        
        log('手機版導航已清理');
    }
    
    // ====== 公開API ======
    
    // 將一些函數暴露到全域，供其他腳本使用
    window.MobileNavigation = {
        open: openNavigation,
        close: closeNavigation,
        toggle: toggleNavigation,
        isOpen: () => isNavOpen,
        isAnimating: () => isAnimating,
        getCurrentDeviceType: () => currentDeviceType,
        cleanup: cleanup
    };
    
    // ====== 自動初始化 ======
    
    // DOM載入完成後自動初始化
    function autoInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMobileNavigation);
        } else {
            // DOM已經載入完成，直接初始化
            initializeMobileNavigation();
        }
    }
    
    // 監聽CSS載入完成事件，確保樣式已載入
    window.addEventListener('cssLoaded', function(event) {
        if (event.detail && event.detail.deviceType === 'mobile') {
            // 手機版CSS載入完成後初始化導航
            setTimeout(initializeMobileNavigation, 100);
        }
    });
    
    // 頁面卸載時清理
    window.addEventListener('beforeunload', cleanup);
    
    // 開始自動初始化
    autoInit();
    
})();