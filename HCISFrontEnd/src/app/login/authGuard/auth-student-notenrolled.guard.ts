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
    private id;

    private subscriptions: Subscription[] = [];

    constructor(
        private repository: RepositoryService,
        private router: Router,
        private errorHandler: ErrorHandlerService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('isLoggedIn')) {
            const currentUser = sessionStorage.getItem('isLoggedIn');
            const typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

            if (sessionStorage.getItem('studentId')) {
                this.id = parseInt(sessionStorage.getItem('studentId'), 0);
            }

            if (currentUser && (typeCode === 3)) {

                let apiAddress = "api/student/" + this.id;
                this.subscriptions.push(this.repository.getData(apiAddress)
                    .subscribe(res => {
                        this.student = res as Student;
                        // console.log(this.student);
                    },
                        // tslint:disable-next-line: no-unused-expression
                        (error) => {
                            this.errorHandler.handleError(error);
                            this.errorMessage = this.errorHandler.errorMessage;

                        }).add(() => {

                            if (this.student.student_Status === "Enrolled") {
                                // authorised so return true
                                return true;
                            } else {
                                return false;
                            }
                        }));

            } else {
                this.router.navigate(['/404'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}