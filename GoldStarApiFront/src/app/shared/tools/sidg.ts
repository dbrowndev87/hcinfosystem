import { Injectable } from '@angular/core';


/**
 * Random Username and Password Generator
 *
 * I wrote this random Password and Username generator so we cna assign a username and password
 * upon student/faculty creation in the system allowing us to easier link the account to the
 * user information
 */

@Injectable()
export class StudentIdGenerator {

    constructor() {

    }

    /**
     * This is a method that generates and returns a Student ID based
     */
    generateId() {

        // Get the last two digits of the date.
        // Cut them into a seperate piece.
        let date = new Date();
        let output = date.getFullYear().toString();
        output = output.slice(2, 4);

        // How many random digits to add
        const numDigitsToGenerate = 4;

        // generate that many random numbers
        for (let i = 0; i < numDigitsToGenerate; i++) {
            const tempNum = (Math.floor(Math.random() * (9 - 0 + 1)) + 0);
            output += tempNum;
        }

        // Return the new ID
        return parseInt(output, 0);
    }
}