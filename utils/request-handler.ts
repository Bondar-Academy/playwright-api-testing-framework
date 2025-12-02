import { APIRequestContext } from "@playwright/test"
import { APILogger } from "./logger";
import { test } from "@playwright/test"

export class RequestHandler {

    private request: APIRequestContext
    private logger: APILogger
    private baseUrl: string | undefined
    private defaultBaseUrl: string
    private apiPath: string = ''
    private queryParams: object = {}
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}
    private defaultAuthToken: string
    private clearAuthFlag: boolean | undefined

    constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger, authToken: string = '') {
        this.request = request
        this.defaultBaseUrl = apiBaseUrl
        this.logger = logger
        this.defaultAuthToken = authToken
    }

    url(url: string) {
        this.baseUrl = url
        return this
    }

    path(path: string) {
        this.apiPath = path
        return this
    }

    params(params: object) {
        this.queryParams = params
        return this
    }

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers
        return this
    }

    body(body: object) {
        this.apiBody = body
        return this
    }

    clearAuth() {
        this.clearAuthFlag = true
        return this
    }

    async getRequest(statusCode: number) {
        let responseJSON: any

        const url = this.getUrl()
        await test.step(`GET request to: ${url}`, async () => {
            this.logger.logRequest('GET', url, this.getHeades())
            const response = await this.request.get(url, {
                headers: this.getHeades()
            })
            this.cleanupFields()
            const actualStatus = response.status()
            responseJSON = await response.json()
    
            this.logger.logResponse(actualStatus, responseJSON)
            this.statusCodeValidator(actualStatus, statusCode, this.getRequest)
        })

        return responseJSON
    }

    async postRequest(statusCode: number) {
        let responseJSON: any
        const url = this.getUrl()
        await test.step(`POST request to: ${url}`, async () => {
            this.logger.logRequest('POST', url, this.getHeades(), this.apiBody)
            const response = await this.request.post(url, {
                headers: this.getHeades(),
                data: this.apiBody
            })
            this.cleanupFields()
            const actualStatus = response.status()
            try {
                responseJSON = await response.json()
            } catch (error) {
                responseJSON = {}
            }
            this.logger.logResponse(actualStatus, responseJSON)
            this.statusCodeValidator(actualStatus, statusCode, this.postRequest)
        })
    
        return responseJSON
    }

    async putRequest(statusCode: number) {
        let responseJSON: any

        const url = this.getUrl()
        await test.step(`PUT request to: ${url}`, async () => {
            this.logger.logRequest('PUT', url, this.getHeades(), this.apiBody)
            const response = await this.request.put(url, {
                headers: this.getHeades(),
                data: this.apiBody
            })
            this.cleanupFields()
            const actualStatus = response.status()
            try {
                responseJSON = await response.json()
            } catch (error) {
                responseJSON = {}
            }
            this.logger.logResponse(actualStatus, responseJSON)
            this.statusCodeValidator(actualStatus, statusCode, this.putRequest)
        })
        
        return responseJSON
    }

    async deleteRequest(statusCode: number) {
        const url = this.getUrl()
        await test.step(`DELETE request to: ${url}`, async () => {
            this.logger.logRequest('DELETE', url, this.getHeades())
            const response = await this.request.delete(url, {
                headers: this.getHeades()
            })
            this.cleanupFields()
            const actualStatus = response.status()
            this.logger.logResponse(actualStatus)
            this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest)
        })
    }


    private getUrl() {
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`)
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value)
        }
        return url.toString()
    }

    private statusCodeValidator(actualStatus: number, expectStatus: number, callingMethod: Function) {
        if (actualStatus !== expectStatus) {
            const logs = this.logger.getRecentLogs()
            const error = new Error(`Expected status ${expectStatus} but got ${actualStatus}\n\nRecent API Activity: \n${logs}`)
            Error.captureStackTrace(error, callingMethod)
            throw error
        }
    }

    private getHeades() {
        if (!this.clearAuthFlag) {
            this.apiHeaders['Authorization'] = this.apiHeaders['Authorization'] || this.defaultAuthToken
        }
        return this.apiHeaders
    }

    private cleanupFields() {
        this.apiBody = {}
        this.apiHeaders = {}
        this.baseUrl = undefined
        this.apiPath = ''
        this.queryParams = {}
        this.clearAuthFlag = false
    }

}