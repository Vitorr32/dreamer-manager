import React from 'react';
import * as PIXI from 'pixi.js';

class PixiRenderer extends React.Component {

    componentDidMount() {
        //Create the application for the pixi.js engine, and position it absolutely as the entire screen background
        const dreamerManager = new PIXI.Application({ width: window.innerWidth - 1, height: window.innerHeight - 1 });
        dreamerManager.renderer.view.style.position = "absolute";
        dreamerManager.renderer.view.style.display = "block";
        dreamerManager.renderer.view.style.top = "0";
        dreamerManager.renderer.view.style.left = "0";

        console.log(window.innerWidth);
        console.log(window.innerHeight);

        if (document.body.children.length === 5) {
            document.body.appendChild(dreamerManager.view);
        }
    }

    render() {
        return null
    }
}

export default PixiRenderer;