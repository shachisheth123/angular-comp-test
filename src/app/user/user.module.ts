import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { userRoute } from './user.route';
import { UserService } from './user.service';
import { LogoutComponent } from './logout.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
    declarations: [
        RegistrationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(userRoute)
    ],
    exports: [
        RegistrationComponent,
        LoginComponent,
    ],
    providers:[
        UserService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class UserModule {
}
