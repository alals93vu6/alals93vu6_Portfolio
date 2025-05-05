import * as UI from './UIManager.js';
//import * as User from './UserControl.js';

//網頁載入時
document.addEventListener("DOMContentLoaded", () => {
    UI.OnPageStart();
    //setupUserControl();
  
    const backBtn = document.getElementById("backToTop");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });

