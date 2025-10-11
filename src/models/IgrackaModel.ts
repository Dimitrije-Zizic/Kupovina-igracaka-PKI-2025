import { AgeGroupModel } from "./AgeGroupModel"
import { TypeModel } from "./TypeModel"

export interface IgrackaModel{

    toyId: number
    name: string
    permalink: string
    description: string
    targetGroup: 'svi' | 'decak' | 'devojcica'
    productionDate: string
    price: number
    imageUrl: string
    ageGroup: AgeGroupModel
    type: TypeModel

}