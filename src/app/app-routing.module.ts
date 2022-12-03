import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { SecondPageModule } from './pages/second-page/second-page.module';
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
        path: 'second-page',
        loadChildren: () =>
          import('./pages/second-page/second-page.module').then(
            (m) => m.SecondPageModule
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
