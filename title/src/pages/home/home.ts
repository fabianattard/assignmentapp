import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage({ name: 'logIn'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserServiceProvider]
})

export class HomePage {

    // Form Groups will automate  any data and validation in our forms.
    private loginGroup: FormGroup;
    
    //The submit attempt for the user will start off as false, and we'll switch it on button press. 
    private submitAttempt: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams:NavParams,
    public userService : UserServiceProvider) 
    {
      // this command will set up the form validation
      this.loginGroup= this.formBuilder.group({
        // the email field is required
        email: ['',Validators.required],

        // the password field is required
        password: ['',Validators.required]
      });
  }

  public goToNewsFeed():void
  {
    this.navCtrl.push("newsFeed");
  }

  public goToSignUp():void
  {
    this.navCtrl.push("signUp");
  }

    //processes and sends the login request
    public login(): void 
    {
      // first, make a submit attempt
      this.submitAttempt = true;

      // if the form doesn't validate, stop the function 
      if(!this.loginGroup.valid)
      {
        return;
      }
      
      // Create and show a loading interface.
      const loader = this.loadCtrl.create({
        content:'Logging in...'
      });
      loader.present();

      //Observable functions will only start their code if we write subscribe().
      this.userService.login(this.loginGroup.value).subscribe(
      //We are successful, do the rest 
      data => {
        loader.dismiss();
        this.userService.storeUser(data.userdata);
        this.navCtrl.setRoot('newsFeed', {  }, {animate: true});
        
      },

      //we have an error, handle it 
      error => {
        loader.dismiss();

        // if the website didn't log us in, show an alert.
        const alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: error.message,
          buttons: ['OK'] 
        });
        alert.present();
      }
      );
    }
}
