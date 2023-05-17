export class Package {
    public id: string;
    public name: string;
    public description?: string;
    public version: string;
    public author?: string;
    public repository?: string;
    public homepage?: string;
    public bugs?: string;
    public tags?: string[] = [];
    public dependencies?: string[];
}
