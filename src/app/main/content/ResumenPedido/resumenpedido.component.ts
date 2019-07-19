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
  TotalPrecioCatalogo: number;
  CantidadArticulos: number;
  PuntosPedido: string;
  TusPuntos: number;
  CuantosPuntosUsaras: string;
  TotalPagar: number;
  ValorPuntos: number;
  PrecioEmpresariaTotal: number;
  PrecioPuntosTotal: number;

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


  CalcularTotalPagar(): void {


    //Mis puntos deben ser siempre >= a los puntos digitados a usar.
    if (this.data.TusPuntos >= this.form.value.txt_PuntosUsar) {

      var ValorPunto = this.data.PrecioEmpresariaTotal / this.data.PrecioPuntosTotal;
      var ValorUsar = 0;
      var TotalPagar = 0;

      //Se valida que si se digitan mas puntos de los necesarios se debe utilizar unicamente los que requiere el pedido.
      if (this.form.value.txt_PuntosUsar > this.data.PrecioPuntosTotal) {
        ValorUsar = this.data.PrecioPuntosTotal * ValorPunto;
      }
      else {
        ValorUsar = this.form.value.txt_PuntosUsar * ValorPunto;
      }

      TotalPagar = (this.data.PrecioEmpresariaTotal - ValorUsar);

      if (TotalPagar >= 0) {
        this.data.TotalPagar = TotalPagar;
      }
      else {
        this.data.TotalPagar = 0;
      }
    }
    else {
      this.txt_PuntosUsar = 0;
      this.data.TotalPagar =this.data.PrecioEmpresariaTotal;
    }


  }

}
