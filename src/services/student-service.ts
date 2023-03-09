import { HttpClient } from './../http-client/http-client'

export class StudentService {
    private httpClient: HttpClient = new HttpClient()
    private readonly endPoint: string = 'http://127.0.0.1:5000/api/v1/students'

    public async findAll(): Promise<unknown[]> {
        return this.httpClient.get(this.endPoint)
    }

    public async findSimpleStudents(): Promise<unknown[]> {
        return this.httpClient.get(this.endPoint + '/simple')
    }

    public findOne(id: number): any {}
}