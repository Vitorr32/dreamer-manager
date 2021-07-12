import React from 'react';
import PixiRenderer from './Engine/PixiRenderer/PixiRenderer.engine';
import UIManager from './Interface/UIManager/UIManager.component';

function App() {
  return (
    <React.Fragment>
      <PixiRenderer></PixiRenderer>
      <UIManager></UIManager>
    </React.Fragment>
  );
}

export default App;
