/**
 * This is the course interface object that contains the attributes
 * which pertain to a course object.
 * 
 * Author: Darcy Brown
 * Date: Jan 24th, 2019
 */
export interface Course {
    course_Id: string;
    course_Name: string;
    dept_Id: number;
    credits: number;
}