import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});

  isValidCode:boolean = true;

  code:number = 0;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
    this.code = JSON.parse(<string>localStorage.getItem('code'));
  }

  getErrors(control: string) {
    return (
      this.myForm.controls[control].invalid &&
      (this.myForm.controls[control].dirty ||
        this.myForm.controls[control].touched)
    );
  }

  get codeControl(){
    return this.myForm.controls['code'].value
  }

  onSubmit(form:FormGroup){
    if(this.codeControl !== this.code){
      this.isValidCode = false;
    }else{
      this.router.navigate(['sign-in']);
    }
  }
}
