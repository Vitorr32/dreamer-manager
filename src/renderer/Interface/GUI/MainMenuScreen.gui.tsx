import { Application } from 'pixi.js';
import { MainMenuButton } from './MainMenuButton.pixi';

export function InitalizeMainMenu(app: Application) {
    const {stage} = app;

    MainMenuButton(20,20).forEach( graphic => stage.addChild(graphic))
    
}