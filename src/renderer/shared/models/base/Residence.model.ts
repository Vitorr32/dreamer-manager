import { City } from './City.model';

export enum Affluency {
    DESTITUTE,
    VERY_POOR,
    POOR,
    MIDDLE_CLASS,
    UPPER_MIDDLE_CLASS,
    RICH,
    PROSPEROUS,
    LUXURIOUS,
    NOBILITY,
}

export class Residence {
    public nation: string;
    public city: string;

    public affluency: Affluency;
}
