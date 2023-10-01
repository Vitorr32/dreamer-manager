import { v4 as uuidv4 } from 'uuid';

export enum LocationType {
    UNDEFINED = 'model.undefined',

    CANTEEN = 'model.location.type.canteen',
    AUDIO_STUDIO = 'model.location.type.audio_studio',
    DANCE_HALL = 'model.location.type.dance_hall',
    MODELING_STUDIO = 'model.location.type.modeling_studio',
    PHOTO_STUDIO = 'model.location.type.photo_studio',
    STADIUM = 'model.location.type.stadium',
    TELEVISION_STUDIO = 'model.location.type.television_studio',
    THEATER = 'model.location.type.theater',
    NATURAL_PARK = 'model.location.type.park',
    RESTAURANT = 'model.location.type.restaurant',
    ZOO = 'model.location.type.zoo',
}

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Dimension {
    width: number;
    height: number;
    depth: number;
}

export interface LocationFeatures {
    // ID of the owner of this location.
    ownedBy?: string;
    // Capacity of occupants for shows
    capacity?: number;
}

export class Location {
    id: string;

    position: Position;

    dimension: Dimension;

    features: LocationFeatures;

    type: LocationType;

    outside: boolean;

    constructor() {
        this.id = `location_${  uuidv4()}`;

        this.position = {
            x: 0,
            y: 0,
            z: 0,
        };

        this.dimension = {
            width: 1,
            depth: 1,
            height: 1,
        };

        this.features = {};

        this.type = LocationType.UNDEFINED;
        this.outside = false;
    }
}
