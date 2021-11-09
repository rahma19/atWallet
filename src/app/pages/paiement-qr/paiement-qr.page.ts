import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-paiement-qr',
  templateUrl: './paiement-qr.page.html',
  styleUrls: ['./paiement-qr.page.scss'],
})
export class PaiementQrPage implements OnInit {
  //camera:any;
  imgURI: string = null;
  constructor(private camera: Camera, private qrScanner: QRScanner) {

  }
  ionViewDidEnter() {
    this.openQrSCanner();



    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   alert(imageData)
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   alert(err)
    //   // Handle error
    // });
  }

  openQrSCanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          this.qrScanner.show();
          // window.document.querySelector('ion-app').classList.add('transparent-body');

          this.qrScanner.scan().subscribe((text: string) => {

            alert('Scanned something');

            // window.document.querySelector('ion-app').classList.remove('transparent-body');
            this.qrScanner.hide(); // hide camera preview


          }, err => {
            alert('Scanned something error');

          });


        } else if (status.denied) {
          alert('gbddfggdbf');

          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          alert('gbbf');
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  // @ViewChild('pwaphoto') pwaphoto: ElementRef;


  // constructor() {

  // }

  // openPWAPhotoPicker() {
  //   if (this.pwaphoto == null) {
  //     return;
  //   }

  //   this.pwaphoto.nativeElement.click();
  // }

  // uploadPWA() {

  //   if (this.pwaphoto == null) {
  //     return;
  //   }

  //   const fileList: FileList = this.pwaphoto.nativeElement.files;

  //   if (fileList && fileList.length > 0) {
  //     this.firstFileToBase64(fileList[0]).then((result: string) => {
  //       this.imgURI = result;
  //     }, (err: any) => {
  //       // Ignore error, do nothing
  //       this.imgURI = null;
  //     });
  //   }
  // }

  // private firstFileToBase64(fileImage: File): Promise<{}> {
  //   return new Promise((resolve, reject) => {
  //     let fileReader: FileReader = new FileReader();
  //     if (fileReader && fileImage != null) {
  //       fileReader.readAsDataURL(fileImage);
  //       fileReader.onload = () => {
  //         resolve(fileReader.result);
  //       };

  //       fileReader.onerror = (error) => {
  //         reject(error);
  //       };
  //     } else {
  //       reject(new Error('No file found'));
  //     }
  //   });
  // }

  ngOnInit() {
  }

}
