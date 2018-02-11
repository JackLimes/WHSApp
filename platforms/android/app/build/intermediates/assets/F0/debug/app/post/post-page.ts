import { Component } from "@angular/core";
import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { Observable } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { topmost } from "ui/frame";
import { ListPicker } from "ui/list-picker";
import { NavigatedData, Page } from "ui/page";

import { PostViewModel } from "./post-view-model";

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
    page.bindingContext = new PostViewModel();
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

export function postAnn() {
    const url = "http://24.217.249.216/phpfiles/postann.php";
    const xmlhttp = new XMLHttpRequest();

    const title = <TextField>topmost().getViewById("title");
    const desc = <TextView>topmost().getViewById("desc");
    const btn = <Button>topmost().getViewById("butt");
    const stack = <StackLayout>topmost().getViewById("mainStack");
    const datePicker = <DatePicker>topmost().getViewById("date");
    const fDate = datePicker.year + "-" + datePicker.month + "-" + datePicker.day;
    const lPicker = <ListPicker>topmost().getViewById("listPicker");
    const hexColor = colorarr[lPicker.selectedIndex];

    // Create object to pass to php
    // tslint:disable-next-line:max-line-length
    const request = JSON.stringify({title: title.text, club: clubarr[lPicker.selectedIndex], description: desc.text, birth: fDate, color: hexColor});

    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const jsondata = JSON.parse(this.responseText);
            title.text = "";
            desc.text = "";
            alert(jsondata);
        }
    };
    xmlhttp.send(request);
}

export function onNavigatedTo() {
    // set date picker settings.
    const datePicker = <DatePicker>topmost().getViewById("date");
    const today = new Date();
    datePicker.date = today;
    datePicker.minDate = today;
    getClubs();
}

// club name and color array intialize
let clubarr;
let colorarr;
export function getClubs() {
    const url = "http://24.217.249.216/phpfiles/getclubs.php";
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
            clubarr = jsondata.name;
            colorarr = jsondata.color;
            const lPicker = <ListPicker>topmost().getViewById("listPicker");
            lPicker.items = clubarr;
        }
    };
    xmlhttp.send();
}
