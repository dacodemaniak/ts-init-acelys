import { TableHTML } from './../html-elements/table-html';
import { StudentService } from './../services/student-service';

export class StudentsController {
    private readonly studentService: StudentService = new StudentService()

    private readonly app: HTMLElement

    private start: number = 0
    private pager: number = 10
    
    public constructor(app: HTMLElement) {
        this.app = app
    }

    public async displayStudentTable(start: number = 0, pager: number = 10): Promise<any> {
        const students: Array<any> = await this.getStudents()
        const tableEl: TableHTML = new TableHTML()
        tableEl.setCellDefs([
            'Id',
            'lastName',
            'firstName',
            'Email'
        ])
        tableEl.addContent(students.slice(start, start + pager))
        tableEl.compose()
        this.app.appendChild(tableEl.build())

        this.setPagination(this.studentService.students)

        // Place event handlers
        StudentService.selectAllHandler(document.getElementById('check-uncheck-all'))
        StudentService.studentCheckHandler(document.querySelectorAll('.student-check'))
    }

    private getStudents(): Promise<any> {
        return this.studentService.findSimpleStudents()
    }

    private setPagination(students: Array<any>): void {
        
        const pages: number = (students.length % (this.pager)) === 0 ?
            students.length / (this.pager) :
            Math.ceil(students.length / (this.pager))

        const pager: HTMLDivElement = document.createElement('div')
        pager.classList.add('pager')

        const pagerSpanTitle: HTMLSpanElement = document.createElement('span')
        pagerSpanTitle.classList.add('title', 'pages')
        const start = this.start === 0 ? this.start + 1 : (this.start + this.pager) / this.pager

        pagerSpanTitle.textContent = `Pages : ${start} of ${pages}`

        // First next button wrapper
        const firstPreviousDiv: HTMLDivElement = document.createElement('div')
        firstPreviousDiv.classList.add('start')
        // First page
        const firstPageButton: HTMLButtonElement = document.createElement('button')
        firstPageButton.type = 'button'
        if (this.start === 0) {
            firstPageButton.setAttribute('disabled', 'disabled')
        }
        firstPageButton.textContent = '<<'
        firstPageButton.classList.add('btn')
        firstPreviousDiv.appendChild(firstPageButton)

        // Previous page
        const previousPageButton: HTMLButtonElement = document.createElement('button')
        previousPageButton.type = 'button'
        if (this.start === 0) {
            previousPageButton.setAttribute('disabled', 'disabled')
        }
        previousPageButton.textContent = '<'
        previousPageButton.classList.add('btn')
        firstPreviousDiv.appendChild(previousPageButton)

        pager.appendChild(firstPreviousDiv)

        pager.appendChild(pagerSpanTitle)

        const nextLastDiv: HTMLDivElement = document.createElement('div')
        nextLastDiv.classList.add('end')
        // Next page
        const nextPageButton: HTMLButtonElement = document.createElement('button')
        nextPageButton.type = 'button'
        if (this.start === pages) {
            nextPageButton.setAttribute('disabled', 'disabled')
        }
        nextPageButton.textContent = '>'
        nextPageButton.classList.add('btn')
        nextLastDiv.appendChild(nextPageButton)

        // Last page
        const lastPageButton: HTMLButtonElement = document.createElement('button')
        if (this.start === (pages * this.pager) - this.pager) {
            lastPageButton.setAttribute('disabled', 'disabled')
            nextPageButton.setAttribute('disabled', 'disabled')
        }
        lastPageButton.textContent = '>>'
        lastPageButton.classList.add('btn')
        nextLastDiv.appendChild(lastPageButton)
        pager.appendChild(nextLastDiv)

        this.app.appendChild(pager)

        // Place handlers
        lastPageButton.addEventListener(
            'click',
            (event: any) => {
                this.start = (pages - 1) * this.pager
                console.log(`Last page : ${this.start}`)
                this.app.querySelector('table').remove()
                this.app.querySelector('.pager').remove()
                this.displayStudentTable(this.start)
            }
        )

        previousPageButton.addEventListener(
            'click',
            (event: any) => {
                this.start = this.start - this.pager
                this.app.querySelector('table').remove()
                this.app.querySelector('.pager').remove()
                this.displayStudentTable(this.start)
            }
        )

        firstPageButton.addEventListener(
            'click',
            (event: any) => {
                this.start = 0
                this.app.querySelector('table').remove()
                this.app.querySelector('.pager').remove()
                this.displayStudentTable()
            }
        )

        nextPageButton.addEventListener(
            'click',
            (event: any) => {
                this.start = this.start + this.pager
                console.log(`Move from ${this.start}`)
                this.app.querySelector('table').remove()
                this.app.querySelector('.pager').remove()
                this.displayStudentTable(this.start)
            }
        )
    }

    private getStudent(id: number): any {}
}