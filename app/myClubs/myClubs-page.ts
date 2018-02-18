import { EventData } from "data/observable";
import observableModule = require("data/observable");
import firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import * as colorModule from "tns-core-modules/color";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { Button } from "tns-core-modules/ui/button/button";
import { Label } from "tns-core-modules/ui/label";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { topmost } from "ui/frame";
import { getViewById, NavigatedData, Page } from "ui/page";
import { MyClubsViewModel } from "./myClubs-view-model";

const Color = colorModule.Color;
const gray = new Color("#c6c6c6");
const http = require("http");
const gestures = require("ui/gestures");

/* tslint:disable:prefer-conditional-expression jsdoc-format max-line-length*/

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
    page.bindingContext = new MyClubsViewModel();
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
    let length;
    let titles;
    let descs;
    let ids;
    let sublist;
    // let sublist;
    firebase.getCurrentUser().then((user) => {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getmyclubs.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then((result) => { // initialize first
            console.log(result.content);
            const resobj = JSON.parse(result.content);
            length = resobj.name.length;
            titles = resobj.name;
            descs = resobj.desc;
            ids = resobj.id;
            console.log("subcheck list: " + resobj);
            let lastStack;
            for (let i = 0; i < length; i++) {
                const stack = new StackLayout();
                stack.borderBottomWidth = 2;
                stack.borderBottomColor = gray;

                const title = new Label();
                title.className = "title";
                title.textWrap = true;
                title.col = 1;
                title.text = titles[i];

                const desc = new Label();
                desc.className = "desc";
                desc.textWrap = true;
                desc.text = descs[i];

                const subbutton = new Button();
                subbutton.width = 200;
                subbutton.horizontalAlignment = "right";
                subbutton.borderRadius = 15;
                subbutton.borderWidth = 4;
                subbutton.marginRight = 15;
                subbutton.text = "Subscribe";
                // desc.text = descs[i];

                subbutton.on("tap", () => {
                    console.log("tapped");
                    http.request({
                        url: "https://fzwestboard.000webhostapp.com/subscribe.php",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({ uid: user.uid, clubid: ids[i] })
                    }).then((tapresult) => {
                        console.log(JSON.stringify(tapresult));
                        sublist = JSON.parse(tapresult.content);
                        console.log("id: " + ids[i]);
                        console.log("Sublist: " + sublist);
                        console.log("boolean: " + sublist.includes(ids[i]));
                        container.removeChild(stack);
                    }, (error) => {
                        console.error(JSON.stringify(error));
                    });
                });

                stack.addChild(title);
                stack.addChild(subbutton);
                const spacer = new Label();
                spacer.height = 10;
                stack.addChild(spacer);

                subbutton.borderColor = "#000000";
                subbutton.backgroundColor = "#FF0000"; // white
                subbutton.text = "Unsubscribe";

                const active = <ActivityIndicator>page.getViewById("activityIndicator");
                active.visibility = "collapse";
                container.addChild(stack);
                lastStack = stack;
            }
            lastStack.borderBottomWidth = 0;
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}
