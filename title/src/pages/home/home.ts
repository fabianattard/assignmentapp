import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToNewsFeed():void
  {
    this.navCtrl.push("newsFeed");
  }

  public goToSignUp():void
  {
    this.navCtrl.push("signUp");
  }
}
