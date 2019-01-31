import { NgZone, Injectable } from '@angular/core';

@Injectable()
export class Globals {
    constructor(
        private zone: NgZone) {
    }

    public reloadPage() { // click handler or similar

        this.zone.runOutsideAngular(() => {
            location.reload();
        });
    }
}