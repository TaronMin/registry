import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});

  region: Array<string> = ['Lorem', 'Lorem', 'Lorem', 'Lorem'];
  school: Array<string> = ['Lorem', 'Lorem', 'Lorem', 'Lorem'];
  subject: Array<string> = ['Lorem', 'Lorem', 'Lorem', 'Lorem'];

  showSubjectErr: boolean = false;
  showSchoolErr: boolean = false;
  showRegionErr: boolean = false;

  confirmPassword:boolean = true;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      tel: new FormControl('+374', [
        Validators.required,
        Validators.pattern('^((\\+374-?)|0)?[0-9]{8}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      region: new FormControl('', [Validators.required]),
      school: new FormControl(''),
      subject: new FormControl(''),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }

  getErrors(control: string) {
    return (
      this.myForm.controls[control].invalid &&
      (this.myForm.controls[control].dirty ||
        this.myForm.controls[control].touched)
    );
  }

  onChange(e: any, selectName: string) {
    if (e.target.value === '' && selectName === 'subject') {
      this.showSubjectErr = true;
    } else if (e.target.value === '' && selectName === 'school') {
      this.showSchoolErr = true;
    } else if (e.target.value === '' && selectName === 'region') {
      this.showRegionErr = true;
    } else {
      if (selectName === 'subject') {
        this.showSubjectErr = false;
      } else if (selectName === 'school') {
        this.showSchoolErr = false;
      } else if (selectName === 'region') {
        this.showRegionErr = false;
      }
    }
  }

  onSubmit(form: FormGroup) {
    let formValues = form.value;
    if (
      this.myForm.controls['password'].value ===
      this.myForm.controls['confirmpassword'].value
    ) {
      localStorage.setItem('user',JSON.stringify(formValues));

      let code = Math.ceil(Math.random() * (98756 - 21345) + 21345);
      localStorage.setItem('code',JSON.stringify(code));
      this.router.navigate(['verify']);
    }else{
      this.confirmPassword = false;
    }
  }
}
