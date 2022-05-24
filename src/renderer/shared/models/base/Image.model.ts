// import { FileSource } from '../enums/FileSource.enum';

// export class Image {
//     // The source of this image file.
//     public fileSource: FileSource = FileSource.BASE;
//     // The id of the mod in case this image has a mod as source.
//     public modID: string | null = null;
//     // The relative path from a asset folder in either the base game files or a mod.
//     public relativePath: string | null = null;
//     // The absolute path in the user device to the image file.
//     public absolutePath: string | null = null;
//     //Is a hidden attribute that the player should not know like Potential, Injury Proneness and so on.
//     public displayName: string = false;
//     //Description that will appear when the player hover over the attribute
//     public description: string;
//     //Encoding used to show attribute name in interface
//     public name: string;
//     //Identifier to find the attribute on search or serialization of JSON
//     public id: string;

//     constructor(name: string, description: string, hidden: boolean = false, category: Category, growth: Growth) {
//         this.id = 'attr_' + uuidv4();
//         this.name = name;
//         this.description = description;
//         this.hidden = hidden;
//         this.category = category;
//         this.growth = growth;
//     }
// }
