import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faChevronDown,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});

  region: Array<string> = ['Lorem', 'Lorem', 'Lorem', 'Lorem'];
  school: Array<string> = [
    'School 1',
    'School 2',
    'School 3',
    'School 4',
    'School 5',
    'School 6',
    'School 7',
    'School 8',
  ];
  subjects: Array<string> = [
    'Subject 1',
    'Subject 2',
    'Subject 3',
    'Subject 3',
    'Subject 4',
    'Subject 5',
    'Subject 6',
    'Subject 7',
    'Subject 8',
    'Subject 9',
  ];

  showSubjectErr: boolean = false;
  showSchoolErr: boolean = false;
  showRegionErr: boolean = false;

  showCheckBox: boolean = false;

  showSchool: boolean = false;
  showSubject: boolean = false;
  showRegion: boolean = false;

  arrowDown = faChevronDown;
  checkBox = faSquareCheck;

  selectSchool: string = 'School';
  selectSubject: string[] = ['Subject'];
  selectRegion: string = 'Region';

  confirmPassword: boolean = true;
  constructor(private router: Router) {}

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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
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
    if (e.target.value === '' && selectName === 'region') {
      this.showRegionErr = true;
    } else if (selectName === 'region') {
      this.showRegionErr = false;
    }
  }

  onSubmit(form: FormGroup) {
    let formValues = form.value;
    if (this.selectSubject.length === 1) {
      this.showSubjectErr = true;
    }
    if (this.selectSchool === 'School') {
      this.showSchoolErr = true;
    }
    if (this.showSubjectErr === true || this.showSchoolErr === true) {
      return;
    }
    if (
      this.myForm.controls['password'].value ===
      this.myForm.controls['confirmpassword'].value
    ) {
      localStorage.setItem('user', JSON.stringify(formValues));

      let code = Math.ceil(Math.random() * (98756 - 21345) + 21345);
      localStorage.setItem('code', JSON.stringify(code));
      this.router.navigate(['verify']);
    } else {
      this.confirmPassword = false;
    }
  }
  showSelect(select: string) {
    switch (select) {
      case 'school':
        this.showSchool = !this.showSchool;
        break;
      case 'region':
        this.showRegion = !this.showRegion;
        break;
      case 'subject':
        this.showSubject = !this.showSubject;
        break;
    }
  }
  showSelected(item: string, selectName: string) {
    switch (selectName) {
      case 'school':
        this.showSelect(selectName);
        this.selectSchool = item;
        this.showSchoolErr = false;
        break;
      case 'region':
        this.showSelect(selectName);
        this.selectRegion = item;
        break;
    }
  }
  onChooseSubject(item: string, e: Event) {
    if (this.selectSubject.includes(item)) {
      this.selectSubject = this.selectSubject.filter((val) => val !== item);
    } else {
      this.selectSubject.push(item);
      this.showSubjectErr = false;
    }
  }
}
