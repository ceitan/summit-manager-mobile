import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
//import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-visitors',
  templateUrl: 'visitors.html'
})

export class VisitorsPage {

  @ViewChild(Navbar) navBar: Navbar;

  public visitorsList: any[];
  public items: Array<any>;
  public currName: any;
  public currCode: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dataService: DataServiceProvider,
    private screenOrientation: ScreenOrientation) {
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

      this.dataService.getVisitors(this.currCode)
      .subscribe((response)=> {
        this.visitorsList = response

        if(this.visitorsList !== undefined) {
          this.setItems();
          //this.visitorsFilled = true;
          console.log(this.visitorsList);
        }
      });
    }

    setItems() {
      this.items = this.visitorsList;
    }

    ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
        // todo something
        this.navCtrl.pop();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
    }

    filterItems(ev: any) {
      this.setItems();
      let val = ev.target.value;

      if (val && val.trim() !== '') {
        this.items = this.items.filter(function(item) {
          if( item.Name !== null && item.Email !== null &&
             item.Phone !== null && item.Company !== null &&
             item.Job !== null && item.date !== null &&
             (item.Name.toLowerCase().includes(val.toLowerCase()) ||
              item.Email.toLowerCase().includes(val.toLowerCase()) ||
              item.Phone.toString().toLowerCase().includes(val.toLowerCase()) ||
              item.Company.toLowerCase().includes(val.toLowerCase()) ||
              item.Job.toLowerCase().includes(val.toLowerCase()) ||
              item.date.toString().toLowerCase().includes(val.toLowerCase()) ) ) {
            return item;
          }
        });
      }
    }

  }
