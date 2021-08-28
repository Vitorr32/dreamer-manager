import React from "react";

interface IProps {
}
interface IState {
}

export class ToolSelectorBase extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
        }
    }

    render() {

        return (
            <section className="condition-line-wrapper">
            </section>
        )
    }
}