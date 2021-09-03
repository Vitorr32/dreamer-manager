import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import './App.global.scss';
import { EditorScreen } from './Interface/MainMenu/page/EditorScreen/EditorScreen.component';
import { MainScreen } from './Interface/MainMenu/page/MainScreen/MainScreen.component';
import { TraitEditor } from './Interface/MainMenu/sub-pages/TraitEditor/TraitEditor.component';

export default function App() {
  return (
    <HashRouter>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/menu/edit/trait/new" />}
      />
      <Route exact path="/menu" component={MainScreen} />
      <Route exact path="/menu/edit" component={EditorScreen} />
      <Route path="/menu/edit/trait" component={TraitEditor} />
    </HashRouter>
  );
}
