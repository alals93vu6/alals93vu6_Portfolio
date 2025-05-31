let radarBase = null;
let radarFill = null;
let hasAnimated = false;

export function InitProfileSection() {
    radarBase = document.querySelector('.radar-base');
    radarFill = document.querySelector('.radar-fill');

    window.addEventListener('scroll', onScrollFadeIn);
}

async function onScrollFadeIn() {
    const triggerY = window.innerHeight * 0.4; // 下半部進入視窗時觸發
    const targetTop = radarBase?.getBoundingClientRect().top;

    if (!hasAnimated && targetTop < triggerY) {
        hasAnimated = true;
        radarBase.style.opacity = '1';
        radarBase.style.transform = 'translateY(0%)';
        
        await delay(1000);
        fadeInElement(radarFill, 0.5);
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