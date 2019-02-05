import { Injectable } from '@angular/core';


/**
 * Random Report id Generator
 * Generates a 10 digit ID for Transactions.
 * 
 * Author: Darcy Brown
 * Date: January 25th, 2019
 */

@Injectable()
export class ReportIdGenerator {

    constructor() {

    }

    /**
     * This is a method that generates and returns a Student ID based
     */
    generateId(prefix: string) {

        // Get the last two digits of the date.
        // Cut them into a seperate piece.
        let date = new Date();
        let output = prefix + "";

        // How many random digits to add
        const numDigitsToGenerate = 8;

        // generate that many random numbers
        for (let i = 0; i < numDigitsToGenerate; i++) {
            const tempNum = (Math.floor(Math.random() * (9 - 0 + 1)) + 0);
            output += tempNum;
        }

        // Return the new ID
        return output;
    }
}