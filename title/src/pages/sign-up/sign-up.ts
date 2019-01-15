import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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

  // Form Groups will automate  any data and validation in our forms.
  private signUpGroup: FormGroup;

  //The submit attempt for the user will start off as false, and we'll switch it on button press. 
  private submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formbuilder: FormBuilder,
    public loadCtrl: LoadingController,
    public userService: UserServiceProvider
    ) {
      // this command will set up the form validation
      this.signUpGroup= this.formbuilder.group({
        // the email field is required
        email: ['',Validators.required],

        // the password field is required
        password: ['',Validators.required],

        // the name field is required
        name: ['',Validators.required],

        // the surname field is required
        surname: ['',Validators.required]
      });
  }

  // Function to toggle password from * to text
  public triggerPassword(): void
  {
    this.passwordHidden = !this.passwordHidden;
    this.passwordInputType = this.passwordHidden ? "password" : "text";
    this.passwordIcon = this.passwordHidden ? "eye-off" : "eye";
  }
  
  // Function to proceed to next screen
  public goToLogIn():void
  {
    this.navCtrl.push("logIn");
  }

  public signUp():void
  {
    // first, make a submit attempt
    this.submitAttempt = true;

    // if the form doesn't validate, stop the function 
    if(!this.signUpGroup.valid)
    {
      return;
    }

    // Create and show a loading interface 
    const loader = this.loadCtrl.create({
      content:'Signing Up...'
    });
    loader.present();

    //Observable function will only start their code if we write subscribe().
    this.userService.signUp(this.signUpGroup.value).subscribe(
      //We are successful, do the rest
      data => {
        loader.dismiss();
        this.navCtrl.setRoot('logIn', {}, {animate: true});
      },

      // We have an error, handle it 
      error => {
        loader.dismiss();

        // If the website didn't sign us up, show an alert.
        const alert = this.alertCtrl.create({
          title: 'Sign Up Error',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

}
