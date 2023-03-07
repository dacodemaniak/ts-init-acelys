export abstract class HTMLComponent {
    protected parent!: HTMLComponent | null
    protected componentType: string
    protected content?: string;

    protected constructor(componentType: string) {
        this.componentType = componentType
    }
    
    public setParent(parent: HTMLComponent | null): void {
        this.parent = parent
    }

    public getParent(): HTMLComponent | null {
        return this.parent
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public setComponentType(type: string): void {
        this.componentType = type;
    }

    public addComponent(component: HTMLComponent): void {};

    public abstract build(): HTMLElement;
}