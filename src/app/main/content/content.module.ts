import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { PlatformModule } from '@angular/cdk/platform';


@NgModule({
    declarations: [
        FuseContentComponent,
       
    ],
    imports     : [
        RouterModule,
        PlatformModule,
        FuseSharedModule,
    ],
    exports: [
        FuseContentComponent
    ]
})
export class FuseContentModule
{
}
