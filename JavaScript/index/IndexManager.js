import * as UI from './UIManager.js';
//import * as User from './UserControl.js';

//網頁載入時
document.addEventListener("DOMContentLoaded", () => {
    UI.OnPageStart();
    // setupUserControl();
  
    
    const backBtn = document.getElementById("backToTop");
  
    if (backBtn) {
      // 點擊時回到頂部
      backBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  
      // 滾動時控制按鈕顯示/隱藏
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          backBtn.style.opacity = 1;
        } else {
          backBtn.style.opacity = 0;
        }
      });
  
      // 預設隱藏（防止重新整理時按鈕一閃）
      backBtn.style.opacity = 0;
    }
  });
