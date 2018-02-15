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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRzFELHFEQUFvRDtBQUNwRCxtREFBa0Q7QUFFbEQsb0NBQXNDO0FBQ3RDLGtDQUFtQztBQUVuQyxxREFBa0Q7QUFFbEQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCx1QkFBOEIsSUFBbUI7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRkQsc0NBRUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQsZ0JBQXVCLElBQWU7SUFDbEMsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RCxJ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QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBbkJHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRTs0QkFBckIsQ0FBQztpQkFtQmI7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFwREQsMEJBb0RDO0FBRUQsa0JBQXlCLElBQUk7SUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFIRCw0QkFHQztBQUVELGlCQUF3QixJQUFJO0lBQzVCLE1BQU0sQ0FBQztBQUNQLENBQUM7QUFGRCwwQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgSG9tZVZpZXdNb2RlbCB9IGZyb20gXCIuL2hvbWUtdmlldy1tb2RlbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcbiAgICAgICAgY29uc3QgaW5kID0gPEFjdGl2aXR5SW5kaWNhdG9yPnBhZ2UuZ2V0Vmlld0J5SWQoXCJhY3Rpdml0eUluZGljYXRvclwiKTtcbiAgICAgICAgaW5kLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgbG9hZEFubihhcmdzKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBIb21lVmlld01vZGVsKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmdcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRlZFRvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRlZFwiKTtcbn1cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcbiAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFzcyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xuICAgIGNvbnN0IGJ0biA9IG5ldyBCdXR0b24oKTtcbiAgICBidG4ub24oQnV0dG9uLnRhcEV2ZW50LCBkb3VibGVkaWxkbyk7XG4gICAgYnRuLnRleHQgPSBcIm9oYWlcIjtcbiAgICBzdGFjay5hZGRDaGlsZChidG4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlZGlsZG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBjb25zdCBsYmwgPSBuZXcgTGFiZWwoKTtcbiAgICAgICAgbGJsLmNsYXNzTmFtZSA9IFwiZGF0ZVwiO1xuICAgICAgICBsYmwudGV4dCA9IChkLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZC5nZXREYXRlKCkgKyBcIi9cIiArIGQuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgIHN0YWNrLmFkZENoaWxkKGxibCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFubihhcmdzKSB7XG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeSh7dWlkOiB1c2VyLnVpZH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcbiAgICAgICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgICAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD5wYWdlLmdldFZpZXdCeUlkKFwic2xheW91dFwiKTtcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwOi8vMjQuMjE3LjI0OS4yMTYvcGhwZmlsZXMvZ2V0YW5uLnBocFwiO1xuICAgICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIiwgXCJYLVJlcXVlc3RlZC1XaXRoLCBhY2NlcHQsIGNvbnRlbnQtdHlwZVwiKTtcblxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3RhY2sucmVtb3ZlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2aXR5SW5kaWNhdG9yID0gPEFjdGl2aXR5SW5kaWNhdG9yPnBhZ2UuZ2V0Vmlld0J5SWQoXCJhY3Rpdml0eUluZGljYXRvclwiKTtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eUluZGljYXRvci52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29iaiA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcmVzb2JqLnRpdGxlLmxlbmd0aDsgLy8gIyBvZiBpdGVtcyBpbiB0aGUgYXJyYXksIG5vdCB0aGUgIyBvZiBjaGFyYWN0ZXJzIGluIHRoZSB0aXRsZVxuICAgICAgICAgICAgICAgIGxldCBidG47XG4gICAgICAgICAgICAgICAgbGV0IGxibDtcbiAgICAgICAgICAgICAgICBsZXQgb25EYXRlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2JqLmJpcnRoW2ldICE9PSBvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF0ZSA9IHJlc29iai5iaXJ0aFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxibCA9IG5ldyBMYWJlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGJsLmNsYXNzID0gXCJkYXRlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYmwudGV4dCA9IHJlc29iai5iaXJ0aFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKGxibCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnRuID0gbmV3IEJ1dHRvbigpO1xuICAgICAgICAgICAgICAgICAgICBidG4udGV4dCA9IFwiW1wiICsgcmVzb2JqLmNsdWJbaV0gKyBcIl0gXCIgKyByZXNvYmoudGl0bGVbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5iYWNrZ3JvdW5kQ29sb3IgPSByZXNvYmouY29sb3JbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzb2JqLmNsdWJbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNvYmouZGVzY1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChidG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAgICAgeG1saHR0cC5zZW5kKHJlcXVlc3QpO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3MpIHtcbiAgICBsb2FkQW5uKGFyZ3MpO1xuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBhbm5vdW5jbWVudHNcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoKGFyZ3MpIHtcbnJldHVybjtcbn1cbiJdfQ==