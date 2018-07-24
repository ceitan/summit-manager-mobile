import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { GuestsPage } from '../guests/guests';
import { VisitorsPage } from '../visitors/visitors';

@Component({
  selector: 'page-sponsor',
  templateUrl: 'sponsor.html'
})
export class SponsorPage {

  @ViewChild(Navbar) navBar: Navbar;

  public currName: any;
  public currCode: any;
  public currID: any;
  public scanning: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dataService: DataServiceProvider,
    private barcodeScanner: BarcodeScanner,
    private screenOrientation: ScreenOrientation,
    private toast: Toast) {
      // get current
      console.log(this.screenOrientation.type);
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      this.currName = navParams.get('name');
      this.currCode = navParams.get('code');
      this.currID   = navParams.get('id');

      let backAction =  platform.registerBackButtonAction(() => {
        if(this.scanning !== true) {
          this.navCtrl.pop();
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
          backAction();
        } else {
          console.log("Scanning");
          this.scanning = false;
        }
      },2);
    }

    ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
        // todo something
        if(this.scanning !== true) {
        this.navCtrl.pop();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }
  }

    goGuests() {
      this.navCtrl.push(GuestsPage,
                       {name: this.currName, code: this.currCode});
    }

    goVisitors() {
      this.navCtrl.push(VisitorsPage,
                       {name: this.currName, code: this.currCode});
    }

    goScan() {
      this.scanning = true;
      this.barcodeScanner.scan().then((barcodeData) => {
        this.dataService.postVisitor(this.currID, barcodeData.text)
        .subscribe((response)=> {
          this.scanning = false;
          console.log(response);
          this.toast.show('Visita registrada', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }, (error) => {
          console.log("An error ocurred:" + error.status);
        });
      }, (err) => {
        this.scanning = false;
        this.toast.show(err, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }

/*
    goScan() {
      this.selectedProduct = {};
      this.barcodeScanner.scan().then((barcodeData) => {
        this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
        if(this.selectedProduct !== undefined) {
          this.productFound = true;
          console.log(this.selectedProduct);
        } else {
          this.selectedProduct = {};
          this.productFound = false;
          this.toast.show('Product not found', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      }, (err) => {
        this.toast.show(err, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }
*/

  }
