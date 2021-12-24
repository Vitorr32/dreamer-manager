import { Flag } from './Event.model';

//All of the current save world metadat
export class World {
    public date: number;
    public triggeredFlags: Flag[];

    constructor() {
        this.date = new Date().valueOf();
        this.triggeredFlags = [];
    }
}
