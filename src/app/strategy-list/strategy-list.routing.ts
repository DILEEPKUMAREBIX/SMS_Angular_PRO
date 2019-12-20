import { Routes } from '@angular/router';

import { StrategyListComponent } from './strategy-list.component';

export const StrategyRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: StrategyListComponent
    }]
}
];
