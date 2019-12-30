import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { OrganisationRoutes } from './organisation.routing';
import { OrganisationComponent } from './organisation.component';
import { OrganisationService } from './organisation.service';
import { DialogueComponent } from '../dialogue/dialogue.component';

@NgModule({
    imports: [
        RouterModule.forChild(OrganisationRoutes),
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [OrganisationComponent, DialogueComponent],
    providers: [OrganisationService]
})

export class OrganisationModule { }
