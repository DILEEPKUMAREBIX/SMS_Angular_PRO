import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { OrganisationRoutes } from './organisation.routing';
import { OrganisationComponent } from './organisation.component';
import { OrganisationService } from './organisation.service';

@NgModule({
    imports: [
        RouterModule.forChild(OrganisationRoutes),
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [OrganisationComponent],
    providers: [OrganisationService]
})

export class OrganisationModule { }
