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
import { ClienteService } from 'app/ApiServices/ClienteService';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { E_Ciudad } from 'app/Models/E_Ciudad';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  Nit: string;
  Zona: string;
  EmpresariaLider: string;
  ValorFlete: number;
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


  public TelefonoSeleccionado: string = "";
  public DireccionSeleccionado: string = "";


  public TelefonoComparar: string = "";
  public DireccionComparar: string = "";

  public visibleLocalizacion: boolean = false;
  public visibleMensajeError: boolean = false;
  public visibleGuardar: boolean = false;

  formErrors: any;
  public SessionUser: E_SessionUser = new E_SessionUser()

  public ProvinciaSeleccionado: string = ""; //PROVINCIA = DEPARTAMENTO
  public ListProvincia: Array<E_Provincia> = new Array<E_Provincia>()

  public CantonSeleccionado: string = ""; //CANTON = MUNICIPIO
  public ListCanton: Array<E_Canton> = new Array<E_Canton>()

  public ParroquiaSeleccionado: string = ""; //PARROQUIA = CORREGIMIENTO
  public ListParroquia: Array<E_Parroquia> = new Array<E_Parroquia>()

  public DespacharASeleccionado: string = "";

  public ValorFleteFinal: number = 0;

  constructor(private formBuilder: FormBuilder,
    private ParameterService: ParameterService,
    private UserService: UserService,
    private ClienteService: ClienteService,
    private ExceptionErrorService: ExceptionErrorService,
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

    //Si viene un documento de identidad valido.
    if (this.data.Nit != undefined) {

      this.ParameterService.listarProvincia(this.SessionUser)
        .subscribe((x: Array<E_Provincia>) => {
          this.ListProvincia = x

          //Para que ponga por defecto el que trae sin poderlo modificar.
          //this.ProvinciaSeleccionado = x[0].CodEstado;
        })


      var objCliente: E_Cliente = new E_Cliente()
      var objClienteResp: E_Cliente = new E_Cliente()
      objCliente.Nit = this.data.Nit;
      this.ClienteService.CargarDireccionTelefono(objCliente)
        .subscribe((x: E_Cliente) => {
          objClienteResp = x

          if (x.Error == undefined) {
            //Mensaje de OK
            this.TelefonoSeleccionado = x.Telefono1;
            this.DireccionSeleccionado = x.DireccionPedidos.trim();

            this.TelefonoComparar = this.TelefonoSeleccionado;
            this.DireccionComparar = this.DireccionSeleccionado;
          }
          else {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error. 

            throw new ErrorLogExcepcion("DatosEnvioComponent", "ngOnInit()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
            //---------------------------------------------------------------------------------------------------------------
          }

        })
    }
    else {

      this.visibleMensajeError = true;
    }


    this.form = this.formBuilder.group({
      DespacharA: [undefined, [Validators.required]],
      /*Provincia: [undefined, [Validators.required]],
      Canton: [undefined, [Validators.required]],
      Parroquia: [undefined, [Validators.required]],
      Direccion: [undefined, [Validators.required]],
      */
      Provincia: [undefined, undefined],
      Canton: [undefined, undefined],
      Parroquia: [undefined, undefined],
      Direccion: [undefined, undefined],
      Telefono: [undefined, [Validators.required]],


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

      var objCiudad: E_Ciudad = new E_Ciudad()
      objCiudad.CodCiudad = y.value

      this.ParameterService.ListarCiudad(objCiudad)
        .subscribe((x: E_Ciudad) => {

          if (x.Error == undefined) {
            //Mensaje de OK
            this.data.ValorFlete = x.ValorFlete;
            this.ValorFleteFinal = x.ValorFlete;
          }
          else {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error. 

            throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedCanton()", "No se pudo cargar el valor del flete. CodCiudad:" + objCiudad.CodCiudad, this.SessionUser.Cedula, this.ExceptionErrorService)
            //---------------------------------------------------------------------------------------------------------------
          }

          //Para que ponga por defecto el que trae sin poderlo modificar.
          //this.ProvinciaSeleccionado = x[0].CodEstado;
        })


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

    //var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value)
    //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    this.visibleGuardar = true;
  }


  SelectedDespacharA(y) {

    this.DespacharASeleccionado = y.value;

    if (y.value == "1") {
      this.visibleLocalizacion = true;
      this.visibleGuardar = false;
    }
    else if (y.value == "2") {
      this.visibleLocalizacion = false;
      this.visibleGuardar = true;
    }
    else if (y.value == "3") {
      this.visibleLocalizacion = false;
      this.visibleGuardar = true;
    }
    else if (y.value == "4") {
      this.visibleLocalizacion = false;
      this.visibleGuardar = true;
    }
    else {
      this.visibleLocalizacion = true;
      this.visibleGuardar = true;
    }


    var objCliente: E_Cliente = new E_Cliente()
    var objClienteResp: E_Cliente = new E_Cliente()
    objCliente.Nit = this.data.Nit;
    objCliente.TipoEnvio = Number(this.DespacharASeleccionado)
    objCliente.Zona = this.data.Zona;
    objCliente.EmpresariaLider = Number(this.data.EmpresariaLider);
    this.DespacharASeleccionado
    this.ClienteService.ValidarTipoEnvioPedido(objCliente)
      .subscribe((x: E_Cliente) => {
        objClienteResp = x

        if (x.Error == undefined) {
          //Mensaje de OK
          this.data.ValorFlete = x.ValorFlete;
          this.ValorFleteFinal = x.ValorFlete;
        }
        else {
          //---------------------------------------------------------------------------------------------------------------
          //Mensaje de Error. 

          throw new ErrorLogExcepcion("DatosEnvioComponent", "SelectedDespacharA()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
          //---------------------------------------------------------------------------------------------------------------
        }

      })

    var depObj = this.ListParroquia.find(x => x.CodigoParroquia == y.value)
    //*this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
  }

  onClose(): void {
    this.GuardarInformacion();

    if (this.DespacharASeleccionado == "1") {
      this.dialogRef.close(this.form.value.Direccion + ", $" + this.ValorFleteFinal);
    }
    else if (this.DespacharASeleccionado == "2") {
      this.dialogRef.close("ENVIAR A DIRECTOR: $" + this.ValorFleteFinal);
    }
    else if (this.DespacharASeleccionado == "3") {
      this.dialogRef.close("ENVIAR A LIDER: $" + this.ValorFleteFinal);
    }
    else if (this.DespacharASeleccionado == "4") {
      this.dialogRef.close("ENVIAR A PUNTO DE VENTA: $" + this.ValorFleteFinal);
    }
    else {
      this.dialogRef.close(this.form.value.Direccion + ", $" + this.ValorFleteFinal);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  GuardarInformacion(): void {

    var objCliente: E_Cliente = new E_Cliente()
    var objClienteResp: E_Cliente = new E_Cliente()

    var DireccionGuardar: string = this.DireccionComparar

    if (this.DireccionComparar != this.form.value.Direccion || this.TelefonoComparar != this.form.value.Telefono) {
      if (this.form.value.Direccion != null && this.form.value.Telefono != null) {
        objCliente.GuardarAuditoria = true;
      }
    }

    if (this.form.value.Direccion == null || this.form.value.Direccion == undefined) {
      DireccionGuardar = this.DireccionComparar;
    }
    else {
      DireccionGuardar = this.form.value.Direccion;
    }

    objCliente.Nit = this.data.Nit;
    objCliente.Telefono1 = this.form.value.Telefono.trim();
    objCliente.DireccionPedidos = DireccionGuardar;

    this.ClienteService.ActualizarDireccionTelefono(objCliente)
      .subscribe((x: E_Cliente) => {
        objClienteResp = x

        if (x.Error == undefined) {
          //Mensaje de OK
          //Se guardo OK.
        }
        else {
          //---------------------------------------------------------------------------------------------------------------
          //Mensaje de Error. 
          throw new ErrorLogExcepcion("DatosEnvioComponent", "GuardarInformacion()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
          //---------------------------------------------------------------------------------------------------------------
        }

      })




  }

}
