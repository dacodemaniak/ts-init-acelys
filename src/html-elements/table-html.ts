/**
 * list-html.ts
 *  Build ul or ol list with some elements
 * @version 1.0.0
 */

import { Composite } from "./../patterns/composite/composite"
import { NodeHTML } from "./nodeHTML"

export class TableHTML {
    private listContent: Array<string> = ['Aubert', 'Talut', 'Saulay'] // string[] <=> Array<string>
    private table: Composite = new Composite()

    public constructor() {
        this.compose()
    }

    private compose(): void {
        this.table.setComponentType('table')

        const thead: Composite = new Composite()
        thead.setComponentType('thead')

        const tbody: Composite = new Composite()
        tbody.setComponentType('tbody')

        const tfoot: Composite = new Composite()
        tfoot.setComponentType('tfoot')

        // Compose content of tbody
        for (const name of this.listContent) {
            const row: Composite = new Composite()
            row.setComponentType('tr')
            const td: Composite = new Composite()
            td.setComponentType('td')
            td.setContent(name)
            row.addComponent(td)
            tbody.addComponent(row)
        }
        this.table.addComponent(tbody)

        // Compose thead
        const row: Composite = new Composite()
        row.setComponentType('tr')
        const th: Composite = new Composite()
        th.setComponentType('th')
        th.setContent('Name')
        row.addComponent(th)
        thead.addComponent(row)
        this.table.addComponent(thead)
    }

    public build(): HTMLElement {
        return this.table.build()
    }
}