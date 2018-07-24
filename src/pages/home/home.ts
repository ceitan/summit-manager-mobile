import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SponsorPage } from '../sponsor/sponsor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public currUserJson : any;
  public currCode: any;
  public logging: boolean = false;
  private login_form : FormGroup;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public dataService: DataServiceProvider,
    private screenOrientation: ScreenOrientation,
    private formBuilder: FormBuilder,
    private backgroundMode: BackgroundMode,
    private storage: Storage,
    private appMinimize: AppMinimize,
    private toast: Toast) {
      // get current
      console.log(this.screenOrientation.type);
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      this.login_form = this.formBuilder.group({
        code: ['', Validators.required]
      });

      let backAction =  platform.registerBackButtonAction(() => {
        this.appMinimize.minimize();
        //this.navCtrl.pop();
      },1);

      this.storage.get('code').then((val) => {
        console.log('Your code is', val);
        this.currCode = val;

        if(this.currCode !== null) {
          this.goLoginAux(this.currCode);
        }
      });

    }

    // 7909580543
  goLogin() {
    this.logging = true;
    this.goLoginAux(this.login_form.value.code);
  }

  goLoginAux(pcode: any) {
    this.dataService.getLogin(pcode)
    .subscribe((response) => {
      this.currUserJson = response
      console.log(this.currUserJson);

      if(this.currUserJson.Type === 2) {
        console.log("SponsorPage");
        this.storage.set('code', this.currUserJson.Code);
        this.goToSponsor();
        /*this.navCtrl.push(SponsorPage, {name: this.currUserJson.Name,
                                        code: this.currUserJson.Code,
                                        id: this.currUserJson.id});*/
      }
      this.login_form = this.formBuilder.group({
        code: ['', Validators.required]
      });
      this.logging = false;
    }, (error) => {
      console.log("An error ocurred:" + error.status);
    });
  }

  goToSponsor() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(SponsorPage, {name: this.currUserJson.Name,
                                      code: this.currUserJson.Code,
                                      id: this.currUserJson.id});
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
}
