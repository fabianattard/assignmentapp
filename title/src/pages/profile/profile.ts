import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'profile'})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ UserServiceProvider ]
})
export class ProfilePage {

  private profile = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserServiceProvider
    ) 
    {
      
    }

    ionViewDidLoad()
    {
      this.userService.get_profile().subscribe(
        data => {
          console.log(data.user);
          this.profile = data.user;
        },
        error => {

        }
      );
    }

}
