"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var button_1 = require("tns-core-modules/ui/button");
var label_1 = require("tns-core-modules/ui/label");
var dialogs = require("ui/dialogs");
var frame_1 = require("ui/frame");
var home_view_model_1 = require("./home-view-model");
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
function loadAnn(args) {
    firebase.getCurrentUser().then(function (user) {
        var request = JSON.stringify({ uid: user.uid });
        console.log(request);
        var page = args.object;
        var stack = page.getViewById("slayout");
        var url = "http://24.217.249.216/phpfiles/getann.php";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
        xmlhttp.onreadystatechange = function () {
            stack.removeChildren();
            if (this.readyState === 4 && this.status === 200) {
                var activityIndicator = page.getViewById("activityIndicator");
                activityIndicator.visibility = "collapse";
                var resobj_1 = JSON.parse(this.responseText);
                var count = resobj_1.title.length; // # of items in the array, not the # of characters in the title
                var btn = void 0;
                var lbl = void 0;
                var onDate = void 0;
                var _loop_1 = function (i) {
                    if (resobj_1.birth[i] !== onDate) {
                        onDate = resobj_1.birth[i];
                        lbl = new label_1.Label();
                        lbl.class = "date";
                        lbl.text = resobj_1.birth[i];
                        stack.addChild(lbl);
                    }
                    btn = new button_1.Button();
                    btn.text = "[" + resobj_1.club[i] + "] " + resobj_1.title[i];
                    btn.backgroundColor = resobj_1.color[i];
                    btn.on(button_1.Button.tapEvent, function () {
                        dialogs.alert({
                            title: resobj_1.club[i],
                            message: resobj_1.desc[i],
                            okButtonText: "Close"
                        });
                    });
                    stack.addChild(btn);
                };
                for (var i = 0; i < count; i++) {
                    _loop_1(i);
                }
            }
        };
        xmlhttp.send(request);
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
function refresh(args) {
    return;
}
exports.refresh = refresh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRzFELHFEQUFvRDtBQUNwRCxtREFBa0Q7QUFFbEQsb0NBQXNDO0FBQ3RDLGtDQUFtQztBQUVuQyxxREFBa0Q7QUFFbEQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCx1QkFBOEIsSUFBbUI7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRkQsc0NBRUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQsZ0JBQXVCLElBQWU7SUFDbEMsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RCxJ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QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBbkJHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRTs0QkFBckIsQ0FBQztpQkFtQmI7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFwREQsMEJBb0RDO0FBRUQsa0JBQXlCLElBQUk7SUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFIRCw0QkFHQztBQUVELGlCQUF3QixJQUFJO0lBQzVCLE1BQU0sQ0FBQztBQUNQLENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBIb21lVmlld01vZGVsIH0gZnJvbSBcIi4vaG9tZS12aWV3LW1vZGVsXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGluZCA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgaW5kLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBsb2FkQW5uKGFyZ3MpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIb21lVmlld01vZGVsKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRlZFwiKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YXNzKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcclxuICAgIGNvbnN0IGJ0biA9IG5ldyBCdXR0b24oKTtcclxuICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsIGRvdWJsZWRpbGRvKTtcclxuICAgIGJ0bi50ZXh0ID0gXCJvaGFpXCI7XHJcbiAgICBzdGFjay5hZGRDaGlsZChidG4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlZGlsZG8oYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgIGxibC5jbGFzc05hbWUgPSBcImRhdGVcIjtcclxuICAgICAgICBsYmwudGV4dCA9IChkLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZC5nZXREYXRlKCkgKyBcIi9cIiArIGQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFubihhcmdzKSB7XHJcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3VpZDogdXNlci51aWR9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcInNsYXlvdXRcIik7XHJcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwOi8vMjQuMjE3LjI0OS4yMTYvcGhwZmlsZXMvZ2V0YW5uLnBocFwiO1xyXG4gICAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XHJcblxyXG4gICAgICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnJlbW92ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZpdHlJbmRpY2F0b3IgPSA8QWN0aXZpdHlJbmRpY2F0b3I+cGFnZS5nZXRWaWV3QnlJZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29iaiA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSByZXNvYmoudGl0bGUubGVuZ3RoOyAvLyAjIG9mIGl0ZW1zIGluIHRoZSBhcnJheSwgbm90IHRoZSAjIG9mIGNoYXJhY3RlcnMgaW4gdGhlIHRpdGxlXHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxibDtcclxuICAgICAgICAgICAgICAgIGxldCBvbkRhdGU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2JqLmJpcnRoW2ldICE9PSBvbkRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlID0gcmVzb2JqLmJpcnRoW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYmwgPSBuZXcgTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGJsLmNsYXNzID0gXCJkYXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxibC50ZXh0ID0gcmVzb2JqLmJpcnRoW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBidG4gPSBuZXcgQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnRleHQgPSBcIltcIiArIHJlc29iai5jbHViW2ldICsgXCJdIFwiICsgcmVzb2JqLnRpdGxlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5iYWNrZ3JvdW5kQ29sb3IgPSByZXNvYmouY29sb3JbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLm9uKEJ1dHRvbi50YXBFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzb2JqLmNsdWJbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc29iai5kZXNjW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ2xvc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAgICAgeG1saHR0cC5zZW5kKHJlcXVlc3QpO1xyXG4gICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJGQiBFUlJPUjogXCIgKyBlcnJvcik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3MpIHtcclxuICAgIGxvYWRBbm4oYXJncyk7XHJcbiAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcgYW5ub3VuY21lbnRzXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaChhcmdzKSB7XHJcbnJldHVybjtcclxufVxyXG4iXX0=