import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/shared/models';
import { RestApiService } from 'src/shared/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tab:string='signin';
  signInFormGroup: FormGroup;
  credentials : Credentials;
  constructor(private restAPIService : RestApiService) { }

  ngOnInit(): void {
    this.signInForm();
    this.registerForm();
  }

  onSubmit(){
    // new Credentials("7020158245","Creative786@1")
    this.credentials = this.signInFormGroup.value;
    this.restAPIService.login(this.credentials).subscribe(
      data =>{
        console.log("Data : "+data.token);
      }
    );
  }

  private signInForm(){
    this.signInFormGroup = new FormGroup({
      phoneNumber :new FormControl(null,Validators.required),
      password :new FormControl(null,Validators.required),
    })
  }

  private registerForm(){
    this.signInFormGroup = new FormGroup({
      phoneNumber :new FormControl(null,Validators.required),
      password :new FormControl(null,Validators.required),
    })
  }

  setTab(tab: string) {
    this.tab = tab;
  }

}
