
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
    constructor() { }
    public showLoader = new Subject<boolean>();

}