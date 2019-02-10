/**
 * Name: Student Auth Guard
 * Description: This is the auth guard file which locks out links that only Student
 * users can access.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_interfaces/student.model';

@Injectable({ providedIn: 'root' })
export class AuthGuardStudentNotEnrolled implements CanActivate {
    private student: Student;
    private errorMessage = "";
    private studentStatus;
    private id;

    private subscriptions: Subscription[] = [];

    constructor(
        private repository: RepositoryService,
        private router: Router,
        private errorHandler: ErrorHandlerService,
    ) {
        let apiAddress = "api/student/" + this.id;
        this.subscriptions.push(this.repository.getData(apiAddress)
            .subscribe(res => {
                this.student = res as Student;
                // console.log(this.student);

                this.studentStatus = this.student.student_Status;

            },
                // tslint:disable-next-line: no-unused-expression
                (error) => {
                    this.errorHandler.handleError(error);
                    this.errorMessage = this.errorHandler.errorMessage;

                }));
    }

    canActivate() {
        if (sessionStorage.getItem('isLoggedIn')) {
            const currentUser = sessionStorage.getItem('isLoggedIn');
            const typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

            if (sessionStorage.getItem('studentId')) {
                this.id = parseInt(sessionStorage.getItem('studentId'), 0);
            }

            if (typeCode === 3) {

                if (this.studentStatus === "Enrolled") {
                    // authorised so return true
                    return true;
                } else {
                    return false;
                }

            } else {
                this.router.navigate(['/404']);
                return false;
            }
        } else {

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }
    }
}