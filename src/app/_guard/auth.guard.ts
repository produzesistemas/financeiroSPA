import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getCurrentUser();
        const expectedRole = route.data.expectedRole;
        const decoded = jwt_decode(currentUser.token);
        let found = false;
        if (decoded) {
            let value2: any = decoded;
            currentUser.role = value2.role;
        }

        if (!currentUser) {
           this.router.navigate(['index']);
           return false;
        }
        if (state.url === '/' || state.url === '/access-denied') {
            return true;
        }

        if (expectedRole.length === 0) {
            return this.accessDenied();
        }
        

        if (currentUser.role instanceof Array) {
            expectedRole.forEach((e: string) => {
                if (currentUser.role.find(r => r === e) != null) {
                    found = true;
                    return;
                }
            });
        } else {
            if (expectedRole.find(r => r === currentUser.role) != null) {
                return true;
            }
        }
        return found;
    }

    accessDenied() {
        this.authenticationService.clearUser();
        this.router.navigate(['/access-denied']);
        return false;
    }
}
