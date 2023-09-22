import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    title = 'Login';
    public isLoading = false;
    public userMessage = '';
    public user$: Observable<User | null>;
    public formModel = {
        userId: null,
        pwd: null,
        firstName: null,
        lastName: null

    }

    public onLogin = () => {
        this.onReset();
        this.user$ = this.authenticateUser();
    }

    private authenticateUser(): Observable<User | null> {
        let user = this.loginService.authenticate(this.formModel.userId, this.formModel.pwd).pipe(map(response => {
            if (response !== null && response.token) {
                this.userMessage = ` ${response.firstName} ${response.lastName} found`
                return response
            } else {
                this.userMessage = `User and/or password not found`
                return response
            }
        }), catchError(err => {
            this.userMessage = 'An error has occurred'
            return of(null)
        }))

        return user

        // var user = new User("P3063813", "Sirish", "Pilla", '123');
        // this.userMessage = ` ${user.firstName} ${user.lastName} found`
        // return of(user)
    }

    public onKeyPress($event: any) {
        if ($event.key === 'Enter') {
            this.formModel.userId && this.formModel.pwd ? this.onLogin() : null
        }
    }

    public onReset() {
        this.userMessage = ''
    }

    public onClear() {
        this.formModel.userId = null;
        this.formModel.pwd = null;
    }

    constructor(private loginService: LoginService) { }
    ngOnInit() { console.log('Component Initialized') }
}