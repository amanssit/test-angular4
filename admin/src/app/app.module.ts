import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {HttpService} from './services/http-service/http-service.service';
import {AuthGaurdService} from './services/auth-gaurd/auth-gaurd.service';


import {NgProgressModule} from 'ngx-progressbar';
import {BrowserXhr} from '@angular/http';
import {NgProgressBrowserXhr} from 'ngx-progressbar';

import {UserService} from './services/user/user.service';


import {GrowlModule} from 'primeng/primeng';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';


import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {SidemenuComponent} from './shared/sidemenu/sidemenu.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageHeaderComponent} from './shared/page-header/page-header.component';
import {UserComponent} from './user/user.component';
import {CalendarComponent} from './calendar/calendar.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurdService]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGaurdService]},
  {path: 'user', component: UserComponent, canActivate: [AuthGaurdService]},
  {path: '**', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    LoginComponent,
    DashboardComponent,
    PageHeaderComponent,
    UserComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    NgbDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    BrowserAnimationsModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    ChartModule,
    PanelModule,
    InputTextModule,
    DataGridModule,
    DropdownModule,
    DataTableModule, SharedModule,
    PaginatorModule,
    ScheduleModule, CalendarModule, CheckboxModule

  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: '/admin'},
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr},   //this for progressbar
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    },
    UserService, CookieService, AuthGaurdService, ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

//This is for http interceptor
export function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}
