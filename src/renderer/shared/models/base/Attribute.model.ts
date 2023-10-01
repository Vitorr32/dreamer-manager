import { v4 as uuidv4 } from 'uuid';
import { LANGUAGE_CODE_DEFAULT } from 'renderer/shared/Constants';
import { Category } from '../enums/Category.enum';
import { Growth } from '../enums/Growth.enum';
import { EntityBase } from './Entity.model';

export class Attribute extends EntityBase {
    public category: Category = Category.UNDEFINED;

    public growth: Growth = Growth.UNDEFINED;

    // Is a hidden attribute that the player should not know like Potential, Injury Proneness and so on.
    public hidden: boolean = false;

    // Identifier to find the attribute on search or serialization of JSON
    public id: string;

    public localization: {
        // Language code such as en_US, pt_BR and so on.
        [languageCode: string]: {
            // Encoding used to show attribute name in interface
            name: string;
            // Description that will appear when the player hover over the attribute
            description: string;
        };
    };

    constructor(name: string, description: string, hidden = false, category: Category, growth: Growth) {
        super();

        this.id = `attr_${  uuidv4()}`;
        this.localization[LANGUAGE_CODE_DEFAULT] = {
            name,
            description,
        };
        this.hidden = hidden;
        this.category = category;
        this.growth = growth;
    }

    public getName(languageCode: string): string {
        return this.localization[languageCode]?.name || this.localization[LANGUAGE_CODE_DEFAULT]?.name || '';
    }

    public setName(name: string, languageCode: string): string {
        if (!this.localization[languageCode]) {
            this.localization[languageCode] = {} as any;
        }

        this.localization[languageCode].name = name;
        return this.localization[languageCode].name;
    }

    public getDescription(languageCode: string): string {
        return this.localization[languageCode]?.description || this.localization[LANGUAGE_CODE_DEFAULT]?.description || '';
    }

    public setDescription(description: string, languageCode: string): string {
        if (!this.localization[languageCode]) {
            this.localization[languageCode] = {} as any;
        }

        this.localization[languageCode].description = description;
        return this.localization[languageCode].description;
    }
}
