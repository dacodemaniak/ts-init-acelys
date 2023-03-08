import { HTMLTable } from './html-elements/html-table'
import { ListHTML } from './html-elements/list-html'
import { TableHTML } from './html-elements/table-html';
import { HttpClient } from './http-client/http-client';

import './scss/main.scss';
import { Toast } from './ui/toast';

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

(window as any).onSubmit = async (event: any) => {
    event.preventDefault()

    let form: any = {}
    formFields.forEach((value: string, key: string) => {
        const field: HTMLInputElement = document.querySelector('input[name="' + key + '"]')
        form[key] = field.value
    })
    const firstNameField: HTMLInputElement = document.querySelector('input[name="firstName"]')
    const phoneNumberField: HTMLInputElement = document.querySelector('input[name="phoneNumber"]')
    
    form.firstName = firstNameField.value
    form.phoneNumber = phoneNumberField.value

    console.log(`Form was : ${JSON.stringify(form)}`)

    const httpClient: HttpClient = new HttpClient()

    try {
        const student: any = await httpClient.post(
            'http://127.0.0.1:5000/api/v1/students',
            form
        )
        const toast: Toast = new Toast()
        toast.open(student.email)
        console.log(`Receive : ${JSON.stringify(student)}`)
    } catch(error: any) {
        const toast: Toast = new Toast()
        toast.open(`Something went wrong during operation`)
    }

}