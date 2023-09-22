export class User {
    userId!: string | null;
    firstName!: string | null;
    lastName!: string| null;
    token: string | null;

    constructor(userId: string | null,
        firstName: string | null,
        lastName: string | null,
        token: string | null) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }

}