import React from 'react';
import * as PIXI from 'pixi.js';

class PixiRenderer extends React.Component {

    componentDidMount() {
        //Create the application for the pixi.js engine, and position it absolutely as the entire screen background

        const dreamerManager = new PIXI.Application();
        dreamerManager.renderer.view.style.position = "absolute";
        dreamerManager.renderer.view.style.display = "block";
        dreamerManager.renderer.view.style.top = "0";
        dreamerManager.renderer.view.style.left = "0";
        dreamerManager.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(dreamerManager.view);
    }

    render() {
        return (
            <div>
                Yolo
            </div>
        );
    }
}

export default PixiRenderer;