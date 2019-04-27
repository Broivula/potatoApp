import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { ImagePage } from "../image/image";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageData;
  imagesLoaded = false;
  frontPageArray = [];

  constructor(public navCtrl: NavController, private data: DataProvider) {

  }

  fetchImageData(){
    this.data.fetchImageData().subscribe( res => {
      this.imageData = res;
      this.urlParser(this.imageData).then(() => {
        console.log(this.imageData);
        this.imagesLoaded = true
      })
    })
  }

  urlParser (data){
    return new Promise((resolve, reject) => {
      for(let key of Object.keys(data)){
        var tempstr = (key.split("-").slice(1)).toString().replace(",", ".");
        this.frontPageArray.push(tempstr.replace(",", "."));
        let tempArr : [string] = this.imageData[key];
        for(let i in tempArr){
          tempArr[i] = 'http://'+'192.168.8.101'+':2222/get/potatoImages/' + key + '!' + tempArr[i]
        }
        this.imageData[key] = tempArr
      }
      resolve()
    })
  }

  openImagePage(data){
    console.log(data);
    let tempstr = ("potato-" + data).replace(".", "-").replace(".", "-");
    let tempArr = this.imageData[tempstr];
  //  console.log(tempArr);
    this.navCtrl.push(ImagePage, tempArr)
  }


  ionViewDidLoad(){
    this.fetchImageData()
  }
}
