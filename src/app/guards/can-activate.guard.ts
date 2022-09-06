import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, Subject} from 'rxjs';
import {PopupService} from "../services/popup/popup.service";
import {HttpClient} from "@angular/common/http";
import {ListService} from "../services/list-service/list-service.service";

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
