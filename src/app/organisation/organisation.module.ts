import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganisationRoutes } from './organisation.routing';
import { OrganisationComponent } from './organisation.component';
import { OrganisationService } from './organisation.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { LoginService } from '../login/login.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        RouterModule.forChild(OrganisationRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    declarations: [OrganisationComponent, DialogueComponent],
    providers: [OrganisationService]
})

export class OrganisationModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }