var pageNumber = 1;

export async function StartAnimator() {
    IntroduceDetected(pageNumber);
    document.getElementsByClassName("more-link")[0].style.opacity = 0;
    await delay(500);
    document.getElementsByClassName("bg-mask")[0].style.opacity = 0;
    await delay(1000);
    document.getElementById("hero-title").style.opacity = 1;
    await delay(400);
    document.getElementById("hero-desc").style.opacity = 1;
    await delay(500);
    document.getElementsByClassName("more-link")[0].style.opacity = 0.8;

    setTimeout(function () {
        SwitchPageAnimator();
    }, 20000);//20000
}

async function SwitchPageAnimator() {
    document.getElementsByClassName("more-link")[0].style.opacity = 0;
    await delay(200);
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
    await delay(400);
    document.getElementById("hero-desc").style.opacity = 1;
    await delay(500);
    document.getElementsByClassName("more-link")[0].style.opacity = 0.8;

    setTimeout(function () {
        SwitchPageAnimator();
    }, 20000);
}

function HeroPageDetected() {
    // 檢測當前設備類型
    const isMobile = window.innerWidth < 768;
    
    if (pageNumber == 1) {
        pageNumber++;
        // 根據設備類型選擇B圖片
        const bgImageB = isMobile 
            ? "url('../../../../Assets/image/index/HeroPage_BackGroundB_Mobile.png')"
            : "url('../../../../Assets/image/index/HeroPage_BackGroundB.png')";
        
        // 創建動態CSS規則來修改偽元素背景
        const style = document.getElementById('dynamic-bg-style') || document.createElement('style');
        style.id = 'dynamic-bg-style';
        style.innerHTML = `.hero-wrapper::before { background-image: ${bgImageB} !important; }`;
        document.head.appendChild(style);
    } else {
        pageNumber = 1;
        // 根據設備類型選擇A圖片
        const bgImageA = isMobile 
            ? "url('../../../../Assets/image/index/HeroPage_BackGroundA_Mobile.png')"
            : "url('../../../../Assets/image/index/HeroPage_BackGroundA.png')";
        
        // 創建動態CSS規則來修改偽元素背景
        const style = document.getElementById('dynamic-bg-style') || document.createElement('style');
        style.id = 'dynamic-bg-style';
        style.innerHTML = `.hero-wrapper::before { background-image: ${bgImageA} !important; }`;
        document.head.appendChild(style);
    }
    IntroduceDetected(pageNumber);
}

function IntroduceDetected(page) {
    switch (page) {
        case 1:
            document.getElementById("hero-title").innerHTML = "賽芙拉";
            document.getElementById("hero-desc").innerHTML =
                `
            結合時間壓力的「反應型回合制」遊戲！<br><br>
            指針旋轉時觸發區域能力，需在極短時間內判斷最佳行動並瞬間決策。<br><br>
            融合 Roguelike 與爬塔元素，雙層輪盤系統增加戰術與隨機性挑戰！<br><br>
            在即時判斷與資源取捨中持續抉擇，擊敗最終 BOSS 獲得勝利！
            `;
            break;
        case 2:
            document.getElementById("hero-title").innerHTML = "海島戀歌";
            document.getElementById("hero-desc").innerHTML = 
            `
            程式與美術共同開發的獨立 Galgame！<br><br>
            扮演海島餐酒館店長，邂逅多位可愛女孩並攻破她們的心防。<br><br>
            採用養成與時間管理機制，不同選擇導向不同結果！<br><br>
            在美麗海島上尋找真愛，或揭開愛情背後的神秘……
            `;
            break;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}