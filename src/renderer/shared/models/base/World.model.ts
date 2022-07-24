import { EntityBase } from './Entity.model';
import { Variables } from './Variable.model';

//All of the current save world metadat
export class World extends EntityBase {
    static get _variables() {
        return {};
    }

    public date: number;
    public triggeredFlags: string[];

    constructor() {
        super();

        this.date = new Date().valueOf();
        this.triggeredFlags = [];
    }
}
