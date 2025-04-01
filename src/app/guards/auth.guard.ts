import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

const loggedInUser = {
  id: '1zx-casd123-asdzxc132',
  name: 'Lakindu Hewawasam',
  role: 'customer',
};
@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  // inject the router service to allow navigation.
  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { role } = loggedInUser;

    // provides the route configuration options.
    const { routeConfig } = route;

    // provides the path of the route.
    const { path } = routeConfig as Route;

    if (
      (path?.includes('guest') || path?.includes('home')) &&
      (role === 'customer' || role === 'administrator')
    ) {
      // if a logged in user goes to Guest or Home, navigate to their respective dashboard.
      this._router.navigateByUrl(role === 'customer' ? '/customer' : '/admin');
      return false;
    }

    // for any other condition, navigate to the forbidden route.
    this._router.navigateByUrl('/forbidden');
    return false;
  }
}
