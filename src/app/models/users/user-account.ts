export class UserAccount {
    constructor(public uid: string, 
                public username: string, 
                public firstname: string,
                public lastname: string,
                public email: string,
                public identifier: string,
                public validFrom: string,
                public validTo: string) {}
}