import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../app/_interceptor/auth-Interceptor';
import { HttpRequestInterceptor } from '../app/_interceptor/http-request.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { AppHeaderComponent } from './_layouts/app-header/app-header.component';
import { DefaultLayoutComponent } from './_layouts/default-layout/default-layout.component';
import { DefaultHeaderComponent } from './_layouts/default-header/default-header.component';
import { ClientLayoutComponent } from './_layouts/client-layout/client-layout.component';
import { ClientHeaderComponent } from './_layouts/client-header/client-header.component';
import { AccountingLayoutComponent } from './_layouts/accounting-layout/accounting-layout.component';
import { AccountingHeaderComponent } from './_layouts/accounting-header/accounting-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { PermissionDirective } from './_directives/permission.directive';
registerLocaleData(ptBr);
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    ClientHeaderComponent,
    ClientLayoutComponent,
    AccountingLayoutComponent,
    AccountingHeaderComponent,
    DefaultLayoutComponent,
    DefaultHeaderComponent,
    PermissionDirective    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {      provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        { id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('242352987516-jhh5432u79k563jv34oq881fsm24v9i8.apps.googleusercontent.com'),
        },
        { id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('clientId'),
        },
        { id: AmazonLoginProvider.PROVIDER_ID,
          provider: new AmazonLoginProvider('clientId'),
        },
      ],
    } as SocialAuthServiceConfig ,
  } 
  ],
  bootstrap: [AppComponent],
  exports: [
    PermissionDirective
  ]
})
export class AppModule { }
