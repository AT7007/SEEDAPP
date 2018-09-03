import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  para = {
    'Latitude': 0,
    'Longitude': 0,
    'Altitude': 0,
    'Accuracy': 0,
    'Heading': 0,
    'Speed': 0,
    'Timestamp': 0
  };

  steps = 0;

  ngOnInit(): void {

    // document.addEventListener('deviceready', this.onDeviceReady, false);
    this.onDeviceReady();

  }

  onDeviceReady() {
    if(window['pedometer']) {
      window['pedometer'].isStepCountingAvailable(this.pedometerSuccessCallback, this.onError);
    }
    console.log('navigator.geolocation works well');
    navigator.geolocation.watchPosition((position) => {
      console.log(this);
      this.para.Latitude =  position.coords.latitude;
      this.para.Longitude =  position.coords.longitude;
      this.para.Altitude =  position.coords.altitude;
      this.para.Accuracy = position.coords.accuracy;
      this.para.Heading =  position.coords.heading;
      this.para.Speed = position.coords.speed;
      this.para.Timestamp =  position.timestamp;
    },
      this.onError,
      { timeout: 30000, enableHighAccuracy: true });
  }

  pedometerSuccessCallback(pedometerData) {
        // pedometerData.startDate; -> ms since 1970
    // pedometerData.endDate; -> ms since 1970
    // pedometerData.numberOfSteps;
    // pedometerData.distance;
    // pedometerData.floorsAscended;
    // pedometerData.floorsDescended;
    this.steps = pedometerData.numberOfSteps;
  }

  // onSuccess Callback
  // This method accepts a Position object, which contains the
  // current GPS coordinates
  //
  onSuccess(position) {
    console.log(this);
    this.para.Latitude =  position.coords.latitude;
    this.para.Longitude =  position.coords.longitude;
    this.para.Altitude =  position.coords.altitude;
    this.para.Accuracy = position.coords.accuracy;
    this.para.Heading =  position.coords.heading;
    this.para.Speed = position.coords.speed;
    this.para.Timestamp =  position.timestamp;
  }

  // onError Callback receives a PositionError object
  //
  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }
}
