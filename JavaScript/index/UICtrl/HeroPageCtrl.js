export async function StartAnimator() {
    document.getElementsByClassName("more-link")[0].style.opacity = 0;
    await delay(500);
    document.getElementsByClassName("bg-mask")[0].style.opacity = 0;
    await delay(1000);
    document.getElementById("hero-title").style.opacity = 1;
    await delay(300);
    document.getElementById("hero-desc").style.opacity = 1;
    await delay(500);
    document.getElementsByClassName("more-link")[0].style.opacity = 0.8;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}