import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
//import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
//import { E_Imagen } from 'app/Models/E_Imagen';
//import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
//import { E_Departamentos } from 'app/Models/E_Departamentos';
//import { E_Vehiculo } from 'app/Models/E_Vehiculo';
//import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'ubicaciongeneral',
    templateUrl: 'ubicaciongeneral.component.html',
    styleUrls: ['ubicaciongeneral.component.scss']
})
export class UbicacionGeneralComponent implements OnInit {
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    MunicipioSeleccionado: any
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any

    public Nombre: string;
    public descripcion: string;
    public checkedActivo;

    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {
            Nombre: {},
            TipoVehiculo: {},
            Capacidad: {},
            Placa: {},
            Soat: {},
            Pase: {},
            Conductor: {},
            Modelo: {},
            Color: {},
            ValorServicio: {},
            Departamentos: {},
            Municipios: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/maintransportadorcarro'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal

        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            TipoVehiculo: ['', [Validators.required]],
            Capacidad: ['', [Validators.required]],
            Placa: ['', [Validators.required]],
            Soat: ['', [Validators.required]],
            Pase: ['', [Validators.required]],
            Conductor: ['', [Validators.required]],
            Modelo: ['', [Validators.required]],
            Color: ['', [Validators.required]],
            ValorServicio: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    EnviarInfo() {


    }


}

