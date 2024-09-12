import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loaderSubject = new BehaviorSubject<boolean>(false);

    show() {
        this.loaderSubject.next(true);
    }

    hide() {
        this.loaderSubject.next(false);
    }
}