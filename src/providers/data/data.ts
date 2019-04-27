import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  apiURL = 'http://192.168.8.101:2222';

  constructor(public http: HttpClient) {
  }

  fetchImageData(){
    const httpOptions = {
      headers: {
        'Content-type':'application/json',
      },
      body: {
        'token': "piita"
      }
    };

    return this.http.get(this.apiURL+ '/get/potatoImages', httpOptions);
  }

}
