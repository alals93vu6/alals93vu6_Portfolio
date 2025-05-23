import * as heroPage from './UICtrl/HeroPageCtrl.js';
import * as profileSection from './UICtrl/ProfileSectionCtrl.js';

export function OnPageStart() {
    heroPage.StartAnimator();
    profileSection.InitProfileSection();
}


export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}