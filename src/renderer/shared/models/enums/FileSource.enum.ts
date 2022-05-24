export enum FileSource {
    // The file is in the base game assets folder, so no particular pre-processing is required;
    BASE,
    // The file is in one of the mods folder, so there need to pre-process the correct path using the mod info.
    MOD,
    // The file is on the user computer in a path outside the game folder, normally temporarily.
    ABSOLUTE,
}
