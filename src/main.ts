import { HTMLTable } from './html-elements/html-table'
import { ListHTML } from './html-elements/list-html'

import './scss/main.scss';

/**
 * main.ts
 * @author Aélion <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 * 
 * Entry point of our frontend application
 */
class Main {
    private app: HTMLElement = document.querySelector('[app]')

    constructor() {
        let myName: string

        myName = 'Jean-Luc'

        /**
        * Récupère dans le DOM (Document Object Model) le premier Objet (élément HTML)
        * qui dispose d'un attribut "app"
        */
        
        this.app.innerHTML = myName

        // New instance of ListHTML
        const listHTML = new ListHTML()
        this.app.appendChild(listHTML.build())

        // Instance of HtmlTable
        this.getDatas()
    }

    private async getDatas() {
        const datas: any[] = await this.studentList()
        const names: Array<string> = datas
            .map((data: any) => data.lastName)

        const tableEl: HTMLTable = new HTMLTable()
        tableEl.setTableContent(names)
        this.app.appendChild(tableEl.build()) 
    }

    private async studentList(): Promise<any> {
        const endPoint: string = 'http://127.0.0.1:5000/api/v1/students'
        
        return fetch(
            endPoint
        ).then((response: Response) => {
            return response.json()
        })
    }
}

/**
 * Launch app
 */
const main = new Main()

