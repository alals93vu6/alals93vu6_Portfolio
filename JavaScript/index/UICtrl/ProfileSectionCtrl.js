let radarBase = null;
let radarFill = null;
let hasAnimated = false;

export function InitProfileSection() {
    radarBase = document.querySelector('.radar-base');
    radarFill = document.querySelector('.radar-fill');

    window.addEventListener('scroll', onScrollFadeIn);
}

async function onScrollFadeIn() {
    // 避免在沒有元素時執行
    if (!radarBase || !radarFill) return;
    
    const triggerY = window.innerHeight * 0.4; // 下半部進入視窗時觸發
    const targetTop = radarBase.getBoundingClientRect().top;

    if (!hasAnimated && targetTop < triggerY) {
        hasAnimated = true;
        
        // 確保動畫只執行一次
        radarBase.style.opacity = '1';
        radarBase.style.transform = 'translateY(0%)';
        
        // 標記容器為已載入，隱藏載入文字
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.classList.add('loaded');
        }
        
        await delay(1000);
        fadeInElement(radarFill, 0.5);
        
        // 移除事件監聽器，防止重複觸發
        window.removeEventListener('scroll', onScrollFadeIn);
    }
}

function fadeInElement(element, Scend) {
    if (!element) return;
    var Scendtime = `opacity ${Scend}s ease-out`;
    element.style.transition = Scendtime;
    element.style.opacity = '1';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}