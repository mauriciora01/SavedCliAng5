import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
    { IdGenero: "MICASA", Nombre: 'MI CASA' },
    { IdGenero: "LIDER", Nombre: 'LIDER' },
    { IdGenero: "OTRO", Nombre: 'OTRO' },

  ];

  public ListProvincia: Array<Object> = [
    { IdGenero: "PROVINCIA1", Nombre: 'PROVINCIA1' },
    { IdGenero: "PROVINCIA2", Nombre: 'PROVINCIA2' },
    { IdGenero: "PROVINCIA3", Nombre: 'PROVINCIA3' },

  ];

  public ListCanton: Array<Object> = [
    { IdGenero: "CANTON1", Nombre: 'CANTON1' },
    { IdGenero: "CANTON2", Nombre: 'CANTON2' },
    { IdGenero: "CANTON3", Nombre: 'CANTON3' },

  ];

  public ListParroquia: Array<Object> = [
    { IdGenero: "PARROQUIA1", Nombre: 'PARROQUIA1' },
    { IdGenero: "PARROQUIA2", Nombre: 'PARROQUIA2' },
    { IdGenero: "PARROQUIA3", Nombre: 'PARROQUIA3' },

  ];

  public TelefonoSeleccionado: string = "098387748823";
  public DireccionSeleccionado: string = "Cra 12 # 45 - 30 Frente a la casa amarilla, volteando por la 33.";

  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DatosEnvioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

   
  ngOnInit() {

    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/

    this.form = this.formBuilder.group({
      DespacharA: [undefined, [Validators.required]],
      Provincia: [undefined, [Validators.required]],
      Canton: [undefined, [Validators.required]],
      Parroquia: [undefined, [Validators.required]],
      Telefono: [undefined, [Validators.required]],
      Direccion: [undefined, [Validators.required]],

    });



  }

  onClose(): void {   
    this.dialogRef.close(this.form.value.Direccion);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
