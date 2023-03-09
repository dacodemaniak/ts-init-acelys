import { HttpClient } from './../http-client/http-client'

export class StudentService {
    private httpClient: HttpClient = new HttpClient()
    private readonly endPoint: string = 'http://127.0.0.1:5000/api/v1/students'
    private _students: Array<any> = []

    public get students(): Array<any> {
        return this._students
    }

    public async findAll(): Promise<unknown[]> {
        this._students = await this.httpClient.get(this.endPoint)
        return new Promise((resolve) => resolve(this._students))
    }

    public async findSimpleStudents(): Promise<unknown[]> {

        this._students = await this.httpClient.get(this.endPoint + '/simple')
        return new Promise((resolve) => resolve(this._students))
    }

    public findOne(id: number): any {}

    public static selectAllHandler(el: HTMLElement): void {
        el.addEventListener(
            'click',
            (event: any) => {
                const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.student-check')
                if ((el as HTMLInputElement).checked) {
                    // Get all Student checkboxes
                    checkboxes.forEach((c: HTMLInputElement) => c.checked = true)
                } else {
                    checkboxes.forEach((c: HTMLInputElement) => c.checked = false)
                }
            }
        )
    }

    public static studentCheckHandler(elements: NodeListOf<HTMLInputElement>): void {
        const checkbox: HTMLInputElement = document.getElementById('check-uncheck-all') as HTMLInputElement
        
        elements.forEach((el: HTMLInputElement) => {
            el.addEventListener(
                'click',
                (event: any) => {
                    console.log('Student checkbox change')
                    if (el.checked) {
                        // Was unchecked so... uncheck global checkbox
                        const total: number = elements.length
                        let counter: number = 0
                        for (const studentCheckbox of elements) {
                            if (studentCheckbox.checked) counter++
                        }
                        if (total === counter) {
                            checkbox.checked = true
                        }
                    } else {
                        checkbox.checked = false
                    }
                }
            )
        })
    }
}