import { AgeGroupModel } from "./ageGroupModel"
import { TypeModel } from "./typeModel"

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
    ocena?: number

}