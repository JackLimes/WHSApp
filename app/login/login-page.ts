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
            register();
            topmost().navigate("home/home-page");
            console.log("User ID: " + result.uid);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
      );
}

export function register() {
    // This runs everytime. It won't reregister on server side.
    const url = "https://fzwestboard.000webhostapp.com/register.php";
    const xmlhttp = new XMLHttpRequest();

    firebase.getCurrentUser().then((user) => {
        const request = JSON.stringify({uid: user.uid, email: user.email});

        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const jsondata = JSON.parse(this.responseText);
                console.log(jsondata);
            }
        };
        xmlhttp.send(request);

    }, (error) => {
        alert("FB ERROR: " + error);
    });
}
