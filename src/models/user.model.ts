import { RezervacijaModel } from "./rezervacija.model"

export interface UserModel{
    
    ime: string
    prezime: string
    email: string
    password: string
    telefon: string
    korpa: RezervacijaModel[]
    data: RezervacijaModel[]

}