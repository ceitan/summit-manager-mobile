import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-guests',
  templateUrl: 'guests.html'
})

export class GuestsPage {

  @ViewChild(Navbar) navBar: Navbar;

  public guestsList: Array<any>;
  public items: Array<any>;
  //public guestsFilled:boolean = false;
  public currName: any;
  public currCode: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dataService: DataServiceProvider,
    private screenOrientation: ScreenOrientation,
    private toast: Toast) {
      // get current
      console.log(this.screenOrientation.type);
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

      let backAction =  platform.registerBackButtonAction(() => {
        this.navCtrl.pop();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        backAction();
      },3);

      this.currName = navParams.get('name');
      this.currCode = navParams.get('code');

      this.dataService.getGuests(this.currCode)
      .subscribe((response)=> {
        this.guestsList = response

        if(this.guestsList !== undefined) {
          this.setItems();
          //this.guestsFilled = true;
          console.log(this.guestsList);
        }
      });
    }

    ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
        // todo something
        this.navCtrl.pop();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }

    setItems() {
      this.items = this.guestsList;
    }

    goHome() {
      this.navCtrl.push(HomePage);
    }

    goAdd() {
      console.log("Función no disponible");
      this.toast.show('Función no disponible', '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }

// 5016960901
    filterItems(ev: any) {
      this.setItems();
      let val = ev.target.value;

      if (val && val.trim() !== '') {
        this.items = this.items.filter(function(item) {
          if( item.Name !== null && item.Email !== null &&
             item.Phone !== null && item.Company !== null &&
             item.Job !== null && item.Status !== null &&
             (item.Name.toLowerCase().includes(val.toLowerCase()) ||
              item.Email.toLowerCase().includes(val.toLowerCase()) ||
              item.Phone.toString().toLowerCase().includes(val.toLowerCase()) ||
              item.Company.toLowerCase().includes(val.toLowerCase()) ||
              item.Job.toLowerCase().includes(val.toLowerCase()) ||
              item.Status.toString().toLowerCase().includes(val.toLowerCase()) ) ) {
            return item;
          }
        });
      }
    }

  }
