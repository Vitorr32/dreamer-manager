import { Category } from "../enums/Category.enum";
import { Growth } from "../enums/Growth.enum";

export class Attribute {

    public category: Category = Category.UNDEFINED;
    public growth: Growth = Growth.UNDEFINED;

    //Is a hidden attribute that the player should not know like Potential, Injury Proneness and so on.
    public hidden: boolean = false;
    //Description that will appear when the player hover over the attribute
    public description?: string;
    //Encoding used to show attribute name in interface
    public name?: string;
    //Identifier to find the attribute on search or serialization of JSON
    public id?: string;
}
