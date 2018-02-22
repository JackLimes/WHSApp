"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var button_1 = require("tns-core-modules/ui/button");
var label_1 = require("tns-core-modules/ui/label");
var dialogs = require("ui/dialogs");
var frame_1 = require("ui/frame");
var home_view_model_1 = require("./home-view-model");
var http = require("http");
var appSettings = require("application-settings");
/* tslint:disable:max-line-length jsdoc-format no-bitwise*/
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    var page = args.object;
    if (args.isBackNavigation) {
        var ind = page.getViewById("activityIndicator");
        ind.visibility = "visible";
        loadAnn(args);
        return;
    }
    page.bindingContext = new home_view_model_1.HomeViewModel();
    console.log("Navigating");
}
exports.onNavigatingTo = onNavigatingTo;
function onNavigatedTo(args) {
    console.log("Navigated");
}
exports.onNavigatedTo = onNavigatedTo;
/* tslint:disable:prefer-conditional-expression */
/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function datass(args) {
    var stack = frame_1.topmost().getViewById("slayout");
    var btn = new button_1.Button();
    btn.on(button_1.Button.tapEvent, doubledildo);
    btn.text = "ohai";
    stack.addChild(btn);
}
exports.datass = datass;
function doubledildo(args) {
    var stack = frame_1.topmost().getViewById("slayout");
    var d = new Date();
    for (var i = 0; i < 7; i++) {
        var lbl = new label_1.Label();
        lbl.className = "date";
        lbl.text = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        d.setDate(d.getDate() + 1);
        stack.addChild(lbl);
    }
}
exports.doubledildo = doubledildo;
// { "Content-Type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Request-Headers": "X-Requested-With, accept, content-type" }
function loadAnn(args) {
    firebase.getCurrentUser().then(function (user) {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getann.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then(function (result) {
            var page = args.object;
            var stack = page.getViewById("slayout");
            stack.removeChildren();
            var resobj = JSON.parse(result.content);
            var activityIndicator = page.getViewById("activityIndicator");
            activityIndicator.visibility = "collapse";
            var count = resobj.title.length; // # of items in the array, not the # of characters in the title
            var btn;
            var lbl;
            var onDate;
            if (count === 0) {
                var lbl1 = new label_1.Label();
                var lbl2 = new label_1.Label();
                lbl1.text = "There are no announcements for you! Try subscribing to some clubs by going to 'browse clubs' in the sidebar!";
                lbl1.textWrap = true;
                lbl2.text = "<------";
                stack.addChild(lbl1);
                stack.addChild(lbl2);
            }
            var _loop_1 = function (i) {
                if (resobj.birth[i] !== onDate) {
                    onDate = resobj.birth[i];
                    lbl = new label_1.Label();
                    lbl.class = "date";
                    lbl.text = resobj.birth[i];
                    stack.addChild(lbl);
                }
                btn = new button_1.Button();
                btn.text = "[" + resobj.club[i] + "] " + resobj.title[i];
                if (appSettings.getBoolean("colorblind")) {
                    btn.backgroundColor = "#e9e9e9";
                }
                else {
                    btn.backgroundColor = getTintedColor(resobj.color[i], 120);
                }
                btn.on(button_1.Button.tapEvent, function () {
                    dialogs.alert({
                        title: resobj.club[i],
                        message: resobj.desc[i],
                        okButtonText: "Close"
                    });
                });
                stack.addChild(btn);
            };
            for (var i = 0; i < count; i++) {
                _loop_1(i);
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.loadAnn = loadAnn;
function onLoaded(args) {
    loadAnn(args);
    console.log("loading announcments");
}
exports.onLoaded = onLoaded;
// credits: richard maloney 2006, edited by Will Fleetwood 2018 for nativescript. must disable no-bitwise for tslint
function getTintedColor(color, v) {
    if (color.length > 6) {
        color = color.substring(1, color.length);
    }
    var rgb = parseInt(color, 16);
    var r = Math.abs(((rgb >> 16) & 0xFF) + v);
    if (r > 255) {
        r = r - (r - 255);
    }
    var g = Math.abs(((rgb >> 8) & 0xFF) + v);
    if (g > 255) {
        g = g - (g - 255);
    }
    var b = Math.abs((rgb & 0xFF) + v);
    if (b > 255) {
        b = b - (b - 255);
    }
    var newr = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
    if (newr.valueOf() <= 9) {
        newr = "0" + newr;
    }
    var newg = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
    if (newg.valueOf() <= 9) {
        newg = "0" + g;
    }
    var newb = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
    if (b.valueOf() <= 9) {
        newb = "0" + b;
    }
    return "#" + newr + newg + newb;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRzFELHFEQUFvRDtBQUNwRCxtREFBa0Q7QUFFbEQsb0NBQXNDO0FBQ3RDLGtDQUFtQztBQUVuQyxxREFBa0Q7QUFDbEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRXBELDJEQUEyRDtBQUUzRDs7OERBRThEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQU0sR0FBRyxHQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckUsR0FBRyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwrQkFBYSxFQUFFLENBQUM7SUFFMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBbEJELHdDQWtCQztBQUVELHVCQUE4QixJQUFtQjtJQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCxzQ0FFQztBQUNELGtEQUFrRDtBQUNsRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFB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aEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUMvRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzdFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBRXRFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFBQyxDQUFDO0lBQzlDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzNDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBRXpDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBIb21lVmlld01vZGVsIH0gZnJvbSBcIi4vaG9tZS12aWV3LW1vZGVsXCI7XHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGgganNkb2MtZm9ybWF0IG5vLWJpdHdpc2UqL1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICBjb25zdCBpbmQgPSA8QWN0aXZpdHlJbmRpY2F0b3I+cGFnZS5nZXRWaWV3QnlJZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpO1xyXG4gICAgICAgIGluZC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgbG9hZEFubihhcmdzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSG9tZVZpZXdNb2RlbCgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZ1wiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVkVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0ZWRcIik7XHJcbn1cclxuLyogdHNsaW50OmRpc2FibGU6cHJlZmVyLWNvbmRpdGlvbmFsLWV4cHJlc3Npb24gKi9cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YXNzKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcclxuICAgIGNvbnN0IGJ0biA9IG5ldyBCdXR0b24oKTtcclxuICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsIGRvdWJsZWRpbGRvKTtcclxuICAgIGJ0bi50ZXh0ID0gXCJvaGFpXCI7XHJcbiAgICBzdGFjay5hZGRDaGlsZChidG4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlZGlsZG8oYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgIGxibC5jbGFzc05hbWUgPSBcImRhdGVcIjtcclxuICAgICAgICBsYmwudGV4dCA9IChkLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZC5nZXREYXRlKCkgKyBcIi9cIiArIGQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwpO1xyXG4gICAgfVxyXG59XHJcbi8vIHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIsIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIjogXCJHRVQsIFBPU1QsIE9QVElPTlNcIiwgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCI6IFwiQ29udGVudC1UeXBlXCIsIFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCI6IFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIiB9XHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkQW5uKGFyZ3MpIHtcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGh0dHAucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL2dldGFubi5waHBcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgICAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD5wYWdlLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcclxuICAgICAgICAgICAgc3RhY2sucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2JqID0gSlNPTi5wYXJzZShyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2aXR5SW5kaWNhdG9yID0gPEFjdGl2aXR5SW5kaWNhdG9yPnBhZ2UuZ2V0Vmlld0J5SWQoXCJhY3Rpdml0eUluZGljYXRvclwiKTtcclxuICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgY29uc3QgY291bnQgPSByZXNvYmoudGl0bGUubGVuZ3RoOyAvLyAjIG9mIGl0ZW1zIGluIHRoZSBhcnJheSwgbm90IHRoZSAjIG9mIGNoYXJhY3RlcnMgaW4gdGhlIHRpdGxlXHJcbiAgICAgICAgICAgIGxldCBidG47XHJcbiAgICAgICAgICAgIGxldCBsYmw7XHJcbiAgICAgICAgICAgIGxldCBvbkRhdGU7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGJsMSA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGJsMiA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgbGJsMS50ZXh0ID0gXCJUaGVyZSBhcmUgbm8gYW5ub3VuY2VtZW50cyBmb3IgeW91ISBUcnkgc3Vic2NyaWJpbmcgdG8gc29tZSBjbHVicyBieSBnb2luZyB0byAnYnJvd3NlIGNsdWJzJyBpbiB0aGUgc2lkZWJhciFcIjtcclxuICAgICAgICAgICAgICAgIGxibDEudGV4dFdyYXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGJsMi50ZXh0ID0gXCI8LS0tLS0tXCI7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwxKTtcclxuICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKGxibDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc29iai5iaXJ0aFtpXSAhPT0gb25EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25EYXRlID0gcmVzb2JqLmJpcnRoW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxibCA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxibC5jbGFzcyA9IFwiZGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxibC50ZXh0ID0gcmVzb2JqLmJpcnRoW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKGxibCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBidG4gPSBuZXcgQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBidG4udGV4dCA9IFwiW1wiICsgcmVzb2JqLmNsdWJbaV0gKyBcIl0gXCIgKyByZXNvYmoudGl0bGVbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImNvbG9yYmxpbmRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uYmFja2dyb3VuZENvbG9yID0gIFwiI2U5ZTllOVwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uYmFja2dyb3VuZENvbG9yID0gZ2V0VGludGVkQ29sb3IocmVzb2JqLmNvbG9yW2ldLCAxMjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnRuLm9uKEJ1dHRvbi50YXBFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzb2JqLmNsdWJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc29iai5kZXNjW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ2xvc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzKSB7XHJcbiAgICBsb2FkQW5uKGFyZ3MpO1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGFubm91bmNtZW50c1wiKTtcclxufVxyXG5cclxuLy8gY3JlZGl0czogcmljaGFyZCBtYWxvbmV5IDIwMDYsIGVkaXRlZCBieSBXaWxsIEZsZWV0d29vZCAyMDE4IGZvciBuYXRpdmVzY3JpcHQuIG11c3QgZGlzYWJsZSBuby1iaXR3aXNlIGZvciB0c2xpbnRcclxuZnVuY3Rpb24gZ2V0VGludGVkQ29sb3IoY29sb3IsIHYpIHtcclxuICAgIGlmIChjb2xvci5sZW5ndGggPiA2KSB7IGNvbG9yID0gY29sb3Iuc3Vic3RyaW5nKDEsIGNvbG9yLmxlbmd0aCk7IH1cclxuICAgIGNvbnN0IHJnYiA9IHBhcnNlSW50KGNvbG9yLCAxNik7XHJcbiAgICBsZXQgciA9IE1hdGguYWJzKCgocmdiID4+IDE2KSAmIDB4RkYpICsgdik7IGlmIChyID4gMjU1KSB7ciA9IHIgIC0gKHIgLSAyNTUpOyB9XHJcbiAgICBsZXQgZyA9IE1hdGguYWJzKCgocmdiID4+IDgpICYgMHhGRikgKyB2KTsgaWYgKGcgPiAyNTUpIHtnID0gZyAtIChnIC0gMjU1KTsgfVxyXG4gICAgbGV0IGIgPSBNYXRoLmFicygocmdiICYgMHhGRikgKyB2KTsgaWYgKGIgPiAyNTUpIHtiID0gYiAtIChiIC0gMjU1KTsgfVxyXG5cclxuICAgIGxldCBuZXdyID0gTnVtYmVyKHIgPCAwIHx8IGlzTmFOKHIpKSA/IDAgOiAoKHIgPiAyNTUpID8gMjU1IDogcikudG9TdHJpbmcoMTYpO1xyXG4gICAgaWYgKG5ld3IudmFsdWVPZigpIDw9IDkpIHtuZXdyID0gXCIwXCIgKyBuZXdyOyB9XHJcbiAgICBsZXQgbmV3ZyA9IE51bWJlcihnIDwgMCB8fCBpc05hTihnKSkgPyAwIDogKChnID4gMjU1KSA/IDI1NSA6IGcpLnRvU3RyaW5nKDE2KTtcclxuICAgIGlmIChuZXdnLnZhbHVlT2YoKSA8PSA5KSB7bmV3ZyA9IFwiMFwiICsgZzsgfVxyXG4gICAgbGV0IG5ld2IgPSBOdW1iZXIoYiA8IDAgfHwgaXNOYU4oYikpID8gMCA6ICgoYiA+IDI1NSkgPyAyNTUgOiBiKS50b1N0cmluZygxNik7XHJcbiAgICBpZiAoYi52YWx1ZU9mKCkgPD0gOSkgeyBuZXdiID0gXCIwXCIgKyBiOyB9XHJcblxyXG4gICAgcmV0dXJuIFwiI1wiICsgbmV3ciArIG5ld2cgKyBuZXdiO1xyXG59XHJcbiJdfQ==