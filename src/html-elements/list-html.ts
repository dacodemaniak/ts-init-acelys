/**
 * list-html.ts
 *  Build ul or ol list with some elements
 * @version 1.0.0
 */
export class ListHTML {
    /**
     * Class attributes
     */
    private listType: string = 'ul'

    private listContent: Array<string> = ['Aubert', 'Talut', 'Saulay'] // string[] <=> Array<string>

    public setListType(listType: string): void {
        this.listType = listType
    }
    
    public build(): HTMLUListElement {
        // Have to build a ul | ol list with as many li as listContent length
        // <ul>
        //  <li>Aubert</li>
        //  <li>Talut</li>
        //  <li>Saulay</li>
        // </ul>

        /**
         * Create a new Object in the DOM
         */
        const list: HTMLUListElement = document.createElement('ul')
        for (const name of this.listContent) {
            const line: HTMLLIElement = document.createElement('li')
            line.textContent = name
            list.appendChild(line)
        }
        return list
    }
}