export class UserAccount {
    constructor(public UID: string,
                public Name: string,
                public Firstname: string,
                public Lastname: string,
                public Identifier: string,
                public EmailAddress: string,
                public ValidFrom: Date,
                public ValidTo: Date) {}
}

// export class UserAccount {
//     public UID: string;
//     public Name: string;
//     public Firstname: string;
//     public Lastname: string;
//     public Identifier: string;
//     public EmailAddress: string;
//     public Mobile: string;
//     public ValidFrom: Date;
//     public ValidTo: Date;
// }