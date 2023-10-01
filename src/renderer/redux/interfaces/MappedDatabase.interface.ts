import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { City } from 'renderer/shared/models/base/City.model';
import { Event } from 'renderer/shared/models/base/Event.model';
import { Flag } from 'renderer/shared/models/interfaces/Flag.interface';
import { Nation } from 'renderer/shared/models/base/Nation.model';
import { PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { PaperPiece } from 'renderer/shared/models/base/PaperPiece.model';
import { Package } from 'renderer/shared/models/files/Package.model';
import { Trait } from '../../shared/models/base/Trait.model';

export interface MappedDatabase {
    packages: { [id: string]: Package };
    attributes: { [id: string]: Attribute };
    traits: { [id: string]: Trait };
    events: { [id: string]: Event };
    flags: { [id: string]: Flag };
    characters: { [id: string]: Character };
    paperPieces: { [id: string]: PaperPiece };
    paperDolls: { [id: string]: PaperDoll };
    nations: { [id: string]: Nation };
    cities: { [id: string]: City };
}
