import React from "react"
import { Link, Route, Switch } from "react-router-dom"
import './TraitEditor.style.scss'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

interface ITraitEditorProps {
    match?: any;
}

export class TraitEditor extends React.Component<ITraitEditorProps> {

    public async openFilePathDialog(): Promise<any> {

        const data = await ipcRenderer.invoke('get-file', '/path/to/file')
        console.log(data);
    }

    render() {
        console.log(this.props);
        const { path, url } = this.props.match;

        return (
            <Switch>
                <Route exact path={path}>
                    <main id="trait-editor-page">
                        <div className="menu-wrapper">
                            <Link to="/menu" >
                                <button>Return Menu</button>
                            </Link>
                            <Link to={`${url}/new`} >
                                <button>New Trait</button>
                            </Link>

                            {/* <button onClick={this.openFilePathDialog}>Select File</button> */}


                        </div>
                    </main>
                </Route>
                <Route path={`${path}/new`}>
                    Yolooo
                </Route>
            </Switch>

        )
    }
}