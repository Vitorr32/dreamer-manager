import { Effect } from './Effect.model';
import { v4 as uuidv4 } from 'uuid';
import { LANGUAGE_CODE_DEFAULT, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';
import { ICONS_FOLDER } from 'renderer/shared/Constants';
import { PLACEHOLDER_TRAIT_ICON } from 'renderer/shared/Constants';

export enum TraitType {
    NORMAL = 'model.trait.type.normal',
    PHYSICAL = 'model.trait.type.physical',
    MENTAL = 'model.trait.type.mental',
    PERSONALITY = 'model.trait.type.personality',
    DEVELOPMENT = 'model.trait.type.development',
    NATIONAL = 'model.trait.type.national',
    SPECIAL = 'model.trait.type.special',
}

export class Trait {
    public id: string;
    public type: TraitType;
    public spawnable: boolean;
    public effects: Effect[];
    public iconPath: string[];
    public absoluteIconPath?: string;

    public localization: {
        [key: string]: {
            name: string;
            description: string;
        };
    };

    constructor() {
        this.id = 'trait_' + uuidv4();

        this.iconPath = [ICONS_FOLDER, TRAIT_DATABASE_FOLDER, PLACEHOLDER_TRAIT_ICON];
        this.localization = {};
        this.type = TraitType.NORMAL;
        this.spawnable = false;
        this.effects = [];
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
