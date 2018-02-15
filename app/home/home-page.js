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
        var url = "https://fzwestboard.000webhostapp.com/getann.php";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRzFELHFEQUFvRDtBQUNwRCxtREFBa0Q7QUFFbEQsb0NBQXNDO0FBQ3RDLGtDQUFtQztBQUVuQyxxREFBa0Q7QUFFbEQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCx1QkFBOEIsSUFBbUI7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRkQsc0NBRUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQsZ0JBQXVCLElBQWU7SUFDbEMsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RCxJ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QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBbkJHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRTs0QkFBckIsQ0FBQztpQkFtQmI7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFwREQsMEJBb0RDO0FBRUQsa0JBQXlCLElBQUk7SUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFIRCw0QkFHQztBQUVELGlCQUF3QixJQUFJO0lBQzVCLE1BQU0sQ0FBQztBQUNQLENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBIb21lVmlld01vZGVsIH0gZnJvbSBcIi4vaG9tZS12aWV3LW1vZGVsXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGluZCA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgaW5kLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBsb2FkQW5uKGFyZ3MpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIb21lVmlld01vZGVsKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRlZFwiKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0YXNzKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcclxuICAgIGNvbnN0IGJ0biA9IG5ldyBCdXR0b24oKTtcclxuICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsIGRvdWJsZWRpbGRvKTtcclxuICAgIGJ0bi50ZXh0ID0gXCJvaGFpXCI7XHJcbiAgICBzdGFjay5hZGRDaGlsZChidG4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlZGlsZG8oYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgIGxibC5jbGFzc05hbWUgPSBcImRhdGVcIjtcclxuICAgICAgICBsYmwudGV4dCA9IChkLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZC5nZXREYXRlKCkgKyBcIi9cIiArIGQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFubihhcmdzKSB7XHJcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3VpZDogdXNlci51aWR9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcInNsYXlvdXRcIik7XHJcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL2dldGFubi5waHBcIjtcclxuICAgICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG5cclxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzdGFjay5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2aXR5SW5kaWNhdG9yID0gPEFjdGl2aXR5SW5kaWNhdG9yPnBhZ2UuZ2V0Vmlld0J5SWQoXCJhY3Rpdml0eUluZGljYXRvclwiKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2aXR5SW5kaWNhdG9yLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvYmogPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcmVzb2JqLnRpdGxlLmxlbmd0aDsgLy8gIyBvZiBpdGVtcyBpbiB0aGUgYXJyYXksIG5vdCB0aGUgIyBvZiBjaGFyYWN0ZXJzIGluIHRoZSB0aXRsZVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bjtcclxuICAgICAgICAgICAgICAgIGxldCBsYmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgb25EYXRlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29iai5iaXJ0aFtpXSAhPT0gb25EYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZSA9IHJlc29iai5iaXJ0aFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGJsID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxibC5jbGFzcyA9IFwiZGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYmwudGV4dCA9IHJlc29iai5iaXJ0aFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQobGJsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuID0gbmV3IEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi50ZXh0ID0gXCJbXCIgKyByZXNvYmouY2x1YltpXSArIFwiXSBcIiArIHJlc29iai50aXRsZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBidG4uYmFja2dyb3VuZENvbG9yID0gcmVzb2JqLmNvbG9yW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlc29iai5jbHViW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNvYmouZGVzY1tpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNsb3NlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKGJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzKSB7XHJcbiAgICBsb2FkQW5uKGFyZ3MpO1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGFubm91bmNtZW50c1wiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2goYXJncykge1xyXG5yZXR1cm47XHJcbn1cclxuIl19