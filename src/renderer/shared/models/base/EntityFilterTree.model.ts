import { MappedDatabase } from 'renderer/redux/interfaces/MappedDatabase.interface';
import { EntityBase } from './Entity.model';
import { FilterNode } from './FilterNode.model';

export class EntityFilterTree {
    public root: FilterNode = new FilterNode();

    public resolveFilterTree(database: MappedDatabase): EntityBase {
        return this.root.resolveFilterNode(database);
    }
}
