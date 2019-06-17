import { Component, NgZone } from "@angular/core";
import { android as appAndroid, on as appOn, resumeEvent, suspendEvent, ApplicationEventData } from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(
        private zone: NgZone,
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute,
    ) {
        this.navigateInBackground();
    }
    private navigateInBackground() {
        appOn(suspendEvent, (eventData: ApplicationEventData) => {
            console.log("FIRST PASS");
          setTimeout(() => {
            this.zone.run(() => {
                console.log("RUNNIN");
                this.routerExtensions.navigate(["item/", "1"], { clearHistory: true, animated: true, transition: undefined })
                 .then(success => {
                   console.log("AppComponent.navigateInBackground" + " " + (success ? "true" : "false"));
                 })
                 .catch(error => {
                   throw error;
                 });
               });
          }, 2000);
        });
      }
 }
