import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IgrackaService } from '../services/igrackaService';
import { AgeGroupModel } from '../models/ageGroupModel';
import { TypeModel } from '../models/typeModel';
import { UserService } from '../services/user.service';
import { Utils } from './utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Kupovina-igracaka');

  protected uzrasti = signal<AgeGroupModel[]>([])
  protected tipovi = signal<TypeModel[]>([])

  constructor(protected router: Router, public utils: Utils) {


    (window as any).refreshUser = () => this.utils.refreshUser()

    this.utils.refreshUser()

    IgrackaService.getAgeGroups()
      .then(rsp => {

        this.uzrasti.set(rsp.data)

      })

    IgrackaService.getTyps()
      .then(rsp => {

        this.tipovi.set(rsp.data)

      })


  }

  protected hasAktivan() {

    return this.utils.user() !== null

  }

}
