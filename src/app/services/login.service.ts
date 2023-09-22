import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Observable, catchError, map, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private token: string = "123"

    private userList = [
        new User("P2200241", "Emmit", "Scott", this.token),
        new User("P2164142", "John", "Hedge", this.token),
        new User("P3040038", "Gokulakrishnan", "Rangarajan", this.token),
        new User("P3063813", "Sirish", "Pilla", this.token)
    ]

    // pwd will be first name
    private getUser(userId: string | null, pwd: string | null): Observable<User | null> {
        let foundUser = this.userList.find(user => user && user.userId === userId && user.firstName === pwd) ?? null;
        return of(foundUser);
    }

    public authenticate(userId: string | null, pwd: string | null): Observable<User | null> {
        return this.getUser(userId, pwd).pipe(map(response => {
            if (response && response.userId) {
                response.token = this.token;
                return response;
            } else
                return new User(null, null, null, null);
        }), catchError(err => { return throwError(() => err); }
        ));
    }


    constructor() { }

}