import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  loading = false;
  isUserFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = {} as FormGroup;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      friendStatus : [''],
      dob:[''],
      photo:['https://picsum.photos/id/870/200/300?grayscale&blur=2'],
      isActive:[true],
      isAdmin:[false]
    });
  }

  onSubmit() {
    this.isUserFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.checkUserExist();

  }
  checkUserExist(){
    this.userService.getUserByEmail(this.registerForm.value['email'])
    .pipe(first())
    .subscribe({
      next: (data:any) => {if(data.length == 0){
        this.registerNewUser();
      }else{
        alert("User already exists");
      }}
    });

  }
  registerNewUser() {
    this.userService.regiterUser(this.registerForm.value)
    .pipe(first())
    .subscribe({
      next: (data:any) => console.log(data),
      complete:() =>this.router.navigate(['/login'])
    });
  }

  get userFormControls() {
    return this.registerForm.controls;
  }



}
