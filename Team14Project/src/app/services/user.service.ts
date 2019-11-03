import {Injectable}             from '@angular/core';
import Axios from 'axios';

@Injectable()
export class UserService  {

    constructor() {}

    async getCurrentUser() {
        if (localStorage.getItem('user')) {
            return Axios.get(`https://obscure-badlands-88487.herokuapp.com/student/profile?email=${window.atob(localStorage.getItem('user')).split(":")[0]}`)
            .then((student) => {
                return Promise.resolve(student.data)
            }).catch((e) => {
                return Axios.get(`https://obscure-badlands-88487.herokuapp.com/volunteer/profile?email=${window.atob(localStorage.getItem('user')).split(":")[0]}`)
                .then((volunteer) => {
                    return Promise.resolve(volunteer.data);
                }).catch((e) => {
                    console.warn(e)
                    return Promise.reject(e);
                });
            });
        }
    }

    async isStudent(user){
        return user.vip === undefined ? true : false;
    }
}