import { MappedDatabase } from 'renderer/redux/interfaces/MappedDatabase.interface';
import { FilterNode } from './FilterNode.model';

export class EntityFilterTree {
    public root: FilterNode = new FilterNode();

    public resolveFilterTree(database: MappedDatabase): string[] {
        const filteredEntities = this.root.resolveFilterNode(database);

        console.log('filteredEntities', filteredEntities);

        return filteredEntities.map((entity) => entity.id);
    }
}
