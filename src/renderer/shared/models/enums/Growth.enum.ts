export enum Growth {
    UNDEFINED = 'model.undefined',

    // Grow with training, decrease with lack of use
    TECHINAL = 'model.attribute.growth.technical',
    // Grow with age and emotial stability, decrease with emotional instability. Starts low with young Characters
    MENTAL = 'model.attribute.growth.mental',
    // Curved growth: increases with age until peak, then slow decreases until retirement
    PHYSICAL = 'model.attribute.growth.physical',
}
