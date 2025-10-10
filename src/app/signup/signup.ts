import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  protected form: FormGroup

  constructor(private formBuilder: FormBuilder, protected router: Router){

    this.form = this.formBuilder.group({

      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      telefon: ['', Validators.required]

    })

  }

  onSubmit(){

    if (!this.form.valid){

      return

    }

    if (this.form.value.password !== this.form.value.repeat){

      return

    }

    try{

      const formValue: any = this.form.value
      delete formValue.repeat

      UserService.signup(formValue)
      this.router.navigateByUrl('/login')

    } catch (e){

      return

    }

  }

}
