import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { NewTrait } from '../NewTrait/NewTrait.component';

interface ITraitEditorProps {
    match?: any;
}

export class TraitEditor extends React.Component<ITraitEditorProps> {
    render() {
        const { path, url } = this.props.match;

        return (
            <Switch>
                <Route path={`${path}/new`}>
                    <NewTrait />
                </Route>

                <Route exact path={path}>
                    <main id="trait-editor-page">
                        <div className="menu-wrapper">
                            <Link to="/menu">
                                <button>Return Menu</button>
                            </Link>
                            <Link to={`${url}/new`}>
                                <button>New Trait</button>
                            </Link>
                        </div>
                    </main>
                </Route>
            </Switch>
        );
    }
}
