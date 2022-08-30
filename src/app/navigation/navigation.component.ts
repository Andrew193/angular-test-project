import {Component, OnInit} from '@angular/core';
import {routes} from "../app-routing.module";
import {Router, Routes} from "@angular/router";

const getStartEnd = (str: string, sub: string) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1]

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  NavigationRoutes: Routes = [];

  constructor(public router: Router) {
  }

  isLinkActive(exact: boolean, src: string): boolean {
    const srcToCheck = src === "" ? "/" : `/${src}`;
    const routerSrc = this.router.url;

    if (routerSrc === "/" && srcToCheck === "/") {
      //basic root path ( / - Highlight it all the time )
      return true;
    } else if (routerSrc === "/" || srcToCheck === "/") {
      //Root paths ( Only if clicked )
      return false;
    } else {
      if (routerSrc === srcToCheck) {
        return true;
      }
      //Children paths ( Highlight the parent )
      const [start, end] = getStartEnd(routerSrc, srcToCheck);
      return routerSrc[end + 1] === "/" && !start ? routerSrc.includes(srcToCheck) : false
    }
  }

  isExactPath(path: string): boolean {
    return !!{
      "": true,
    }[path]
  }

  ngOnInit(): void {
    this.NavigationRoutes = routes.slice(0, routes?.length - 1)
  }

}
