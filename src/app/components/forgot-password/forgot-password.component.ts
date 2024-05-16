import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import * as $ from 'jquery';
import { ConfirmVal } from 'src/app/directive/confirm.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  registerForm: FormGroup;
  verifyPass: FormGroup;
  loading = false;
  isUserFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = {} as FormGroup;
    this.verifyPass = {} as FormGroup;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      dob: ['', Validators.required]
  });

    this.verifyPass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
      {validator: ConfirmVal('password','confirmPassword')}
    );
  }

  onSubmit() {
    this.isUserFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.checkUserExist();
    this.isUserFormSubmitted = false;
  }

  checkUserExist(){
    this.userService.getUserByEmail(this.registerForm.value['email'])
    .pipe(first())
    .subscribe({
      next: (data:any) => {if(data.length == 0){
        alert("User doesn't exists");
      }else{
        //
        if((data[0].dob) == this.registerForm.value['dob']){
          $('.verifyDetails').addClass('hideElement');
          $('.resetDetails').removeClass('hideElement');
        }else{
          alert("DOB doesn't match");
        }

      }}
    });

  }
  verifyDOB(serviceDOB: string) : boolean {
    let formData = this.registerForm.value['dob'].split('-');
    let serviceData = serviceDOB.split('-');
    if(formData[0] == serviceData[2] && formData[1] == serviceData[1] && formData[2] == serviceData[0]){
      return true;
    }
    return false;
  }

  onResetPassword(){
    this.isUserFormSubmitted = true;

    if (this.verifyPass.invalid) {
      return;
    }

    this.userService.getUserByEmail(this.registerForm.value['email'])
    .pipe(first())
    .subscribe({
      next: (data:any) => {if(data.length == 0){
        alert("User doesn't exists");
      }else{
        data[0].password = this.verifyPass.value['password']
        this.userService.updateUser(data[0])
          .subscribe({
            next: (data1) => console.log("updated data:"+data1),
            error:(err)=> console.log(err) ,
            complete:()=> {alert("Password Reset Successfull")
              this.router.navigate(['/login'])}
          });
      }},
      //complete:()=> this.router.navigate(['/login'])
    });
  }

  get userFormControls() {
    return this.registerForm.controls;
  }
  get verifyFormControls() {
    return this.verifyPass.controls;
  }

}
