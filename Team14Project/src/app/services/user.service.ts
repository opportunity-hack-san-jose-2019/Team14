import {Injectable}             from '@angular/core';
import Axios from 'axios';

@Injectable()
export class UserService  {

    constructor() {}

    async getCurrentUser() {
        if (localStorage.getItem('user')) {
            return Axios.get(`https://obscure-badlands-88487.herokuapp.com/student/profile?email=${window.atob(localStorage.getItem('user')).split(":")[0]}`)
            .then((student) => {
                return student.data
            }).catch((e) => {
                Axios.get(`https://obscure-badlands-88487.herokuapp.com/volunteer/profile?email=${window.atob(localStorage.getItem('user')).split(":")[0]}`)
                .then((volunteer) => {
                    return volunteer.data
                }).catch((e) => {
                    console.log(e)
                    return undefined;
                });
            });
        }
    }
}