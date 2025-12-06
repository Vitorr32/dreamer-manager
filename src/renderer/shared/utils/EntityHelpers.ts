import { Actor } from '../models/base/Actor.model';
import { Character } from '../models/base/Character.model';
import { Dreamer } from '../models/base/Dreamer.model';
import { PaperDoll } from '../models/base/PaperDoll.model';
import { PaperPiece } from '../models/base/PaperPiece.model';
import { Relationship } from '../models/base/Relationship.model';
import { Variables } from '../models/base/Variable.model';
import { EntityType } from '../models/enums/Entities.enum';
import { Trait } from '../models/base/Trait.model';
import { Attribute } from '../models/base/Attribute.model';
import { Agency } from '../models/base/Agency.model';

export function GetVariablesOfEntity(entity: EntityType): Variables {
    switch (entity) {
        case EntityType.CHARACTERS:
            return Character.getEntityVariables();
        case EntityType.TRAITS:
            return Trait.getEntityVariables();
        case EntityType.ATTRIBUTES:
            return Attribute.getEntityVariables();
        case EntityType.DREAMER:
            return Dreamer.getEntityVariables();
        case EntityType.ACTORS:
            return Actor.getEntityVariables();
        case EntityType.RELATIONSHIP:
            return Relationship.getEntityVariables();
        case EntityType.PAPER_DOLL:
            return PaperDoll.getEntityVariables();
        case EntityType.PAPER_PIECE:
            return PaperPiece.getEntityVariables();
        case EntityType.AGENCY:
            return Agency.getEntityVariables();
        default:
            console.error(`Can't get variables of entity ${entity}`);
            return null;
    }
}
