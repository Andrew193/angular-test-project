import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PopupService} from "../services/popup/popup.service";
@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard implements CanActivate {
  constructor(private popup: PopupService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.popup.showModal("Do you want to see this page?")
  }
}
