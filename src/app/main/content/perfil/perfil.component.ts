import { Component, OnInit } from '@angular/core';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from 'app/ApiServices/UserService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { ParameterService } from 'app/ApiServices/ParametersServices';

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
   Empresariadatos:E_SessionEmpresaria;
   Region:string;
   Vendedor:string;
   Zona:string;
  
    constructor(public dialog: MatDialog,  public parametrosservice:ParameterService,     
        private userService: UserService,private _formBuilder: FormBuilder,private clienteservice: ClienteService) {       

    }
    

    ngOnInit(){
        
         this.SessionUser = this.userService.GetCurrentCurrentUserNow()

         var objClienteResquest: E_Cliente = new E_Cliente()
         objClienteResquest.Nit = this.SessionUser.Cedula

         var x = this.clienteservice.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {
             
            if (x.Error == undefined) {             
                this.Empresariadatos = this.userService.GetCurrentCurrentEmpresariaNow()  
                this.parametrosservice.RegionxId(+this.SessionUser.IdRegional).subscribe((x) => {
                    //
                   this.Region = x.Nombre;
                });  
                this.parametrosservice.VendedorxId(this.SessionUser.IdVendedor).subscribe((x) => {
                    
                   this.Vendedor = x.Nombre;
                }); 

                this.parametrosservice.ZonaxId(this.SessionUser.IdZona).subscribe((x) => {
                    
                   this.Zona = x.Descripcion;
                }); 
            }
        });

         this.firstFormGroup = this._formBuilder.group({
            Cedula: ['', Validators.required],
            Campana: ['', Validators.required],
            Catalogo: ['', Validators.required],
            Grupo: ['', Validators.required],
            Region: ['', Validators.required],
            Vendedor: ['', Validators.required],
            Nombre: ['', Validators.required],
            Zona: ['', Validators.required]
          });
          /*this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });*/
    }

   
}
