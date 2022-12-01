import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

const routes: Routes = [];

export interface IRouteData {
  breadcrumb?: string;
}

export interface CustomRoute extends Route {
  data?: IRouteData;
}

export const routesApp: CustomRoute[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./pages/home/home.module').then((m) => m.HomeModule),
      // },
      // { path: '**', component: NotFoundComponent },
    ],
  },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routesApp, { scrollPositionRestoration: 'disabled' }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
