import React from "react";
import { Link } from "react-router-dom";

export function MainScreen(props: any) {


    console.log('Main Screen!');

    return (
        <menu>
            <Link to="/" >
                <button>New Game</button>
            </Link>
            <Link to="/menu/edit" >
                <button>Editor</button>
            </Link>
        </menu>
    )
}