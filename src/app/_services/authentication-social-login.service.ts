import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationSocialLoginService{
    public currentUserGoogle: BehaviorSubject<any>;

    constructor() {
        this.currentUserGoogle = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('dpara_user_google')));
    }

    logout() {
        localStorage.removeItem('dpara_user_google');
        this.currentUserGoogle.next(null);
    }

    addCurrenUser(user) {
        localStorage.setItem('dpara_user_google', JSON.stringify(user));
    }

    clearUser() {
        localStorage.removeItem('dpara_user_google');
    }



    getCurrentUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('dpara_user_google'))).getValue();
    }

}
