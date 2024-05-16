import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  registerForm: FormGroup;
  loading = false;
  isUserFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private changeNavbarService: ChangeNavbarService,
  ) {
    this.registerForm = {} as FormGroup;
  }

  ngOnInit() {
    this.changeNavbarService.setHomeNavbar(false);
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
        alert("User doesn't exists");
      }if(!data[0].isActive){
        alert("User not Active");
      }
      else{
        localStorage.setItem('currentUserEmail', data[0].email);
        localStorage.setItem('currentUserId', data[0].id);
        this.router.navigate(['/home'])
      }}
    });

  }

  get userFormControls() {
    return this.registerForm.controls;
  }
}
