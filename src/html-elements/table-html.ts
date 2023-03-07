/**
 * list-html.ts
 *  Build ul or ol list with some elements
 * @version 1.0.0
 */

import { Composite } from "./../patterns/composite/composite"

export class TableHTML {
    private listContent: Array<string> = ['Aubert', 'Talut', 'Saulay'] // string[] <=> Array<string>
    private table: Composite = new Composite('table')
    private thead: Composite = new Composite('thead')
    private tbody: Composite = new Composite('tbody')
    private tfoot: Composite = new Composite('tfoot')

    public constructor() {
        this.compose()
    }

    private compose(): void {

        // Compose content of tbody
        for (const name of this.listContent) {
            const row: Composite = new Composite('tr')
            
            const td: Composite = new Composite('td')
            td.setContent(name)
            row.addComponent(td)
            
            this.tbody.addComponent(row)
        }
        this.table.addComponent(this.tbody)

        // Compose thead
        const row: Composite = new Composite('tr')

        const th: Composite = new Composite('th')

        th.setContent('Name')
        row.addComponent(th)
        this.thead.addComponent(row)
        this.table.addComponent(this.thead)
    }

    public build(): HTMLElement {
        return this.table.build()
    }
}