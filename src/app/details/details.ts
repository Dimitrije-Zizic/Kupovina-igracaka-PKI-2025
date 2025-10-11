import { Component, signal } from '@angular/core';
import { IgrackaModel } from '../../models/IgrackaModel';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../utils';
import { IgrackaService } from '../../services/IgrackaService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

  protected igracka = signal<IgrackaModel | null>(null)

  constructor(protected route: ActivatedRoute, protected utils: Utils){

    this.route.params.subscribe((params: any) => {

      this.utils.showLoading()

      IgrackaService.getToyByPermalink(params['permalink'])
        .then(rsp => {
          this.igracka.set(rsp.data)

          Swal.close()

        })

    })

  }

}
