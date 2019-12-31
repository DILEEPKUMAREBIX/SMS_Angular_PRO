import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { LoginService } from '../login/login.service';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;

    ROUTES: any = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    }, {
        path: '/organisation',
        title: this.translate.instant('sms.menu_organisations'),
        type: 'link',
        icontype: 'widgets'
    }, {
        path: '/strategy',
        title: this.translate.instant('sms.menu_strategies'),
        type: 'link',
        icontype: 'widgets'
    }
    ];

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    constructor(public loginService: LoginService, private translate: TranslateService) {

    }

    ngOnInit() {
        console.log(this.translate.instant('sms.menu_organisations'));
        this.menuItems = this.ROUTES.filter(menuItem => menuItem);
        // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        //     const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        //     this.ps = new PerfectScrollbar(elemSidebar);
        // }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
