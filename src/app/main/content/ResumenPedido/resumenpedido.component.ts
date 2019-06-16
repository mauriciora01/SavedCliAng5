import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;

  Numero: string;

  Valor: string;
  Portal: string;
  Zona: string;
  Campana: string;
  Catalogo: string;
  FechaCreacion: string;


  Nit: string;
  NombreEmpresaria: string;
  TotalPrecioCatalogo: string;
  CantidadArticulos: string;
  PuntosPedido: string;
  TusPuntos: string;
  CuantosPuntosUsaras: string;
  TotalPagar: string;
  ValorPuntos: number;

}

@Component({
  selector: 'resumenpedido',
  templateUrl: 'resumenpedido.component.html',
  styleUrls: ['resumenpedido.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ResumenPedidoComponent implements OnInit {
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  TextColor: any
  form: FormGroup;
  formErrors: any;

  public txt_PuntosUsar: number = 0;
  public PuntosCerrar: number = -1;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResumenPedidoComponent>,
    private Matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {


    this.form = this.formBuilder.group({
      txt_PuntosUsar: [undefined, [Validators.required]]
    });
  }



  ngOnInit() {
    this.PuntosCerrar = -1;
    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/

    this.form = this.formBuilder.group({
      txt_PuntosUsar: [undefined, [Validators.required]],


    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });


    this.formErrors = {
      txt_PuntosUsar: {}
    };

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ConfirmData() {

    this.PuntosCerrar = this.form.value.txt_PuntosUsar; //TODO: AQUI DEPURAR POR QUE NO COGE EL VALOR DEL TXT
    this.dialogRef.close(this.PuntosCerrar);
   
  }

}
