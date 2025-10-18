export interface RezervacijaModel{

    toyId: number
    userId: string
    kolicina: number
    cena: number
    createdAt: string
    updateAt: string | null
    status: 'rezervisano' | 'pristiglo' | 'otkazano'

}