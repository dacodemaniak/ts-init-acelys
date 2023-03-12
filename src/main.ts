import { StudentsController } from './controllers/studentsController';
import { HTMLTable } from './html-elements/html-table'
import { ListHTML } from './html-elements/list-html'
import { TableHTML } from './html-elements/table-html';
import { HttpClient } from './http-client/http-client';
import { onSubmit, ReactiveForm } from './reactive-form/reactive-form';

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
    private students: Array<any> = []
    private page: number = 0

    constructor() {
        this.getStudents().then((students: Array<any>) => {
            this.students = students
            this.getStudentPage()
        })
        console.log(`No students at this time`)
    }


    private getStudentPage(): void {
            // Créer autant de lignes que nécessaires
            const startIndex: number = this.page * 10
            
            const studentPage: Array<any> = this.students.slice(startIndex, startIndex + 10)

            document.querySelectorAll('table tbody tr').forEach((tr: HTMLTableRowElement) => tr.remove())

            for (const student of studentPage) {
                const rowTemplate: HTMLTemplateElement = document.getElementById('student-tr') as HTMLTemplateElement
                const rowFromTemplate: HTMLElement = rowTemplate.content.cloneNode(true) as HTMLElement
                // Update the input
                const studentCheckbox: HTMLInputElement = rowFromTemplate.querySelector('td:nth-child(1) input') as HTMLInputElement
                studentCheckbox.id = `student_${student.id}`
            

                // Update content of other td
                for (const property in student) {
                    const td: HTMLTableCellElement = rowFromTemplate.querySelector(`[data-rel="${property}"]`)
                    td.textContent = student[property]
                }
                document.querySelector('table tbody').appendChild(rowFromTemplate)
            }
            // Event listeners
            document.getElementById('check-uncheck-all').addEventListener(
                'click',
                (event: any) => {
                    const checkbox: HTMLInputElement = event.target
                    const studentCheckboxes = document.querySelectorAll('.student-checkbox')
                    studentCheckboxes.forEach((cb: HTMLInputElement) => {
                        cb.checked = checkbox.checked
                    })
                }
            )

            // As many event listener than student-cheboxes
            document.querySelectorAll('.student-checkbox').forEach((cd: HTMLInputElement) => {
                cd.addEventListener(
                    'click',
                    (event: any) => {
                        if (event.target.checked === false) {
                            (document.getElementById('check-uncheck-all') as HTMLInputElement).checked = false
                        } else {
                            const studentCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.student-checkbox')

                            const totalCheckboxes = studentCheckboxes.length

                            if ([... studentCheckboxes].filter((cb: HTMLInputElement) => cb.checked).length === totalCheckboxes) {
                                (document.getElementById('check-uncheck-all') as HTMLInputElement).checked = true
                            }

                            let counter: number = 0
                            studentCheckboxes.forEach((cb: HTMLInputElement) => {
                                if (cb.checked) counter++
                            })
                            if (counter === totalCheckboxes) (document.getElementById('check-uncheck-all') as HTMLInputElement).checked = true
                        }
                    }
                )
            })

            // Event handlers for pager buttons
            document.getElementById('next-page').addEventListener(
                'click',
                (event: any) => {
                    console.log('Click on next button was fired')
                    this.page = this.page + 1
                    this.getStudentPage()
                }
            )
    }

    private getStudents(): Promise<any> {
        const uri: string = 'http://127.0.0.1:5000/api/v1/students/simple'

        return fetch(
            uri
        ).then((response: Response) => {
            console.log(JSON.stringify(response))
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

(window as any).onSubmit = (event: any) => onSubmit(event);

/**
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
*/