export class WebConfig {
    constructor(public stsUrl: string, public clientUrl: string, public authentication: boolean, public clientId: string, public scopes: string) {}
}