import { Injectable } from '@angular/core';

import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { RepositoryService } from '../services/repository.service';


/**
 * Random Username and Password Generator
 *
 * I wrote this random Password and Username generator so we cna assign a username and password
 * upon student/faculty creation in the system allowing us to easier link the account to the
 * user information
 * 
 * Author: Darcy Brown
 * Date: January 25th, 2019
 */

@Injectable()
export class RandomUserPassGen {

    private unique = false;

    constructor(private repository: RepositoryService) {

    }

    /**
     * This function generates a username based on uniqueness and length.
     * @param: usersLogins
     * @param: firstname
     * @param: lastname
     */
    generateUser(firstname: string, lastname) {

        this.unique = false;
        let tempUsername = '';

        // get the first letter of the firstname and concatinate it
        // to the last name
        const firstLetter = firstname.charAt(0);
        tempUsername = (firstLetter + lastname);


        // If the username is less than 8 characters use this method.
        if (tempUsername.length < 8) {
            let numToGenerate;


            numToGenerate = (8 - tempUsername.length) + 2;

            // generate that many random numbers
            for (let i = 0; i < numToGenerate; i++) {
                const tempNum = (Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                tempUsername += tempNum.toString();
            }


        } else {

            const numToGenerate = 4;

            // slice the last 3 off
            tempUsername = tempUsername.slice(0, ((tempUsername.length + 6) - tempUsername.length));

            // generate that many random numbers
            for (let i = 0; i < numToGenerate; i++) {
                const tempNum = (Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                tempUsername += tempNum.toString();
            }
        }

        return tempUsername;
    }



    /**
     * This Funciton checks to see if the username is unique.
     * 
     * @param: usersLogins
     * @param: username
     */
    uniqueCheck(username: string) {
        // Get user Login Stuff
        let apiUrlUserLogin = 'api/userLogin/username/' + username;
        this.repository.getData(apiUrlUserLogin)
            .subscribe((res: any) => {
                if (res === "") {
                    return true;
                }
            });
        return true;
    }

    /**
     * Simple random 8 character password generator
     */
    generatePass() {
        // Generate random 8 digit password
        return Math.random().toString(36).slice(-10);
    }

}