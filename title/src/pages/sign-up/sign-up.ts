import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name : 'signUp'})
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private password: string;

  private passwordInputType: string = "password";

  private passwordHidden: boolean = true;

  private passwordIcon: string = "eye-off";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  public triggerPassword(): void
  {
    this.passwordHidden = !this.passwordHidden;
    this.passwordInputType = this.passwordHidden ? "password" : "text";
    this.passwordIcon = this.passwordHidden ? "eye-off" : "eye";
  }

}
