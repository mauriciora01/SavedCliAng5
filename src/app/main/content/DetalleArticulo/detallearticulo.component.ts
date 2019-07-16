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
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { DetallePedidoComponent } from '../DetallePedido/detallepedido.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

export interface DialogData {
  CodigoRapido: string;
  NombreProductoCompleto: string;
  NombreProd: string;
  Color: string;
  Talla: string;
  ValorUnitario: string;
  NombreImagen: string;
  PLU: number;
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  PorcentajeDescuento: number;
  PrecioPuntos: number;
  Disponible: string;
  PrecioEmpresaria: number;
  CarpetaImagenes: string;
  TipoEnvio: string;
  CodCiudadDespacho: string;
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
  public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()

  public Cantidad: number = 1;

  public SessionUser: E_SessionUser = new E_SessionUser()

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DetalleArticuloComponent>,
    private ParameterService: ParameterService,
    private ExceptionErrorService: ExceptionErrorService,
    private UserService: UserService,
    private DetallePedidoService: DetallePedidoService,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.SessionUser = this.UserService.GetCurrentCurrentUserNow()


    this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
    data.CarpetaImagenes = this.SessionEmpresaria.CarpetaImagenes;



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

  onAdicionarArticulo(): void {

    var DetallePedido: E_PLU = new E_PLU()

    DetallePedido.CodigoRapido = this.data.CodigoRapido;
    DetallePedido.NombreProducto = this.data.NombreProductoCompleto;
    DetallePedido.PrecioConIVA = Number(this.data.ValorUnitario);
    DetallePedido.PorcentajeDescuento = this.data.PorcentajeDescuento;
    DetallePedido.Cantidad = this.form.value.Cantidad;
    DetallePedido.PrecioCatalogoTotalConIVA = Number(this.form.value.Cantidad) * Number(this.data.ValorUnitario);
    DetallePedido.PrecioEmpresaria = this.data.PrecioEmpresaria;
    DetallePedido.PrecioPuntos = Number(this.form.value.Cantidad) * Number(this.data.PrecioPuntos);
    DetallePedido.PLU = this.data.PLU;

    this.DetallePedidoService.SetCurrentDetallePedido(DetallePedido);

    this.dialogRef.close();
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    //this.bottomSheet.open(DetallePedidoComponent);

    this.bottomSheet.open(DetallePedidoComponent, {
      panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
      data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.data.TipoEnvio, CodCiudadDespacho: this.data.CodCiudadDespacho }
    });
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
