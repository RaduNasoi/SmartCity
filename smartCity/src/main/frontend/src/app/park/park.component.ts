import { DirectionsMapDirective } from './googlemaps.directive';
import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import { Router} from "@angular/router";
import {MarkerdataService} from "./markerdata.service";
import {ParkService} from "./park.service";
import {Parking} from "./parking.model";
declare var $: any;


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent {

  // parks: Parking[] = [];
  zoom: number = 10;
  lat: number = 44.458418;
  lng: number = 26.129007;
  private index:number = 0;
  private id:number = 0;
  markers: marker[] = [];
  public  parks: Parking[] = [];
  public bool:boolean=false;
  public occupiedPlaces:number=0;
  public parkingLat:number;
  public parkingLng:number;
  public logo:string;
  public specificMarkers:string[]=["info","police","caution","cycling"];






  constructor(private data: MarkerdataService, private parkService: ParkService){



   this.markers = this.data.getAllMarkers();
   //  this.markers = [];
   //  this.parks=[];
   //
    //console.log(this.specificMarkers);
    this.parkService.getParks()
      .subscribe(
        (parks: any[]) => {
          this.parks = parks
          for (let parkings of this.parks) {
            this.bool = false;

            //let freeSpots = parkings.numberOfPlaces - occupiedPlaces;
            // let var1 = parkings.numberOfPlaces - JSON.parse(localStorage.getItem("occupiedPlaces"));
            // localStorage.setItem("numberOfPlaces", JSON.stringify(var1));
            // console.log("occupiedPlaces: "+this.occupiedPlaces);

            var newMarker: marker = {
              visible: true,
              icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
              name: parkings.name,
              lat: parkings.latitude,
              lng: parkings.longitude,
              draggable: false,
              parking:true,
              freeSpotsParking:parkings.numberOfPlaces - JSON.parse(localStorage.getItem("occupiedPlaces"))

            };


            for (let m of this.markers) {
              if(m.lat == newMarker.lat && m.lng == newMarker.lng){
                this.bool = true;
                //this.onDelete(m);

              }
            }
            console.log("bool: "+this.bool);
            if(this.bool == false){
              this.markers.push(newMarker);
              this.data.addMarker(newMarker);
            }

            this.parkingLat = JSON.parse(localStorage.getItem('parkingLat'));
            this.parkingLng = JSON.parse(localStorage.getItem('parkingLng'));

            //localStorage.setItem("firstTime", "false");


          }


        },
        (error) => console.log(error)
      );


    // console.log(this.parks)
    //console.log( localStorage.getItem('markers'));



  }
  @ViewChild(DirectionsMapDirective) dc:DirectionsMapDirective;
ngOnInit(){

  console.log(this.markers);

  if(JSON.parse(localStorage.getItem('directions'))!=null){
    this.dc.searchParking();
  }

}


ngOnDestroy(){

}


  @ViewChild(DirectionsMapDirective) vc:DirectionsMapDirective;
  clicked(){
    this.vc.searchParking();

  }

  isThisParking(m:marker){
    if(JSON.parse(localStorage.getItem('nearestDestination'))!=null){
    // console.log("------------------------------------------");
    // console.log("++++++" +JSON.parse(localStorage.getItem('nearestDestination')).latitude);
    // console.log(JSON.parse(localStorage.getItem('nearestDestination')).longitude);
    // console.log(JSON.parse(localStorage.getItem('nearestDestination')));
    // console.log(m.parking);
    //
    // console.log(m.lat);
    // console.log(m.lng);
    // console.log("------------------------------------------");

    if(JSON.parse(localStorage.getItem('nearestDestination')).latitude == m.lat &&
      JSON.parse(localStorage.getItem('nearestDestination')).longitude == m.lng){

      return true;

      }
    }
    else {
      return false;
    }

  }


  bookAPlace(m:marker) {


      var newMarker: marker = {
        visible: true,
        icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
        name: m.name,
        lat: m.lat,
        lng: m.lng,
        draggable: false,
        parking: true,
        freeSpotsParking: m.freeSpotsParking - 1

      };

      this.onDelete(m);
      this.markers.push(newMarker);
      this.data.addMarker(newMarker);


      this.parkingLat = newMarker.lat;
      this.parkingLng = newMarker.lng;
      console.log(newMarker.lat);
      console.log(newMarker.lng);

      localStorage.setItem("parkingLat", JSON.stringify(newMarker.lat));
      localStorage.setItem("parkingLng", JSON.stringify(newMarker.lng));



    // if(JSON.parse(localStorage.getItem("occupiedPlaces"))!=null){
    //   let occupied =JSON.parse(localStorage.getItem("occupiedPlaces"));
    //   occupied = occupied + this.occupiedPlaces;
    //
    //
    // }
    //
    // else{
    //   localStorage.setItem("occupiedPlaces", JSON.stringify(this.occupiedPlaces));
    // }

  }

  unbookAPlace(m:marker){


    var newMarker: marker = {
      visible: true,
      icon: "http://maps.google.com/mapfiles/ms/micons/parkinglot.png",
      name: m.name,
      lat: m.lat,
      lng: m.lng,
      draggable: false,
      parking: true,
      freeSpotsParking: m.freeSpotsParking + 1

    };

    this.onDelete(m);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
    localStorage.removeItem("parkingLat");
    localStorage.removeItem("parkingLng");
    location.reload();

  }








  onClick(m: any) {
    console.log(m);
    console.log(this.parks);

  }
  onMapClicked($event) {


    if(document.getElementById('marker').innerText != ""){
      this.logo=document.getElementById('marker').innerText;
    }
    else {
      this.logo = "info";
    }
    this.index++;
    var newMarker:marker={
      visible:true,
      icon:"http://maps.google.com/mapfiles/ms/micons/"+this.logo+".png",
      name:'-',
      lat:$event.coords.lat,
      lng:$event.coords.lng,
      draggable:true,
      parking:false,
      username:localStorage.getItem("username").toString()


    }

    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
  }
  onDelete(m:marker)
  {

    // this.markers[this.markers.indexOf(m)].visible = false;
    // this.data.removeMarker(m);

    var position = this.markers.indexOf(m);
    this.markers.splice(this.markers.indexOf(m),1);
    this.data.removeMarker(m,position);

  }

  markerDragEnd(m, $event){

    this.logo=document.getElementById('marker').innerText;

    var newMarker:marker={
      visible:true,
      icon:m.icon,
      name:m.name,
      lat:$event.coords.lat,
      lng:$event.coords.lng,
      draggable:true,
      parking:false,
      username:localStorage.getItem("username").toString()

    };
    this.onDelete(m);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);
  }
  addEvent(m:marker, eventName:string){

    var newMarker:marker={
      visible:true,
      icon:m.icon,
      name:eventName,
      lat:m.lat,
      lng:m.lng,
      draggable:true,
      parking:false,
      username:localStorage.getItem("username").toString()

    };
    this.onDelete(m);
    this.markers.push(newMarker);
    this.data.addMarker(newMarker);

  }

  isParking(m:marker){
    if(m.parking == true){
      return true;
    }
    else return false;

  }



}
export interface marker {
  name?:string;
  icon:string;
  lat: number;
  lng: number;
  draggable: boolean;
  visible:boolean;
  parking:boolean;
  username?:string;
  freeSpotsParking?:number;
}
