export class HttpClient {
    private method: string
    private uri: string
    private contentType: string
    private body: string

    public async get(uri: string): Promise<any> {
        this.method = 'get'
        this.uri = uri
        this.contentType = 'application/json'

        const response: any = await this.send()
        
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong while students retrieving')
        }
    }

    public async post(uri: string, body: any): Promise<any> {
        this.method = 'post'
        this.uri = uri
        this.contentType = 'application/json'
        this.body = JSON.stringify(body)

        const response: any = await this.send()
        
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Student already exists')
        }
        
    }

    private async send(): Promise<any> {
        const fetchOptions: any = {
            method: this.method,
            headers: {
                "Content-Type": this.contentType
            }
        }

        if (this.method === 'post') {
            fetchOptions.body = this.body
        }

        return fetch(
            this.uri,
            fetchOptions
        )
    }
}