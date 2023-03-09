import { HTMLComponent } from "./html-component";

export class Composite extends HTMLComponent {
    private children: Array<HTMLComponent> = []

    public constructor(componentType: string, ...args: any[]) {
        super(componentType, args)
    }
    
    public addComponent(component: HTMLComponent): void {
        this.children.push(component)
        component.setParent(this)
    }

    public build(): HTMLElement {
        const el: HTMLElement = document.createElement(this.componentType)
        if (this.args && this.args.length > 0) {
            const attributes: any = this.args[0][0]
            for (const attribute in attributes) {
                el.setAttribute(attribute, attributes[attribute])
            }
        }

        if (this.content && this.content.toString().trim().length) {
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