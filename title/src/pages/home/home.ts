import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
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
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams:NavParams,
    public userService : UserServiceProvider) {

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
      
      //Observable functions will only start their code if we write subscribe().
      this.userService.login().subscribe(
      //We are successful, do the rest 
      data => {
        console.log("We are succesful!");
        console.log(data);
      },

      //we have an error, handle it 
      error => {
        console.error("We have failed!");
        console.error(error);
      }
      );
    }
}
