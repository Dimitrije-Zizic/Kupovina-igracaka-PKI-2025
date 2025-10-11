import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Utils } from './utils';
import { IgrackaService } from '../services/IgrackaService';
import { AgeGroupModel } from '../models/AgeGroupModel';
import { TypeModel } from '../models/TypeModel';

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

  constructor(protected utils: Utils){

    IgrackaService.getAgeGroups()
      .then(rsp => {

        this.uzrasti.set(rsp.data)

      })

    IgrackaService.getTyps()
      .then(rsp => {

        this.tipovi.set(rsp.data)

      })

  }

}
