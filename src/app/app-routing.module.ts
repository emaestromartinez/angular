import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
      {
        path: '',
        loadChildren: () =>
          import('./pages/main-form/main-form.module').then(
            (m) => m.MainFormModule
          ),
      },
      {
        path: 'quotes',
        loadChildren: () =>
          import('./pages/quote-page/quote-page.module').then(
            (m) => m.QuotePageModule
          ),
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routesApp, { scrollPositionRestoration: 'disabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
