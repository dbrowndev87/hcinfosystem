/**
 * This is a mixed Interface made for displaying student names on the Enrollment
 * table easier.
 * 
 * Author: Darcy Brown
 * Date: January 30th, 2018.
 */
export interface EnrollmentInfo {
    student_Id: number;
    first_Name: string;
    last_Name: string;
    section_Id: number;
    course_Status: string;
    grade: number;
    enrollment_Id: number;
}