import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { InitializeOptions, SocialLogin } from '@capgo/capacitor-social-login';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton
  ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async googleLogin() {
    let options: InitializeOptions = {};
    if (Capacitor.getPlatform() == 'ios') {
      options = {
        google: {
          iOSClientId: environment.google.iOSClientId, // the iOS client id
          iOSServerClientId: environment.google.iOSServerClientId // the iOS server client id (optional)
        },
      }
    } else {
      options = {
        google: {
          webClientId: environment.google.webClientId // the web client id for Android and Web
        }
      }
    }
    await SocialLogin.initialize(options);

    const res = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
      },
    });
    console.log(res);

    // if (res) {
    //   this.socialLoginGoogle(res);
    // }

  }

}
