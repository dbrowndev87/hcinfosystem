/**
 * This is the Enrollment interface object that contains the attributes
 * which pertain to a enrollment object.
 * 
 * Author: Darcy Brown
 * Date: Jan 30th, 2019
 */
export interface Enrollment {
    enrollment_Id: number;
    student_Id: number;
    section_Id: number;
    course_Status: string;
    grade: number;
}