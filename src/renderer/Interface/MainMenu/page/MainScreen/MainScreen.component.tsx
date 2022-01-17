import React from "react";
import { Link } from "react-router-dom";

export function MainScreen(_: any) {
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
