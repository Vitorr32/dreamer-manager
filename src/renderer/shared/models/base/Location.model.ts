import { v4 as uuidv4 } from 'uuid';

export enum LocationType {
    UNDEFINED,

    //Location types are divided by the Producer company building and outside buildings

    //INTERNAL
    CANTEEN,
    AUDIO_STUDIO,
    DANCE_HALL,

    //OUTSIDE
    MODELING_STUDIO,
    PHOTO_STUDIO,
    STADIUM,
    TELEVISION_STUDIO,
    THEATER,
    NATURAL_PARK,
    RESTAURANT,
    ZOO,
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
    //ID of the owner of this location.
    ownedBy?: string;
    //Capacity of occupants for shows
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
        this.id = 'location_' + uuidv4();

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
