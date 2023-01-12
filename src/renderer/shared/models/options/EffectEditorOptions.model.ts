import { EntityType } from '../enums/Entities.enum';

export enum EffectOriginType {
    TRAIT,
    EVENT,
}

export interface EffectEditorOptions {
    isEventEffect?: boolean;
    specifiedEntities?: {
        [key in EntityType]?: any[];
    };
    allowConditionTree?: boolean;
    effectOriginType?: EffectOriginType;
    effectOriginID?: string;
}
