import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthenticationSocialLoginService } from '../_services/authentication-social-login.service';
import { ApplicationUser } from '../_model/application-user';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-login-empresa',
    templateUrl: './login-empresa.component.html'
})

export class LoginEmpresaComponent implements OnInit {
    form: FormGroup;
    public submitted = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authenticationSocialLoginService: AuthenticationSocialLoginService,
        private authService: SocialAuthService) {
    }

    ngOnInit() {
        if (this.authenticationService.getCurrentUser()) {
            return this.router.navigate(['/dashboard']);
        }
    }


    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialuser => {
            this.authenticationSocialLoginService.clearUser();
            this.authenticationSocialLoginService.addCurrenUser(socialuser);
            // if (!this.authenticationService.getCurrentUser()) {
            const user = new ApplicationUser();
            user.email = socialuser.email;
            user.emailConfirmed = true;
            user.phoneNumberConfirmed = false;
            user.userName = socialuser.firstName;
            user.provider = 'GOOGLE';
            user.providerId = socialuser.id;
            this.authenticationService.registerPartner(user)
                        .subscribe(
                            result => {
                                this.authenticationService.clearUser();
                                this.authenticationService.addCurrenUser(result);
                                return this.router.navigate(['dashboard']);
                            }
                        );
            //    }
        });
    }

}

