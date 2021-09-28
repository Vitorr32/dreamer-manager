import React from "react";
import { Link } from "react-router-dom";

export function EditorScreen(props: any) {

    console.log('Editor!');

    return (
        <menu>
            <Link to="/menu/edit/trait" >
                <button>Edit Traits</button>
            </Link>
            <Link to="/menu" >
                <button>Return Menu</button>
            </Link>
        </menu>
    )
}