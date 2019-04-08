import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { E_Provincia } from 'app/Models/E_Provincia';
import { E_Canton } from 'app/Models/E_Canton';
import { E_Parroquia } from 'app/Models/E_Parroquia';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { UserService } from 'app/ApiServices/UserService';
import { E_SessionUser } from 'app/Models/E_SessionUser';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
}

@Component({

  selector: 'datosenvio',
  templateUrl: 'datosenvio.component.html',
  styleUrls: ['datosenvio.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DatosEnvioComponent implements OnInit {
  TextColor: any
  form: FormGroup;

  public ListDespachar: Array<Object> = [
    { IdTipoEnvio: "1", Nombre: 'MI CASA' },
    { IdTipoEnvio: "2", Nombre: 'DIRECTOR' },
    { IdTipoEnvio: "3", Nombre: 'LIDER' },
    { IdTipoEnvio: "4", Nombre: 'PUNTO DE VENTA' },

  ];


  public TelefonoSeleccionado: string = "098387748823";
  public DireccionSeleccionado: string = "Cra 12 # 45 - 30 Frente a la casa amarilla, volteando por la 33.";

  public visibleLocalizacion: boolean = false;

  formErrors: any;
  public SessionUser: E_SessionUser = new E_SessionUser()

  public ProvinciaSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
  public ListProvincia: Array<E_Provincia> = new Array<E_Provincia>()

  public CantonSeleccionado: string = ""; //CANTON = MUNICIPIO
  public ListCanton: Array<E_Canton> = new Array<E_Canton>()

  public ParroquiaSeleccionado: string = ""; //PARROQUIA = CORREGIMIENTO
  public ListParroquia: Array<E_Parroquia> = new Array<E_Parroquia>()

  public DespacharASeleccionado: string = "";

  constructor(private formBuilder: FormBuilder,
    private ParameterService: ParameterService,
    private UserService: UserService,
    public dialogRef: MatDialogRef<DatosEnvioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.formErrors = {
      DespacharA: {},
      Provincia: {},
      Canton: {},
      Parroquia: {},
    };

  }


  ngOnInit() {

    this.SessionUser = this.UserService.GetCurrentCurrentUserNow()

    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/


    this.ParameterService.listarProvincia(this.SessionUser)
      .subscribe((x: Array<E_Provincia>) => {
        this.ListProvincia = x

        //Para que ponga por defecto el que trae sin poderlo modificar.
        //this.ProvinciaSeleccionado = x[0].CodEstado;
      })


    this.form = this.formBuilder.group({
      DespacharA: [undefined, [Validators.required]],
      Provincia: [undefined, [Validators.required]],
      Canton: [undefined, [Validators.required]],
      Parroquia: [undefined, [Validators.required]],
      Telefono: [undefined, [Validators.required]],
      Direccion: [undefined, [Validators.required]],

    });



  }

  //Llama a los cantones en cascada. Canton = CIUDAD
  SelectedProvincia(y) {

    if (y.value != undefined && y.value != "-1") {

      var objProvincia: E_Provincia = new E_Provincia()
      objProvincia.CodEstado = y.value

      this.ParameterService.listarCanton(objProvincia)
        .subscribe((x: Array<E_Canton>) => {
          this.ListCanton = x
        })
    }
  }

  //Llama a las parroquias en cascada. Parroquias = CORREGIMIENTOS
  SelectedCanton(y) {

    if (y.value != undefined && y.value != "-1") {

      var objCanton: E_Canton = new E_Canton()
      objCanton.CodCiudad = y.value.substring(3)
      objCanton.CodEstado = this.ProvinciaSeleccionado.substring(1)

      this.ParameterService.listarParroquia(objCanton)
        .subscribe((x: Array<E_Parroquia>) => {
          this.ListParroquia = x
        })
    }
  }

  SelectedParroquia(y) {

    var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value)
    //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
  }


  SelectedDespacharA(y) {

    this.DespacharASeleccionado = y.value;

    if (y.value == "1") {
      this.visibleLocalizacion = true;      
    }
    else if (y.value == "2") {
      this.visibleLocalizacion = false;
    }
    else if (y.value == "3") {
      this.visibleLocalizacion = false;
    }
    else if (y.value == "4") {
      this.visibleLocalizacion = false;
    }
    else
    {
      this.visibleLocalizacion = true;
    }

    var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value)
    //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
  }

  onClose(): void {
    this.dialogRef.close(this.form.value.Direccion);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
