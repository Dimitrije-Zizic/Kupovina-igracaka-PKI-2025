import axios from "axios";
import { IgrackaModel } from "../models/igrackaModel";
import { AgeGroupModel } from "../models/ageGroupModel";
import { TypeModel } from "../models/typeModel";

const client = axios.create({

    baseURL: 'https://toy.pequla.com/api',
    validateStatus: (status: number) => status === 200,
    headers:{

        'Accept': 'application/json',
        "X-Name": 'PKI/2025'

    }

})

export class IgrackaService{

    static async getAllToys(){

        return await client.get<IgrackaModel[]>(`/toy`)

    }

    static async getToyById(id: number){

        return await client.get<IgrackaModel>(`/toy/${id}`)

    }

     static async getToysByIds(ids: number[]) {
        return await client.request<IgrackaModel[]>({
            url: '/toy/list',
            method: 'post',
            data: ids
        })
    }
    
    static async getToyByPermalink(permalink: string){

        return await client.get<IgrackaModel>(`/toy/permalink/${permalink}`)

    }

    static async getAgeGroups(){

        return await client.get<AgeGroupModel[]>(`/age-group`)

    }

    static async getTyps(){

        return await client.get<TypeModel[]>(`/type`)

    }
    

}