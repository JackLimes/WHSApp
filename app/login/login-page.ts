import { EventData } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { TextView } from "tns-core-modules/ui/text-view";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { LoginViewModel } from "./login-view-model";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/

export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    const page = <Page>args.object;
    page.bindingContext = new LoginViewModel();
}

export function authentificate(args: EventData) {
    firebase.login({
        type: firebase.LoginType.GOOGLE
      }).then(
          (result) => {
            console.log(JSON.stringify(result));
            topmost().navigate("home/home-page");
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
      );
}
