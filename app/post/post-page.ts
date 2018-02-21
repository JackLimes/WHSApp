import { Component } from "@angular/core";
import { EventData } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
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

const http = require("http");

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
    const url = "https://fzwestboard.000webhostapp.com/postann.php";
    const xmlhttp = new XMLHttpRequest();

    const title = <TextField>topmost().getViewById("title");
    const desc = <TextView>topmost().getViewById("desc");
    const btn = <Button>topmost().getViewById("butt");
    const stack = <StackLayout>topmost().getViewById("mainStack");
    const datePicker = <DatePicker>topmost().getViewById("date");
    const fDate = datePicker.year + "-" + datePicker.month + "-" + datePicker.day;
    const lPicker = <ListPicker>topmost().getViewById("listPicker");
    const hexColor = colorarr[lPicker.selectedIndex];
    if (title.text === "" || desc.text === "") {
        alert("You do not have both Field filled out.");

        return;
    }

    if (lPicker.items.length === 0) {
        alert("You do not have access to any clubs to post from");

        return;
    }

    // Create object to pass to php
    // tslint:disable-next-line:max-line-length
    const request = JSON.stringify({title: title.text, club: clubarr[lPicker.selectedIndex], description: desc.text, birth: fDate, color: hexColor, clubid: clubidarr[lPicker.selectedIndex]});

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

export function onLoad(args) {
    const page = <Page>args.object;
    // set date picker settings.
    const datePicker = <DatePicker>page.getViewById("date");
    const today = new Date();
    datePicker.date = today;
    datePicker.minDate = today;
    getClubs(args);
    const lPicker = <ListPicker>page.getViewById("listPicker");
    console.log(lPicker.selectedIndex);
}

// club name and color array intialize
let clubarr;
let colorarr;
let clubidarr;
export function getClubs(args) {
    const page = <Page>args.object;
    firebase.getCurrentUser().then((user) => {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getadminclubs.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then((result) => {
            const jsondata = JSON.parse(result.content);
            clubarr = jsondata.name;
            colorarr = jsondata.color;
            clubidarr = jsondata.id;
            const lPicker = <ListPicker>page.getViewById("listPicker");
            lPicker.items = clubarr;
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }, (error) => {
        alert("FB ERROR: " + error);
    });
}
