import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  
  enter:boolean = false;
  isValid:boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getErrors(control: string) {
    return (
      this.myForm.controls[control].invalid &&
      (this.myForm.controls[control].dirty ||
        this.myForm.controls[control].touched)
    );
  }

  get email(){
    return this.myForm.controls['email'].value;
  }

  get pass(){
    return this.myForm.controls['password'].value;
  }

  onSubmit(form: FormGroup) {
    let user = JSON.parse(<string>localStorage.getItem('user'))
    if(user.email === this.email && user.password === this.pass){
      this.enter = true;
      this.isValid = true;
    }else{
      this.isValid = false;
      this.enter = false;
    }
  }
}
