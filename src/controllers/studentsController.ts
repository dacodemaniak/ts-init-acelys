import { TableHTML } from './../html-elements/table-html';
import { StudentService } from './../services/student-service';

export class StudentsController {
    private readonly studentService: StudentService = new StudentService()

    private readonly app: HTMLElement

    public constructor(app: HTMLElement) {
        this.app = app
    }

    public async displayStudentTable(): Promise<any> {
        const students: Array<any> = await this.getStudents()
        const tableEl: TableHTML = new TableHTML()
        tableEl.setCellDefs([
            'Id',
            'lastName',
            'firstName',
            'Email'
        ])
        tableEl.addContent(students)
        tableEl.compose()
        this.app.appendChild(tableEl.build())
    }

    private getStudents(): Promise<any> {
        return this.studentService.findSimpleStudents()
    }

    private getStudent(id: number): any {}
}