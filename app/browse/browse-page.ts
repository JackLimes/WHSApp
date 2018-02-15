import { EventData } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { BrowseViewModel } from "./browse-view-model";

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
    page.bindingContext = new BrowseViewModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function onLoad(args) {
    putClubs(args);
}

export function putClubs(args) {
    const page = <Page>args.object;
    const container = <StackLayout>page.getViewById("clubContainer");
    const url = "https://fzwestboard.000webhostapp.com/getclubs.php";
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const jsondata = JSON.parse(this.responseText);
            const length = jsondata.name.length;
            for (let i = 0; i < length; i++) {
                const stack = new StackLayout();
                const title = new Label();
                title.className = "title";
                title.textWrap = true;
                const desc = new Label();
                desc.className = "desc";
                desc.textWrap = true;
                title.text = jsondata.name[i];
                desc.text = jsondata.desc[i];
                stack.addChild(title);
                stack.addChild(desc);
                let tapped = false;
                stack.on("tap", () => {
                    if(tapped == false){
                        tapped = true;
                    }else{
                        tapped = false;
                    }

                    if(tapped){
                        stack.backgroundColor = "#48f442"; // light green
                        subscribe(jsondata.id[i]);
                    }else{
                        stack.backgroundColor = "#FFFFFF"; // white
                        unsubscribe(jsondata.id[i]);
                    }

                    
                    
                });
                const active = <ActivityIndicator>page.getViewById("activityIndicator");
                active.visibility = "collapse";
                container.addChild(stack);
            }
        }
    };
    xmlhttp.send();
}

export function subscribe(clubid) { // unfinished
    firebase.getCurrentUser().then((user) => {
        const request = JSON.stringify({uid: user.uid, clubid: clubid});
        console.log(request);
        const url = "https://fzwestboard.000webhostapp.com/subscribe.php";
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const resobj = JSON.parse(this.responseText);
        }
    };
        xmlhttp.send(request);
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}

export function unsubscribe(clubid) { // unfinished
    firebase.getCurrentUser().then((user) => {
        const request = JSON.stringify({uid: user.uid, clubid: clubid});
        console.log(request);
        const url = "https://fzwestboard.000webhostapp.com/unsubscribe.php";
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const resobj = JSON.parse(this.responseText);
        }
    };
        xmlhttp.send(request);
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}

