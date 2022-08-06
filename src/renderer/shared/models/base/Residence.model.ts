import { Nation } from '../enums/Nation.enum';
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
    public nation: Nation;
    public city: City;

    public affluency: Affluency;
}
