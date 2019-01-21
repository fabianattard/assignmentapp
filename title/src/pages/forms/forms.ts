import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSubmissionProvider } from '../../providers/form-submission/form-submission';

@IonicPage({name: 'forms'})
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html'
})
export class FormsPage {

  private formGroup: FormGroup;

  private submitAttempt: boolean = false;
  
  private formType: string = 'absenteeism';
  
  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams:NavParams,
    public userService : UserServiceProvider,
    public formService: FormSubmissionProvider) 
  {
    //This command will set up the form validation
    this.formGroup= this.formBuilder.group({
      //Required fields
      formAbout: ['',Validators.required],
      formMessage: ['',Validators.required]
    });

  }

  public setFormType(type: string)
  {
    this.formType = type;
  }

  //Processes and sends the form request
  public form(): void 
  {
    this.submitAttempt = true;

    if(!this.formGroup.valid)
    {
      return;
    }

    const loader = this.loadCtrl.create({
      content:'Sending form...'
    })
    loader.present();

    this.formService.sendForm({ formType: this.formType, ...this.formGroup.value }).subscribe(
      data =>{
        loader.dismiss();
        this.formService.sendForm(data.formdata);
        this.navCtrl.setRoot('newsFeed',{ }, {animate: true});
      },
      error =>{
        loader.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Form Error',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
