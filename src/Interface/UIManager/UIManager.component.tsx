import React from 'react';
import { HUD } from '../HUD/HUD.component';
import './UIManager.style.scss';

class UIManager extends React.Component {
    render() {
        return (
            <section id="ui-manager">
                <HUD/>
            </section>
        );
    }
}

export default UIManager;