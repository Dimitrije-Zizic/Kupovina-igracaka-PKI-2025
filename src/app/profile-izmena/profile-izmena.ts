import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Utils } from '../utils';

@Component({
  selector: 'app-profile-izmena',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-izmena.html',
  styleUrl: './profile-izmena.css'
})
export class ProfileIzmena {

  protected user = signal<UserModel | null>(null)

  protected profileForm: FormGroup
  protected passwordForm: FormGroup

  protected dugmePromeniSifru: boolean
  protected formaUpdatePassword: boolean

  constructor(private formBuilder: FormBuilder, protected router: Router, protected detector: ChangeDetectorRef, public utils: Utils){

    try{

      this.user.set(UserService.getActiveUser())

    } catch{

      

    }

    this.profileForm = formBuilder.group({

      ime: [this.user()!.ime, Validators.required],
      prezime: [this.user()!.prezime, Validators.required],
      telefon: [this.user()!.telefon, Validators.required]

    })

    this.passwordForm = formBuilder.group({

      trenutna: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeat: ['', Validators.required]

    })

    this.dugmePromeniSifru = false
    this.formaUpdatePassword = false
    
  }

  protected onProfileSubmit(){

    if (!this.profileForm.valid){

        this.utils.showError('Neispravni podaci!')

        return
        
      }

    this.utils.showConfirm('Da li ste sigurni da želite da ažurirate podatke vašeg naloga?', () => {
      
      UserService.updateUser(this.profileForm.value)

      this.utils.showAlert('Podaci naloga su ažurirani.')

    })
    
  }

  protected onPasswordSubmit(){

    if (!this.passwordForm.valid){

      this.utils.showError('Niste popunili sva polja!')

      return
        
    }
      
    const trenutnaLozinka = this.user()!.password

    if (trenutnaLozinka != this.passwordForm.value.trenutna){

      this.utils.showError('Neispravna trenutna lozinka!')
      return

    }

    if (this.passwordForm.value.newPassword != this.passwordForm.value.repeat){

      this.utils.showError('Nova lozinka se ne podudara!')
      return

    }

    this.utils.showConfirm('Da li ste sigurni da želite da promenite lozinku?', () => {

      UserService.updateUserPassword(this.passwordForm.value.newPassword)

      this.utils.showAlert('Lozinka je ažurirana.')

      this.formaUpdatePassword = false

    })
    
  }
  
  protected promeniSifru(){

    this.dugmePromeniSifru = true
    this.formaUpdatePassword = true

  }

  protected odustaniIzmenaProfile(){

    this.utils.showConfirm('Da li ste sigurni da želite da odustanete?', () => {

      this.router.navigateByUrl('/profile')
      this.profileForm.reset()
      this.passwordForm.reset()

    }
    
    )

  }

  protected odustaniIzmenaUserPassword(){

    this.utils.showConfirm('Da li ste sigurni da želite da odustanete?', () => {

      this.formaUpdatePassword = false
      this.dugmePromeniSifru = false
      this.passwordForm.reset()
      this.detector.detectChanges()

    }
    
    )

  }

}
