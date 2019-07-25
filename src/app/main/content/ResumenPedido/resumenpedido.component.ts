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
  MensajeError: string;
  DescuentoPts: number;
  PuntosGanados: number;
  ValorPagarPagoPuntos: number;
}

export interface ReturnsData {
  PuntosUsar: number;
  TotalPagar: number;
  DescuentoPuntos: number;
  EnviandoPedido: boolean;
  PuntosGanados: number;
  ValorPagarPagoPuntos: number;
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
  public PuntosGanadosCalculo: number = 0;

  public ReturnData: ReturnsData[];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResumenPedidoComponent>,
    private Matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {


    this.form = this.formBuilder.group({
      txt_PuntosUsar: [undefined, [Validators.required]]
    });
  }



  ngOnInit() {
    this.PuntosCerrar = 0;
    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/

    this.PuntosGanadosCalculo = this.data.PuntosGanados;

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
    this.ReturnData = [{
      PuntosUsar: this.PuntosCerrar, TotalPagar: this.data.TotalPagar,
      DescuentoPuntos: this.data.DescuentoPts, EnviandoPedido: true,
      PuntosGanados: this.PuntosGanadosCalculo, ValorPagarPagoPuntos: this.data.ValorPagarPagoPuntos
    }]
    this.dialogRef.close(this.ReturnData);

  }


  CalcularTotalPagar(): void {

    this.PuntosGanadosCalculo = this.data.PuntosGanados;

    //Mis puntos deben ser siempre >= a los puntos digitados a usar.
    if (this.data.TusPuntos >= this.form.value.txt_PuntosUsar) {
      this.data.MensajeError = "";
      var ValorPunto = this.data.PrecioEmpresariaTotal / this.data.PrecioPuntosTotal;
      var ValorUsar = 0;
      var TotalPagar = 0;
      var DescuentoPtsTemp = 0;

      //Se valida que si se digitan mas puntos de los necesarios se debe utilizar unicamente los que requiere el pedido.
      if (this.form.value.txt_PuntosUsar > this.data.PrecioPuntosTotal) {
        ValorUsar = this.data.PrecioPuntosTotal * ValorPunto;
        this.data.DescuentoPts = 0;
        this.data.MensajeError = "INGRESO MAS PUNTOS DE LOS NECESARIOS";
        DescuentoPtsTemp = (this.data.PrecioPuntosTotal / this.data.PrecioPuntosTotal) * 100;

        //Si se paga el pedido completo con puntos no debe sumar puntos ganados.
        this.data.PuntosGanados = 0;
      }
      else {
        ValorUsar = this.form.value.txt_PuntosUsar * ValorPunto;
        DescuentoPtsTemp = (this.form.value.txt_PuntosUsar / this.data.PrecioPuntosTotal) * 100;

        //Si se paga el pedido parcial con puntos sumar puntos ganados * % descuento de puntos.
        var PuntosGanadosTemp = 0;
        PuntosGanadosTemp = Math.round(this.PuntosGanadosCalculo - (this.PuntosGanadosCalculo * (DescuentoPtsTemp / 100)));
        this.PuntosGanadosCalculo = PuntosGanadosTemp;
      }

      TotalPagar = (this.data.PrecioEmpresariaTotal - ValorUsar);

      if (TotalPagar >= 0) {
        this.data.TotalPagar = TotalPagar;
        this.data.ValorPagarPagoPuntos = TotalPagar;
      }
      else {
        this.data.TotalPagar = 0;
      }

      this.data.DescuentoPts = DescuentoPtsTemp;

    }
    else {
      this.txt_PuntosUsar = 0;
      this.data.TotalPagar = this.data.PrecioEmpresariaTotal;
      this.data.DescuentoPts = 0;
      this.data.MensajeError = "PUNTOS INSUFICIENTES";
    }


  }

}
