import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericHttpService } from './genericHttpService';
import { ApplicationUser } from 'src/app/_model/application-user';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends GenericHttpService<any>{
    protected baseUrl = `${environment.urlApi}`;
    protected baseSite = `${environment.urlApi}`;
    public currentUser: Observable<ApplicationUser>;
    private currentUserSubject: BehaviorSubject<ApplicationUser>;

    constructor(private http: HttpClient) {
        super(http);
        // this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('fin_user')));

        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('fin_user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): ApplicationUser {
        if (this.currentUserSubject.value != null && this.currentUserSubject.value.role == null) {
            const decoded = jwt_decode(this.currentUserSubject.value.token);
            // const tokenPayload: ApplicationUser = JwtDecode(this.currentUserSubject.value.token);
            // if (tokenPayload.role != null) {
            //     this.currentUserSubject.value.role = tokenPayload.role;
            // }
        }
        // if (this.currentUserSubject == null || this.currentUserSubject.value == null) {
        //     return null;
        // }
        // id do usuario logado
        // this.currentUserSubject.value.id = +JwtDecode(this.currentUserSubject.value.token)['nameid'];
        return this.currentUserSubject.value;
    }

    registerMaster(user) {
        return this.postAll('account/registerMaster', user);
    }

    login(user) {
        return this.postAll('account/login', user);
    }

    loginEmpresa(user) {
        return this.postAll('account/loginEmpresa', user);
    }

    alterarUsuario(user) {
        return this.postAll('account/changePassword', user);
    }

    register(user) {
        return this.postAll('account/register', user);
    }

    logout() {
        localStorage.removeItem('fin_user');
        // this.currentUser.next(null);
    }

    addCurrenUser(user) {
        localStorage.setItem('fin_user', JSON.stringify(user));
    }

    clearUser() {
        localStorage.removeItem('fin_user');
    }

    getCurrentUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('fin_user'))).getValue();
    }

    
    getAllRoles() {
        return this.http.get<any>(`${this.getUrlApi()}account/getRoles`);
    }

    getByFilter(filter: any) {
        return this.postAll('account/filter', filter);
      }

      registerPartner(user: ApplicationUser) {
        return this.postAll('account/registerPartner', user);
    }
}
