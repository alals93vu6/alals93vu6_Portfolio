# 響應式作品集網站開發記錄

## 專案概述
這是一個響應式作品集網站，支援桌面版和手機版自適應佈局，具備Netflix式輪播功能。

## 已完成功能
- ✅ 響應式CSS動態載入系統
- ✅ 桌面版完整佈局 (Hero, ProfileSection, TotalWorks, ContactInfo)
- ✅ 手機版垂直佈局優化
- ✅ Netflix式滑動輪播（Unity、AboutMe、Web三個子頁面）
- ✅ 觸控支援和自動居中定位
- ✅ Git大文件處理和部署優化

## 當前問題：Live Server vs GitHub Pages 圖片顯示差異

### 問題描述
- 本地Live Server和GitHub Pages部署版本的Hero背景圖片顯示不一致
- 其他功能正常運作
- 問題僅限於首頁Hero區域

### 已排查項目 (2025-01-13)

#### 1. 響應式CSS載入器預載入邏輯
**問題**: 載入器嘗試預載入未使用的背景圖片
**修復**: 移除 `HeroPage_BackGroundB.png` 系列預載入，只保留實際使用的A版本
**結果**: 問題仍存在

#### 2. CSS檔案路徑檢查
- ✅ 桌面版: `CSS/desktop/index/hero.css` - 使用 `HeroPage_BackGroundA.png`
- ✅ 手機版: `CSS/mobile/index/hero.css` - 使用 `HeroPage_BackGroundA_Mobile.png`
- ✅ 圖片檔案確認存在於 `Assets/image/index/` 目錄

### 其他可能原因分析

#### A. 快取相關問題
**可能原因**:
- GitHub Pages CDN快取策略與本地不同
- 瀏覽器快取機制差異
- Service Worker快取干擾

**本地測試建議**:
```bash
# 1. 強制清除瀏覽器快取
# 開啟開發者工具 > Network > Disable cache

# 2. 測試無快取載入
# 在GitHub Pages URL後加 ?v=timestamp

# 3. 檢查實際載入的圖片
# 開發者工具 > Network > 篩選 Images
```

#### B. 路徑解析差異
**可能原因**:
- 本地相對路徑 vs GitHub Pages絕對路徑解析
- CSS中的 `../../../` 路徑在不同環境表現不同
- Background-attachment: fixed 在不同伺服器的行為差異

**排查方式**:
```css
/* 測試用絕對路徑替換相對路徑 */
background-image: url("/Assets/image/index/HeroPage_BackGroundA.png");
```

#### C. 響應式載入時序問題
**可能原因**:
- 本地和遠端的CSS載入時序不同
- 圖片預載入完成時間差異
- JavaScript執行時機影響背景圖顯示

**排查方式**:
```javascript
// 在console中檢查
console.log('Current device type:', ResponsiveCSSLoader.getCurrentDeviceType());
console.log('CSS loading status:', ResponsiveCSSLoader.isLoading());

// 檢查實際套用的CSS
getComputedStyle(document.body).backgroundImage
```

#### D. 圖片檔案本身問題
**可能原因**:
- 圖片格式或編碼問題
- 檔案大小導致載入差異
- 圖片EXIF資訊影響顯示

**排查方式**:
```bash
# 檢查圖片檔案資訊
file Assets/image/index/HeroPage_BackGroundA*.png

# 比較檔案大小
ls -la Assets/image/index/HeroPage_BackGround*
```

#### E. CSS background-attachment: fixed 問題
**可能原因**:
- fixed attachment在不同瀏覽器/伺服器環境表現不同
- 移動設備對fixed背景的支援差異

**測試方式**:
```css
/* 暫時修改為測試 */
background-attachment: scroll; /* 改為scroll測試 */
```

### 建議排查順序

1. **瀏覽器開發者工具檢查**
   - Network面板查看實際載入的圖片
   - Elements面板檢查套用的CSS規則
   - Console查看是否有載入錯誤

2. **強制重新整理測試**
   - Ctrl+F5 強制刷新頁面
   - 清除瀏覽器快取後重新訪問

3. **路徑測試**
   - 臨時修改CSS使用絕對路徑
   - 測試不同的圖片檔案

4. **CSS屬性測試**
   - 暫時移除 background-attachment: fixed
   - 測試簡化的背景設定

5. **時序測試**
   - 在CSS載入完成事件中手動設定背景
   - 延遲載入背景圖片

### 開發環境與部署環境對比測試

**本地測試指令**:
```bash
# 啟動本地伺服器（模擬部署環境）
npx http-server . -p 3000 -c-1

# 或使用Python
python -m http.server 3000
```

**比較重點**:
- 相同條件下的圖片載入表現
- CSS套用的即時性
- JavaScript執行時序

## 下次開發重點
1. 深入排查Hero背景圖片顯示差異根本原因
2. 考慮實作fallback機制確保一致性
3. 優化圖片載入策略和快取控制

---
*最後更新: 2025-01-13*
*問題狀態: 進行中*