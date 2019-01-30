/**
 * This is the course interface object that contains the attributes
 * which pertain to a course object.
 * 
 * Author: Darcy Brown
 * Date: Jan 24th, 2019
 */
export interface Section {
    course_Id: string;
    section_Id: number;
    faculty_Id: number;
    start_Date: Date;
    end_Date: Date;
    designation: string;
    semester: string;
    vacancy: number;
}