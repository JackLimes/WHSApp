import { EventData } from "data/observable";
import observableModule = require("data/observable");
import firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { BrowseViewModel } from "./browse-view-model";
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
    let length;
    let titles;
    let descs;
    let ids;
    let sublist;
    // let sublist;
    firebase.getCurrentUser().then((user) => {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getclubs.php",
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

            http.request({
                url: "https://fzwestboard.000webhostapp.com/subcheck.php",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ uid: user.uid })
            }).then((subresult) => { // initialize first
                const subresobj = JSON.parse(subresult.content);
                console.log("subcheck list: " + subresobj);
                sublist = subresobj;
                for (let i = 0; i < length; i++) {
                    const stack = new StackLayout();
                    const title = new Label();
                    title.className = "title";
                    title.textWrap = true;
                    const desc = new Label();
                    desc.className = "desc";
                    desc.textWrap = true;
                    title.text = titles[i];
                    //desc.text = descs[i]; 
                    stack.on("tap", () => {
                        stack.backgroundColor = "#48f442";
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
                            if (sublist.includes(ids[i])) { // set the color
                                console.log(ids[i]);
                                stack.backgroundColor = "#48f442"; // light green
                            } else {
                                console.log(ids[i]);
                                stack.backgroundColor = "#FFFFFF"; // white
                            }
                        }, (error) => {
                            console.error(JSON.stringify(error));
                        });
                    });
                    stack.addChild(title);
                    stack.addChild(desc);
                    if (sublist.includes(ids[i])) { // set the color
                        stack.backgroundColor = "#48f442"; // light green
                    } else {
                        stack.backgroundColor = "#FFFFFF"; // white
                    }

                    const active = <ActivityIndicator>page.getViewById("activityIndicator");
                    active.visibility = "collapse";
                    container.addChild(stack);
                }
            }, (error) => {
                console.error(JSON.stringify(error));
            });

        }, (error) => {
            console.error(JSON.stringify(error));
        });

    }, (error) => {
        alert("FB ERROR: " + error);
    });
}

export function subscribe(clubidin) { // unfinished
    firebase.getCurrentUser().then((user) => {
        const request = JSON.stringify({uid: user.uid, clubid: clubidin});
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
                console.log(JSON.parse(this.responseText));
        }
    };
        xmlhttp.send(request);
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}
