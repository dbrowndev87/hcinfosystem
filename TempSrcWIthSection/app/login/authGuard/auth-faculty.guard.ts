/**
 * Name: Faculty Auth Guard
 * Description: This is the auth guard file which locks out links that only faculty
 * users can access.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Globals } from 'src/app/globals';

@Injectable({ providedIn: 'root' })
export class AuthGuardFaculty implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('isLoggedIn')) {
            const currentUser = sessionStorage.getItem('isLoggedIn');
            const typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

            if (currentUser && (typeCode === 2)) {
                // authorised so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}