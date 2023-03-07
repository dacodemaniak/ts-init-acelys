/**
 * list-html.ts
 *  Build ul or ol list with some elements
 * @version 1.0.0
 */

import { Composite } from "./../patterns/composite/composite"

export class TableHTML {
    private listContent: Array<any> = [] // string[] <=> Array<string>
    private table: Composite = new Composite('table')
    private thead: Composite = new Composite('thead')
    private tbody: Composite = new Composite('tbody')
    private tfoot: Composite = new Composite('tfoot')
    private cellDefs: Set<string> = new Set()
    

    public constructor() {}

    public addContent(content: any): TableHTML {
        this.listContent.push(content)
        this.cellDefs.add(content.cellDef)
        return this
    }

    public compose(): void {

        // Compose content of tbody
        for (const content of this.listContent) {
            // Remove cellDef from content
            const cleanContent: any = {}
            for (const property in content) {
                if (property !== 'cellDef') {
                    cleanContent[property] = content[property]
                }
            }

            
            const row: Composite = new Composite('tr')
            
            // Loop over clean properties to add table divider
            for (const property in cleanContent) {
                const td: Composite = new Composite('td')
                td.setContent(cleanContent[property])
                row.addComponent(td)
            }

            
            this.tbody.addComponent(row)
        }
        this.table.addComponent(this.tbody)

        // Compose thead
        const row: Composite = new Composite('tr')

        this.cellDefs.forEach((cd: string) => {
            const th: Composite = new Composite('th')
            th.setContent(cd)
            row.addComponent(th)
        })
        
        this.thead.addComponent(row)
        this.table.addComponent(this.thead)
    }

    public build(): HTMLElement {
        return this.table.build()
    }
}