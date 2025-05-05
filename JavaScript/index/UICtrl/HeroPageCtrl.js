var pageNumber = 1;

export async function StartAnimator() {
    IntroduceDetected(pageNumber);
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
    }, 20000);
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
    }, 20000);
}

function HeroPageDetected() {
    if (pageNumber == 1) {
        pageNumber++;
        document.body.style.backgroundImage = "url('../../Assets/image/index/HeroPage_BackGroundB.png')";
    } else {
        pageNumber = 1;
        document.body.style.backgroundImage = "url('../../Assets/image/index/HeroPage_BackGroundA.png')";
    }
    IntroduceDetected(pageNumber);
}

function IntroduceDetected(page) {
    switch (page) {
        case 1:
            document.getElementById("hero-title").innerHTML = "賽芙拉";
            document.getElementById("hero-desc").innerHTML =
                `
            　　我的大學畢業製作專題是一款結合時間壓力的「反應型回合制」遊戲！<br><br>
            　　在每個回合中，畫面上的指針會不斷旋轉，當玩家觸發指針時，指到的區塊中的所有能力將會被同時發動。<br>
            玩家需要在極短時間內判斷最佳行動，並在瞬間作出決策！<br><br>
            　　本遊戲同時參考了 Roguelike 與爬塔元素，玩家可攜帶兩種召喚物，並額外開啟第二圈半圓的輪盤效果。<br>
            擁有兩名召喚物後，玩家可操作雙層輪盤，外圈每回合會隨機轉動，進一步增加戰術與隨機性的挑戰性！<br><br>
            　　在即時判斷與資源取捨的交錯中，玩家必須持續做出抉擇，並設法擊敗最終 BOSS，贏得勝利！
            `;
            break;
        case 2:
            document.getElementById("hero-title").innerHTML = "海島戀歌";
            document.getElementById("hero-desc").innerHTML = 
            `
            　　這是一款由一名程式與一名美術共同於下班時間開發的獨立 Galgame！<br><br>
            　　玩家將扮演一位在海島度假園區經營餐酒館的店長，在遊戲過程中，將有機會邂逅多位可愛又各具特色的女孩。你，是否能成功攻破她們的心防呢？<br><br>
            　　遊戲採用養成與時間管理機制，玩家必須在有限的時間與行動次數中，做出關鍵決策。不同的選擇將導向不同的結果，甚至開啟隱藏支線與特殊事件！<br><br>
            　　在這座美麗的海島上，你究竟能否遇見屬於你的真愛？還是揭開那段藏於愛情背後的祕密呢……？
            `;
            break;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}