import { EntityFilter, ExternalExpandedEntityFilter } from './models/base/EntityVariableValue.model';
import { VariableOperator } from './models/base/Variable.model';
import { Entity } from './models/enums/Entities.enum';

export const MAX_NUMBER_OF_TRAITS_GENERATED = 5;
export const MAX_NUMBER_OF_TRAITS = 20;
export const MAX_NUMBER_OF_EFFECTS = 5;

export const MIN_DATE = new Date(872, 1, 1, 0, 0, 0, 0);
export const START_DATE = new Date(972, 3, 15, 0, 0, 0, 0);
export const END_DATE = new Date(1072, 1, 1, 0, 0, 0, 0);

export const PLAYER_AGENCY = 'main_agency';
export const PLAYER_CHARACTER = 'main_char_000';

export const DEFAULT_ENTITY_FILTER: EntityFilter = {
    entity: Entity.NONE,
    operator: VariableOperator.NONE,
    value: '',
    variableKey: '',
};
export const DEFAULT_EXTERNAL_ENTITY_FILTER: ExternalExpandedEntityFilter = {
    ...DEFAULT_ENTITY_FILTER,
    isComparingEntities: false,
    comparingEntityFilter: [],
    isFilteringExternalKey: false,
    externalEntityFilter: [],
};

export const LANGUAGE_CODE_DEFAULT = 'en_US';
export const LANGUAGE_CODES = ['en_US', 'pt_BR'];
export const LANGUAGE_NAME: { [key: string]: string } = {
    en_US: 'American English',
    pt_BR: 'Português Brasileiro',
};

// GAMEPLAY CONSTANTS
export const MINIMUM_DREAMER_POTENTIAL = 50;
export const MAXIMUM_DREAMER_POTENTIAL = 300;

///////////////////////////////
//RESOURCES FOLDER NAME
export const DATABASE_FOLDER = 'database';
export const ICONS_FOLDER = 'icons';
export const TRAIT_DATABASE_FOLDER = 'traits';
export const IMAGES_FOLDER = 'images';
export const SPRITES_FOLDER = 'sprites';
export const GENERIC_SPRITES_FOLDER = 'generic';
export const BACKGROUND_IMAGES_FOLDER = 'background';
export const EVENT_BACKGROUND_IMAGES_FOLDER = 'event';
export const ATTRIBUTES_DATABASE_FOLDER = 'attributes';
export const NATIONS_DATABASE_FOLDER = 'nations';
export const CITIES_DATABASE_FOLDER = 'cities';
export const EVENT_DATABASE_FOLDER = 'events';
export const PAPER_PIECES_FOLDER = 'pieces';
export const BASE_GAME_FOLDER = 'base';
export const CUSTOM_USER_FOLDER = '';

///////////////////////////////
//BASE GAME FILES
export const BASE_TRAIT_FILE = 'BaseGameTraits.json';
export const BASE_EVENT_FILE = 'BaseGameEvents.json';

////////////////////////////////
//RESOURCES FULL QUALIFIED PATH
export const ICONS = 'icons';
export const TRAITS = 'traits';

////////////////////////////////
//PLACEHOLDER RESOURCES.
export const PLACEHOLDER_TRAIT_ICON = 'trait_placeholder.png';
export const PLACEHOLDER_EVENT_BACKGROUND = 'event_placeholder.png';
export const PLACEHOLDER_ACTOR_SPRITE = 'male_0.png';
export const PLACEHOLDER_PIECE_HAIR_FEMALE = 'default_female_body_neutral';
export const PLACEHOLDER_PIECE_BODY_FEMALE = 'default_female_hair';
export const PLACEHOLDER_PIECE_FACE_FEMALE = 'default_female_face';
export const PLACEHOLDER_PIECE_HAIR_MALE = 'default_female_body_neutral';
export const PLACEHOLDER_PIECE_BODY_MALE = 'default_female_hair';
export const PLACEHOLDER_PIECE_FACE_MALE = 'default_female_face';
