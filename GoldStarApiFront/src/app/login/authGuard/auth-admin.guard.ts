import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Globals } from 'src/app/globals';

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private router: Router,
        private globals: Globals
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('isLoggedIn')) {
            const currentUser = sessionStorage.getItem('isLoggedIn');
            const typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

            if (currentUser && typeCode === 1) {
                // authorised so return true
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}