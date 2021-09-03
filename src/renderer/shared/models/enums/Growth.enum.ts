export enum Growth {
    UNDEFINED,

    // Grow with training, decrease with lack of use
    TECHINAL,
    // Grow with age and emotial stability, decrease with emotional instability. Starts low with young Characters
    MENTAL,
    // Curved growth: increases with age until peak, then slow decreases until retirement
    PHYSICAL,

    MAX_GROWTHS
}