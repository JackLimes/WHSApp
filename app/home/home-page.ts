import { EventData } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { Button } from "tns-core-modules/ui/button";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as dialogs from "ui/dialogs";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { HomeViewModel } from "./home-view-model";
const http = require("http");
/* tslint:disable:max-line-length jsdoc-format*/

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    const page = <Page>args.object;
    if (args.isBackNavigation) {
        const ind = <ActivityIndicator>page.getViewById("activityIndicator");
        ind.visibility = "visible";
        loadAnn(args);

        return;
    }

    page.bindingContext = new HomeViewModel();

    console.log("Navigating");
}

export function onNavigatedTo(args: NavigatedData) {
    console.log("Navigated");
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

export function datass(args: EventData) {
    const stack = <StackLayout>topmost().getViewById("slayout");
    const btn = new Button();
    btn.on(Button.tapEvent, doubledildo);
    btn.text = "ohai";
    stack.addChild(btn);
}

export function doubledildo(args: EventData) {
    const stack = <StackLayout>topmost().getViewById("slayout");
    const d = new Date();
    for (let i = 0; i < 7; i++) {
        const lbl = new Label();
        lbl.className = "date";
        lbl.text = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        d.setDate(d.getDate() + 1);
        stack.addChild(lbl);
    }
}
// { "Content-Type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Request-Headers": "X-Requested-With, accept, content-type" }
export function loadAnn(args) {
    firebase.getCurrentUser().then((user) => {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getann.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then((result) => {
            const page = <Page>args.object;
            const stack = <StackLayout>page.getViewById("slayout");
            stack.removeChildren();
            const resobj = JSON.parse(result.content);
            const activityIndicator = <ActivityIndicator>page.getViewById("activityIndicator");
            activityIndicator.visibility = "collapse";
            const count = resobj.title.length; // # of items in the array, not the # of characters in the title
            let btn;
            let lbl;
            let onDate;
            for (let i = 0; i < count; i++) {
                if (resobj.birth[i] !== onDate) {
                    onDate = resobj.birth[i];
                    lbl = new Label();
                    lbl.class = "date";
                    lbl.text = resobj.birth[i];
                    stack.addChild(lbl);
                }
                btn = new Button();
                btn.text = "[" + resobj.club[i] + "] " + resobj.title[i];
                btn.backgroundColor = resobj.color[i];
                btn.on(Button.tapEvent, () => {
                    dialogs.alert({
                        title: resobj.club[i],
                        message: resobj.desc[i],
                        okButtonText: "Close"
                    });
                });
                stack.addChild(btn);
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}

export function onLoaded(args) {
    loadAnn(args);
    console.log("loading announcments");
}

export function refresh(args) {
return;
}
