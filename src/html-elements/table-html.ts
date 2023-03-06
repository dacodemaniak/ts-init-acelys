/**
 * list-html.ts
 *  Build ul or ol list with some elements
 * @version 1.0.0
 */

import { NodeHTML } from "./nodeHTML"

export class TableHTML {
    private listContent: Array<string> = ['Aubert', 'Talut', 'Saulay'] // string[] <=> Array<string>

    private nodes: NodeHTML[] = [
        {
            node: 'table',
            children: [
                { 
                    node: 'thead',
                    children: [
                        {
                            node: 'tr',
                            children: [
                                {
                                    node: 'th',
                                    content: 'Name'
                                }
                            ]
                        }
                    ]
                },
                {
                    node: 'tbody',
                    children: []
                }
            ]
        }
    ]

    public constructor() {
        const tbodyContent: NodeHTML = this.nodes[0].children
            .find((obj: NodeHTML) => obj.node === 'tbody')

        for(const name of this.listContent) {
            tbodyContent.children.push({
                node: 'tr',
                children: [
                    {
                        node: 'td',
                        content: name
                    }
                ]
            })
        }
    }
    public build(nodes: NodeHTML[] = null, parentNode: HTMLElement = null): HTMLElement {
        let node: HTMLElement

        if (nodes === null) {
            nodes = this.nodes;
        }
        nodes.forEach((nodeEl: NodeHTML) => {
            // Create the node
            node = document.createElement(nodeEl.node)
            if (nodeEl.content) {
                node.textContent = nodeEl.content
            }
            
            if (parentNode === null) {
                parentNode = node
            }

            if (nodeEl.children && nodeEl.children.length) {
                parentNode.appendChild(this.build(nodeEl.children, node))
            }
        })

        return node as HTMLTableElement
    }
}