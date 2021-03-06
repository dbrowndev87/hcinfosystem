/**
 * This is the User interface object that contains the attributes
 * which pertain to a User object.
 * 
 * Author: Darcy Brown
 * Date: Jan 24th, 2019
 */
export interface User {
    first_Name: string;
    last_Name: string;
    address: string;
    birth_Date: Date;
    eMail: string;
    type_Code: number;
    user_Id: number;
    dept_Id: number;
}