import { Component, OnInit } from '@angular/core';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from 'app/ApiServices/UserService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'perfil',
    templateUrl: 'perfil.component.html',
    styleUrls: ['perfil.component.scss']
})
export class PerfilComponent implements OnInit {   
    public SessionUser: E_SessionUser = new E_SessionUser()  
    isLinear = false;
   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;


   numero1:number;
    constructor(public dialog: MatDialog,       
        private userService: UserService,private _formBuilder: FormBuilder) {       

    }
    

    ngOnInit(){
        debugger;
         this.SessionUser = this.userService.GetCurrentCurrentUserNow()
         var empre = this.userService.GetCurrentCurrentEmpresariaNow()
         this.firstFormGroup = this._formBuilder.group({
            Cedula: ['', Validators.required]
          });
          /*this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });*/
    }

   
}
