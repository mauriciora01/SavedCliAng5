import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'ubicaciongeneral',
    templateUrl: 'ubicaciongeneral.component.html',
    styleUrls: ['ubicaciongeneral.component.scss']
})
export class UbicacionGeneralComponent implements OnInit {

    form: FormGroup;

    texto : string = 'Wenceslau Braz - Cuidado com as cargas';
    lat: number = -23.8779431;
    lng: number = -49.8046873;
    zoom: number = 3;
    dir = undefined;
    address= undefined;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
    ) {        
        if (navigator)
        {
        navigator.geolocation.getCurrentPosition( pos => {
            this.lng = +pos.coords.longitude;
            this.lat = +pos.coords.latitude;
          });
        }

    }

  
    ngOnInit() {
        
        this.form = this.formBuilder.group({
            Direccion: [undefined, undefined], 
          });      
    }

    onLocalizate(): void {
        
        if (navigator)
        {
        navigator.geolocation.getCurrentPosition( pos => {
            this.lng = +pos.coords.longitude;
            this.lat = +pos.coords.latitude;
            this.zoom=16;

            this.getAddress(this.lat, this.lng);
          });

        }
    }

    public getDirection() {
        this.dir = {
          origin: { lat: 24.799448, lng: 120.979021 },
          destination: { lat: 24.799524, lng: 120.975017 }
        }
      }
 

      //Obtiene el nombre de la direccion mas cercana
      getAddress( lat: number, lng: number ) {
        //console.log('Finding Address');
        if (navigator.geolocation) {
          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(lat, lng);
          let request = { latLng: latlng };
          geocoder.geocode(request, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              let result = results[0];
              let rsltAdrComponent = result.address_components;
              let resultLength = rsltAdrComponent.length;
              if (result != null) {
                console.log(result);             
                //this.address = rsltAdrComponent[resultLength - 8].short_name;
                this.address = result.formatted_address;
              } else {
                alert('No hay direccion disponible!');
              }
            }
          });
      }
      }

}

