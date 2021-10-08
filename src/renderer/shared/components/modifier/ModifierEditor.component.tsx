import React from 'react';

interface IProps {}
interface IState {}

export class ModifierEditor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        return <section className="condition-tree-editor"></section>;
    }
}
