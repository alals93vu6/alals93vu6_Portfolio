# alals93vu6_Portfolio 專案文檔

## 專案概述

這是蘇明凱 (Markus) 的個人作品集網站，展示遊戲開發、網頁開發等多媒體作品。網站採用多頁面結構，包含主頁、關於我、Unity遊戲作品和網頁作品等不同區塊。

## 專案結構

```
alals93vu6_Portfolio/
├── Assets/                     # 資源文件夾
│   └── image/                  # 圖片和影片資源
│       ├── htmlInfo/           # 網頁作品相關媒體
│       ├── index/              # 主頁相關媒體
│       ├── unityInfo/          # Unity作品相關媒體
│       └── userInfo/           # 個人資訊相關媒體
├── CSS/                        # 樣式表文件
│   ├── aboutMe.css
│   ├── index.css              # 主頁樣式
│   ├── index_ContactInfo.css  # 聯絡資訊樣式
│   ├── index_hero.css         # 首頁英雄區塊樣式
│   ├── index_profileSection.css # 技能雷達圖樣式
│   ├── index_totalWorks.css   # 作品展示區樣式
│   └── introduce.css          # 介紹頁通用樣式
├── JavaScript/                 # JavaScript 腳本
│   └── index/
│       ├── IndexManager.js    # 主要管理腳本
│       ├── UICtrl/            # UI控制模組
│       ├── UIManager.js       # UI管理器
│       └── UserControl.js     # 用戶控制
├── docs/                      # 專案文檔 (本資料夾)
├── index.html                 # 主頁面
├── Portfolio_aubotMe.html     # 關於我頁面
├── Portfolio_HTML.html        # 網頁作品展示頁
├── Portfolio_unity.html       # Unity作品展示頁
├── LICENSE                    # 授權文件
└── README.md                  # 專案說明
```

## 主要功能

### 1. 主頁面 (index.html)
- **響應式導航欄**: 包含標誌和主要導航連結
- **英雄區塊**: 動態背景和標題展示
- **技能雷達圖**: 展示個人專長的視覺化圖表
- **作品瀏覽區**: 三個主要作品類別的入口
  - 關於我 (aubotMe)
  - Unity遊戲開發
  - 網頁開發
- **聯絡資訊**: 包含email、GitHub和社群媒體連結
- **回到頂部按鈕**: 平滑滾動功能

### 2. 關於我頁面 (Portfolio_aubotMe.html)
展示個人資訊，包括：
- 基本資料和個人特質
- 遊戲開發專長
- 網頁與程式能力
- 學習歷程和未來規劃

### 3. 網頁作品頁面 (Portfolio_HTML.html)
展示網頁開發作品：
- "這個網頁沒有功能" - 第一個前端作品
- "NGO_恩舉社工管理後台系統" - 完整的三角色整合平台

### 4. Unity作品頁面 (Portfolio_unity.html)
展示遊戲開發作品和技術能力

## 技術特色

### 前端技術
- **純HTML/CSS/JavaScript**: 無框架依賴，原生實作
- **ES6 模組化**: 使用 import/export 組織代碼
- **響應式設計**: 支援不同螢幕尺寸
- **動畫效果**: CSS動畫和JavaScript動態效果
- **影片整合**: WebM格式影片自動播放

### JavaScript 架構
- **模組化設計**: 分離 UI 管理、使用者控制等功能
- **事件驅動**: 滾動監聽、點擊事件處理
- **DOM 操作**: 動態內容生成和更新

### 樣式設計
- **分層CSS**: 按功能模組分離樣式文件
- **自定義動畫**: 淡入淡出、滾動效果
- **視覺一致性**: 統一的色彩和字體系統

## 特殊功能

1. **智能導航**: URL參數控制滾動位置
2. **媒體預載**: 提升使用者體驗的影片預載機制
3. **移動端提醒**: 偵測螢幕尺寸並提醒最佳觀看方式
4. **平滑滾動**: 所有導航都採用平滑滾動效果

## 開發者資訊

- **開發者**: 蘇明凱 (Markus)
- **專長**: Unity遊戲開發、網頁前端、多媒體製作
- **GitHub**: [alals93vu6](https://github.com/alals93vu6)
- **聯絡方式**: a0987915131@gmail.com

## 相關連結

- [個人GitHub](https://github.com/alals93vu6)
- [海島戀歌粉絲專頁](https://www.facebook.com/profile.php?id=61569364930743)
- [開發日誌](https://x.com/Lovetide777)