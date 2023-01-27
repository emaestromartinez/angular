import { MainComponent } from './pages/main/main.component';
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
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'star-wars',
        loadChildren: () =>
          import('./pages/star-wars/star-wars-page.module').then(
            (m) => m.StarWarsPageModule
          ),
      },
      {
        path: 'pokemon',
        loadChildren: () =>
          import('./pages/pokemon/pokemon-page.module').then(
            (m) => m.PokemonPageModule
          ),
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./pages/example-form/example-form.module').then(
            (m) => m.ExampleFormModule
          ),
      },
      {
        path: 'quotes',
        loadChildren: () =>
          import('./pages/quote-page/quote-page.module').then(
            (m) => m.QuotePageModule
          ),
      },
      {
        path: 'routes',
        loadChildren: () =>
          import('./pages/routes-page/routes-page.module').then(
            (m) => m.RoutesPageModule
          ),
      },
      {
        path: 'forbidden',
        loadChildren: () =>
          import('./pages/forbidden-page/forbidden-page.module').then(
            (m) => m.ForbiddenPageModule
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
