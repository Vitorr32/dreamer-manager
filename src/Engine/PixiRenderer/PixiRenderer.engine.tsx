import * as PIXI from 'pixi.js';
import { useDispatch } from 'react-redux';
import { createApplication } from '../../redux/game-loop/game-loop.reducer';
import { InitalizeMainMenu } from '../GUI/MainMenuScreen.gui';

export function PixiRenderer() {
   const dispatch = useDispatch()

    //Create the application for the pixi.js engine, and position it absolutely as the entire screen background
    const dreamerManager = new PIXI.Application({ width: window.innerWidth , height: window.innerHeight  });
    dreamerManager.renderer.view.style.position = "fixed";
    dreamerManager.renderer.view.style.display = "block";
    dreamerManager.renderer.view.style.top = "0";
    dreamerManager.renderer.view.style.left = "0";
    dreamerManager.renderer.view.style.zIndex = "-1";
    dreamerManager.renderer.backgroundColor = 0xe3e3e3

    if (document.body.children.length === 5) {
        document.body.appendChild(dreamerManager.view);
        dispatch(createApplication(dreamerManager));

        InitalizeMainMenu(dreamerManager);
    }

    return null
}

export default PixiRenderer;