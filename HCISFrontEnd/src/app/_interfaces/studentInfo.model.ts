/**
 * This is the Student Info interface object that contains the attributes
 * which pertain to a Student Info object.
 * 
 * Author: Darcy Brown
 * Date: Jan 25th, 2019
 */
export interface StudentInfo {
    student_Id: number;
    student_Status: string;
    gpa: number;
    amount_Owing: number;
    first_Name: string;
    last_Name: string;
    address: string;
    birth_Date: Date;
    eMail: string;
    type_Code: number;
    user_Id: number;
    dept_Id: number;
}