import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { StrategyListComponent } from './strategy-list.component';
import { StrategyService } from './strategy-list.service';
import { StrategyRoutes } from './strategy-list.routing';

@NgModule({
    imports: [
        RouterModule.forChild(StrategyRoutes),
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [StrategyListComponent],
    providers: [StrategyService]
})

export class StrategyModule { }
