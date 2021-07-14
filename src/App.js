import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { EditorScreen } from "./Interface/MainMenu/page/EditorScreen/EditorScreen.component";
import { MainScreen } from "./Interface/MainMenu/page/MainScreen/MainScreen.component";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" render={() => <Redirect to="/menu" />} />
      <Route exact path="/menu" component={MainScreen} />
      <Route exact path="/menu/edit" component={EditorScreen} />
    </HashRouter>
  );
}

export default App;
