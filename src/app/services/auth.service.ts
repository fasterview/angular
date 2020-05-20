import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

    isLogged: boolean = false;
    state: Subject<boolean> = new Subject<boolean>();   // To omit the state changes

    constructor(private _router: Router){}

    /**
     * Strore the access token then redirect the user to home page
     * @param access_token
     */
    login(access_token){
        localStorage.setItem("access_token", access_token);
        this.changeState(true);

        this._router.navigate(['/']);
    }


    /**
     * Clear localStorage then redirect the user to home page
     */
    logout(){
        localStorage.clear();
        this.changeState(false);   
    }


    /**
     * Change isLogged value then omit the new value to listeners
     * @param state 
     */
    private changeState(state: boolean){
        this.isLogged = state;
        this.state.next(this.isLogged);
    }


}