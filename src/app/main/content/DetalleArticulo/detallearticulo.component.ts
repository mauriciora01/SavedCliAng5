import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_PLU } from 'app/Models/E_PLU';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from 'app/ApiServices/UserService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';

export interface DialogData {
  CodigoRapido: string;
  NombreProductoCompleto: string;
  NombreProd:string;
  Color:string;
  Talla:string;
  ValorUnitario:string;
  NombreImagen:string;
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;             
}

@Component({
  selector: 'detallearticulo',
  templateUrl: 'detallearticulo.component.html',
  styleUrls: ['detallearticulo.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DetalleArticuloComponent implements OnInit {
  TextColor: any
  form: FormGroup;

  
  public Cantidad: number = 1;

  public SessionUser: E_SessionUser = new E_SessionUser()

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DetalleArticuloComponent>,
    private ParameterService: ParameterService,
    private ExceptionErrorService: ExceptionErrorService,
    private UserService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

      this.SessionUser = this.UserService.GetCurrentCurrentUserNow()


      
    }



  ngOnInit() {

    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/

    this.form = this.formBuilder.group({
      Cantidad: [undefined, [Validators.required]],


    });



  }

  onClose(): void {
    this.dialogRef.close(this.form.value.Direccion);
  }

  CalacularResta(): void {
    if ((this.form.value.Cantidad - 1) > 0) {
      this.Cantidad = this.form.value.Cantidad - 1;
    }
    else {

      this.Cantidad = 1;
    }

  }

  CalcularSuma(): void {
    this.Cantidad = this.form.value.Cantidad + 1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
