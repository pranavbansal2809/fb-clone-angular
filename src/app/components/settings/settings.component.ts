import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ConfirmVal } from 'src/app/directive/confirm.validator';
import { UserModel } from 'src/app/model/user-model';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  registerForm: FormGroup;
  loading = false;
  isUserFormSubmitted = false;
  userData: UserModel;
  currentUserId : number;
  userInput: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    changeNavbarService: ChangeNavbarService
  ) {
    this.registerForm = {} as FormGroup;
    changeNavbarService.setHomeNavbar(true);
    this.userData = {} as UserModel;
    this.currentUserId = 0;
    this.userInput = {} as UserModel;
  }

  ngOnInit() {
    this.currentUserId =
      JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      dob:['', [Validators.required]],
      phNum:[''],
      photo:['']
    },
    {validator: ConfirmVal('password','confirmPassword')});
    this.checkUserExist();

  }

  onSubmit() {
    this.isUserFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }


    this.updateUser();

  }
  updateUser() {
    this.userInput = this.registerForm.value;
    this.userInput.id = this.currentUserId.toString();
    this.userService.updateUser(this.userInput)
    .pipe(first())
    .subscribe({
      next: (data:any) => console.log(data),
      error:(err)=> console.log(err) ,
      complete:()=> {
        alert("Updation Successfull")
        location.reload();
      }
    });
  }

  setValuesOfForm() {
    //this.userFormControls['firstName'].value = this.userData.firstName;
    this.registerForm.setValue({
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      password: this.userData.password,
      confirmPassword: this.userData.password,
      dob: this.userData.dob,
      phNum: this.userData.phNum|| '',
      photo: this.userData.photo|| '',
      isAdmin: false,
      isActive: true
    })
  }
  checkUserExist(){
    this.userService.getUserById(this.currentUserId.toString())
    .pipe(first())
    .subscribe({
      next: (data:any) => this.userData = data[0],
      complete:()=>    this.setValuesOfForm()
    });

  }

  get userFormControls() {
    return this.registerForm.controls;
  }


}
