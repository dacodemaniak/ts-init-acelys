import { HTMLComponent } from "./html-component";

export class Composite extends HTMLComponent {
    private children: Array<HTMLComponent> = []

    public constructor(componentType: string) {
        super(componentType)
    }
    
    public addComponent(component: HTMLComponent): void {
        this.children.push(component)
        component.setParent(this)
    }

    public build(): HTMLElement {
        const el: HTMLElement = document.createElement(this.componentType)
        if (this.content && this.content.trim().length) {
            el.textContent = this.content
        }
        if (this.children.length) {
            for (const child of this.children) {
                el.appendChild(child.build())
            }
        }
        return el
    }
    
}