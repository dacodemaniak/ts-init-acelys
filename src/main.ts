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
export class Main {
    private app: HTMLElement = document.querySelector('[app]')

    constructor() {
        // Instance of HtmlTable
        //this.getDatas()
    }

    private async getDatas() {
        const datas: any[] = await this.studentList()
        const names: Array<any> = datas
            .map((data: any) => {
                return {
                    name: data.lastName,
                    firstname: data.firstName
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
const main = new Main();

/**
 * Event handling with JS
 */
(window as any).keyupHandler = (el: any) => {
    console.log(el instanceof HTMLInputElement ? 'ok' : 'ko')


    // Get value user entered
    const field: HTMLInputElement = document.querySelector('input[name="lastName"]')
    if (field) {
        // How to get the value for that field
        const value: string = field.value;

        // Ensure that not only spaces
        if (value.trim().length) {
            // Remove disabled attribute
            document.querySelector('form button').removeAttribute('disabled')
            return
        }
    }
    document.querySelector('form button').setAttribute('disabled', 'disabled')
}

