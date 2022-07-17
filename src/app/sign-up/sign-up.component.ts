import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation   from '../validation/validation';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;
  showrepeatPassword: boolean = false;
  users:any;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private http : HttpClient, 
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[!@#$%^&*]+)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,32}$/),
          ]
        ),
        repeatPassword: new FormControl ('', [Validators.required]),
        Rememberme : false,
      },
      {
        validators: [Validation.match('password', 'repeatPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  resertForm(){
    this.form.reset();
    this.submitted = false;
  }
  public togglePassword() {
    this.showPassword = !this.showPassword;
  }
  public togglerepeatPassword() {
    this.showrepeatPassword = !this.showrepeatPassword;
  }

  onSubmit() : void {

    this.http.post<any>("http://localhost:3000/user", this.form.value)
    .subscribe(res => {
      alert("Signup Successfull");
    },err => {
      alert("Something went wrong");
    })
    this.submitted = true;

    if (this.form.invalid) {
      console.log('Disable SignUp')
      return;
    }

    console.log(this.form.value);
  }
}