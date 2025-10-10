import { UserModel } from "../models/user.model";

export class UserService {

    static getUsers(): UserModel[] {

        if (!localStorage.getItem('users')) {

            localStorage.setItem('users', JSON.stringify([

                {

                    ime: 'Petar',
                    prezime: 'Petrovic',
                    email: 'petarpetrovic@gmail.com',
                    password: 'Petar123!',
                    telefon: '123456789'

                }


            ]))

        }

        return JSON.parse(localStorage.getItem('users')!)

    }

    static findUserByEmail(email: string){

        const users = this.getUsers()
        const user = users.find(u => u.email === email)

        if (!user){

            throw new Error('USER_NOT_FOUND')

        }

        return user

    }

    static login(email: string, password: string){

        const user = this.findUserByEmail(email)

        if (user.password !== password){

            throw new Error('BAD_CREDENTIALS')

        }

        localStorage.setItem('active', user.email)

    }

    static signup(user: UserModel){

        const users: UserModel[] = this.getUsers()
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))

    }

    static getActiveUser(){

        const active = localStorage.getItem('active')

        if (!active){

            throw new Error('NO_ACTIVE_USER')

        }
        
        return this.findUserByEmail(active)

    }

    static logout(){

        localStorage.removeItem('active')

    }

}