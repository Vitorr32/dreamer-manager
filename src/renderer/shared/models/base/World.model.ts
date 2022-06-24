import { Entity } from './Entity.model';
import { Variables } from './Variable.model';

//All of the current save world metadat
export class World extends Entity {
    _variables: Variables = {};

    public date: number;
    public triggeredFlags: string[];

    constructor() {
        super();

        this.date = new Date().valueOf();
        this.triggeredFlags = [];
    }
}
