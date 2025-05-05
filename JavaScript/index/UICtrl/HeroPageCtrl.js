var pageNumber = 1;

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

    setTimeout(function () {
        SwitchPageAnimator();
    }, 5000);
}

async function SwitchPageAnimator() {
    document.getElementsByClassName("more-link")[0].style.opacity = 0;
    await delay(300);
    document.getElementById("hero-desc").style.opacity = 0;
    await delay(150);
    document.getElementById("hero-title").style.opacity = 0;
    await delay(500);
    document.getElementsByClassName("bg-mask")[0].style.opacity = 1;
    await delay(3300);
    HeroPageDetected();
    document.getElementsByClassName("bg-mask")[0].style.opacity = 0;
    await delay(1000);
    document.getElementById("hero-title").style.opacity = 1;
    await delay(300);
    document.getElementById("hero-desc").style.opacity = 1;
    await delay(500);
    document.getElementsByClassName("more-link")[0].style.opacity = 0.8;

    setTimeout(function () {
        SwitchPageAnimator();
    }, 5000);
}

function HeroPageDetected() {
    if (pageNumber == 1) {
        pageNumber++;
        document.body.style.backgroundImage = "url('../../Assets/image/index/HeroPage_BackGroundB.png')";
      } else {
        pageNumber = 1;
        document.body.style.backgroundImage = "url('../../Assets/image/index/HeroPage_BackGroundA.png')";
      }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}