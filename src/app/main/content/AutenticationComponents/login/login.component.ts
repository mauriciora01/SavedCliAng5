import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { AppSettings } from '../../../../app.settings';
import { Perfiles } from 'app/Enums/Enumerations';
import { E_SessionUser } from 'app/Models/E_SessionUser';
//import { AppSettings } from '../../../../models/AppSettings.model';


@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
    IsAdmin: boolean
    Loading: boolean;
    errorLogin: boolean;
    @ViewChild("jojo") jojo: ElementRef
    loginForm: FormGroup;
    loginFormErrors: any;
    public jey: string;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private Router: Router, private UserService: UserService
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            usuario: {},
            password: {}
        };

        if (AppSettings.Global().TipoAplicacion == 1) {
            this.jey = "none";
            var user: E_Usuario = new E_Usuario();
            user.UserName = "arg@gmail.com"
            user.Passwordd = btoa("123123")
            this.Loading = true
            this.UserService.Login(user).subscribe((x: E_SessionUser) => {
                //debugger
                /*if (x.error != undefined) {
                    if (x.error.Id == 1 || x.error.Id == 2) {
                        this.errorLogin = true
                        this.Loading = false
                        return
                    }
                }*/
                this.Loading = false
                /*if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 1) {
                    this.Router.navigate(["/Carrousel/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 2) {
                    this.Router.navigate(["/mainpageadmin/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 3) {
                    this.Router.navigate(["/mainpagedirector/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 4) {
                    this.Router.navigate(["/mainpageindividuo1/"])
                } else if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == Perfiles.TransportadorCarro) {
                    this.Router.navigate(["/maintransportadorcarro/"])
                }*/


            })
        } else if (AppSettings.Global().TipoAplicacion == 2) {
            this.IsAdmin = true
        }


    }

    ngOnInit() {
        this.UserService.ClearCurrentCurrentUserNow()
        this.loginForm = this.formBuilder.group({
            usuario: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

        sessionStorage.removeItem("CurrentDetallePedido");

    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    loginNow() {
        var user: E_Usuario = new E_Usuario();
        user.UserName = this.loginForm.value.usuario
        user.Passwordd = this.loginForm.value.password
        this.Loading = true
        //*MRG: Llamar a servicios
        this.UserService.Login(user).subscribe((x: E_SessionUser) => {
            //debugger
            if (x.Error != undefined) {
                if (x.Error.Id == 1 || x.Error.Id == 2) {
                    this.errorLogin = true
                    this.Loading = false
                    return
                }
            }
            this.Loading = false
            this.Router.navigate(["/principal/"])
            
        })
        //   ;

        //MRG: Valida un usuario tempooral y redirige.
        //if(user.UserName=="mao@mail.com"&& user.Passwordd=="MTIz")
        //{
            
            
        //}
    }
}
