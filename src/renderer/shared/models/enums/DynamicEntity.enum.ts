export enum DynamicEntity {
    // Allow user to insert a composite filter for the dynamic entity.
    SPECIFIC_FILTER = 'model.modifier.targeting.specific_filter',
    // Character Entity Shortcuts
    PROTAGONIST = 'model.modifier.targeting.protagonist',
    ALL_STAFF_OF_AGENCY = 'model.modifier.targeting.allStudioStaff',
    EVERYONE_ON_AGENCY = 'model.modifier.targeting.allStudioEmployees',
    EVERYONE = 'model.modifier.targeting.everyCharacter',
    SELF = 'model.modifier.targeting.self',
    SELF_DREAMER = 'model.modifier.targeting.selfDreamer',
    SELF_FRIENDS = 'model.modifier.targeting.selfFriends',
    SELF_RIVALS = 'model.modifier.targeting.selfRivals',
    SELF_PRODUCER = 'model.modifier.targeting.selfProducer',
    // Dreamers entities shortcuts
    ALL_DREAMERS_OF_STUDIO = 'model.modifier.targeting.allStudioDreamers',
    // Agency entities shortcut
    MC_AGENCY = 'model.modifier.targeting.mainStudio',
    SELF_AGENCY = 'model.modifier.targeting.selfAgency',
    // Actors entities shortcuts
    ALL_ACTORS = 'model.modifier.targeting.allActors',
}
