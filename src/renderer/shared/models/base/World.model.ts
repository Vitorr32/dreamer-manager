import { EntityBase } from './Entity.model';

// All of the current save world metadata
export class World extends EntityBase {
    static get variables() {
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
