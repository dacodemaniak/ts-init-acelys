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
const formFields: Map<string, any> = new Map<string, any>([
    ['lastName', {}],
    ['email', {}],
    ['login', {}],
    ['password', {}]
]);

(window as any).keyupHandler = (el: any) => {
    // Assume form is valid
    let formIsValid: boolean = true

    formFields.forEach((value: any, key: string) => {
        const field: HTMLInputElement = document.querySelector('input[name="' + key + '"]')
        if (field.value.trim().length === 0) {
            formIsValid = false
            return
        }
    })

    // Now change the disabled
    if (formIsValid) {
        document.querySelector('#student-form button').removeAttribute('disabled')
    } else {
        document.querySelector('#student-form button').setAttribute('disabled', 'disabled')
    }
}

