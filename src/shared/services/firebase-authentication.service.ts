import { ElementRef, Inject, Injectable, ViewChild } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WindowService } from './window.service';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  userID: string = '';
  windowRef: any;
  public auth: any;

  constructor(private afAuth: AngularFireAuth, private windowService: WindowService, @Inject(FirebaseApp) firebaseApp: any) {
    this.windowRef = windowService;
  }

  recaptchaInit(containerID: string) {
    this.auth = firebase.getAuth()
    this.windowRef.recaptchaVerifier = new firebase.RecaptchaVerifier(containerID, {
      size: 'normal',
      callback: () => {

      }
    }, this.auth);
    this.windowRef.recaptchaVerifier.render();
  }

  async signInWithPhone(phoneNumber :string) {
    var verificationID = null;
    this.afAuth.signInWithPhoneNumber(phoneNumber, this.windowRef.recaptchaVerifier).then((confirmationResult) => {
      this.windowRef.confirmationResult = confirmationResult;
      verificationID = confirmationResult.verificationId;
    });
    return await verificationID;
  }

  verifyCode(code: string) {
    return this.windowRef.confirmationResult.confirm(code).then((result: any) => {
      return result.user._delegate.uid;
    }).catch(
      (error: any) => console.log(error, "Incorrect code entered")
    );
  }

}
