import { HTMLTable } from './html-elements/html-table'
import { ListHTML } from './html-elements/list-html'
import { TableHTML } from './html-elements/table-html';

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


        // Instance of HtmlTable
        this.getDatas()
    }

    private async getDatas() {
        const datas: any[] = await this.studentList()
        const names: Array<any> = datas
            .map((data: any) => {
                return {
                    name: data.lastName
                }
            })

        const tableEl: TableHTML = new TableHTML()
        tableEl.addContent(names)
        tableEl.compose()
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

