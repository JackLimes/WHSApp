
import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { Button } from "tns-core-modules/ui/button";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import * as dialogs from "ui/dialogs";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { HomeViewModel } from "./home-view-model";

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
    page.bindingContext = new HomeViewModel();
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

export function sqltest(args: EventData) {
    const url = "http://24.217.249.216/phpfiles/nsparseq.php";
    const request = JSON.stringify({indat: "anime club"});
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // var jsondata = JSON.parse(this.responseText);
            const lbl = new Label();
            const stack = <StackLayout>topmost().getViewById("slayout");
            lbl.textWrap = true;
            lbl.text = JSON.parse(this.responseText);
            stack.addChild(lbl);
        }
    };
    xmlhttp.send(request);
}

export function loadAnn(args: EventData) {
    const stack = <StackLayout>topmost().getViewById("slayout");
    const url = "http://24.217.249.216/phpfiles/getann.php";
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
            const count = resobj.title.length;
            let btn;
            for (let i = 0; i < count; i++) {
                btn = new Button();
                btn.text = resobj.title[i];
                btn.on(Button.tapEvent, () => {
                    dialogs.alert({
                        title: resobj.club[i],
                        message: resobj.desc[i],
                        okButtonText: "Close"
                    });
                });
                stack.addChild(btn);
            }
        }
    };
    xmlhttp.send();
}
