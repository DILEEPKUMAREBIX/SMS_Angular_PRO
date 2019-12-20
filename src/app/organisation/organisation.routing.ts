import { Routes } from '@angular/router';

import { OrganisationComponent } from './organisation.component';

export const OrganisationRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: OrganisationComponent
    }]
}
];
