import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { EditorScreen } from "./Interface/MainMenu/page/EditorScreen/EditorScreen.component";
import { MainScreen } from "./Interface/MainMenu/page/MainScreen/MainScreen.component";
import { TraitEditor } from "./Interface/MainMenu/sub-pages/TraitEditor/TraitEditor.component";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" render={() => <Redirect to="/menu/edit/trait" />} />
      <Route exact path="/menu" component={MainScreen} />
      <Route exact path="/menu/edit" component={EditorScreen} />
      <Route path="/menu/edit/trait" component={TraitEditor} />
    </HashRouter>
  );
}

export default App;
