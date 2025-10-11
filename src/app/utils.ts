import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class Utils{

  public bootstrapClasses = {

    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'

  }

  public getImage(id: number){

      return `https://toy.pequla.com/img/${id}.png`

  }

  public showLoading(){

    Swal.fire({

      title: 'Loading...',
      text: 'Molimo sačekajte.',
      customClass: this.bootstrapClasses,
      didOpen: () => {

        Swal.showLoading()

      }

    })
    
  }

  public showAlert(text: string){

    Swal.fire({

      icon: 'info',
      titleText: text,
      customClass: this.bootstrapClasses

    })

  }

  public showError(message: string){

    Swal.fire({

      title: 'Greška',
      confirmButtonText: 'Close',
      text: message,
      icon: 'error',
      customClass: this.bootstrapClasses

    })

  }
  public showConfirm(message: string, callback:Function){

    Swal.fire({

      title: message,
      showCancelButton: true,
      confirmButtonText: 'DA',
      cancelButtonText: 'NE',
      icon: 'question',
      customClass: this.bootstrapClasses
      
    }).then(result => {

      if (result.isConfirmed){

        callback()

      }

    })

  }

}