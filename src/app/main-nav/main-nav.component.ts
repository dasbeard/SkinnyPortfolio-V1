import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isLoggedIn;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public check: AuthService
  ) {
    // this.isLoggedIn = auth.isLoggedIn;
    // console.log(this.isLoggedIn);
  }

  // signOut() {
  //   console.log(this.isLoggedIn);
  //   this.auth.signOut();
  //   console.log(this.isLoggedIn);
  // }
}
