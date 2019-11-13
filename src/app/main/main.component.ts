import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewEncapsulation, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs/Subscription';

import { FuseConfigService } from '@fuse/services/config.service';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { Router } from '@angular/router';

@Component({
    selector: 'fuse-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseMainComponent implements OnDestroy, OnInit {

    onConfigChanged: Subscription;
    showLoadernow: boolean;
    fuseSettings: any;
    @HostBinding('attr.fuse-layout-mode') layoutMode;
    empresariasmenu = [
        { description: 'Crear empresaria', value: 'registroempresariaec' },
        { description: 'Mis empresarias', value: 'misempresarias' },
        { description: 'Prospectos', value: 'misprospectos' },
        { description: 'Inactivas', value: 'misinactivas' },
        { description: 'Activas', value: 'misactivas' },
        { description: 'Posibles egresos', value: 'misposiblesegresos' },
    ];
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private fuseConfig: FuseConfigService,
        private platform: Platform,
        private communicationService: CommunicationService,
        private router: Router,
        @Inject(DOCUMENT) private document: any
    ) {
        // this.communicationService.showLoader.subscribe(x => this.showLoadernow = x);
        this.onConfigChanged =
            this.fuseConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        this.layoutMode = this.fuseSettings.layout.mode;
                    }
                );

        if (this.platform.ANDROID || this.platform.IOS) {
            this.document.body.className += ' is-mobile';
        }

    }
    ngOnInit(): void {
        this.communicationService.showLoader.subscribe((x) => {
            setTimeout(() => {
                this.showLoadernow = x
            }, 100);
        });
    }
    ngOnDestroy() {
        this.onConfigChanged.unsubscribe();
    }

    addClass(className: string) {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string) {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    empresariasNavigate(url) {
        this.router.navigate(['/' + url]);
    }
}
