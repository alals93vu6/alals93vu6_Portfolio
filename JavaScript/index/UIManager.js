import * as heroPage from './UICtrl/HeroPageCtrl.js';

export function OnPageStart() {
    heroPage.StartAnimator();
}


export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}