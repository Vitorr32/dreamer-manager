import { Nation } from '../enums/Nation.enum';

export class City {
    id: string;
    name: string;
    country: Nation;

    population: number;
    hdi: number;
}
