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
                            message: resobj_1.desc[i] + resobj_1.clubid[i],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRzFELHFEQUFvRDtBQUNwRCxtREFBa0Q7QUFFbEQsb0NBQXNDO0FBQ3RDLGtDQUFtQztBQUVuQyxxREFBa0Q7QUFFbEQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVkLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCx1QkFBOEIsSUFBbUI7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRkQsc0NBRUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQsZ0JBQXVCLElBQWU7SUFDbEMsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RCxJ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b0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBQ0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFuQkcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFOzRCQUFyQixDQUFDO2lCQW1CYjtZQUNMLENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFBRSxVQUFDLEtBQUs7UUFDTCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBERCwwQkFvREM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUhELDRCQUdDO0FBRUQsaUJBQXdCLElBQUk7SUFDNUIsTUFBTSxDQUFDO0FBQ1AsQ0FBQztBQUZELDBCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xuaW1wb3J0IHsgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBIb21lVmlld01vZGVsIH0gZnJvbSBcIi4vaG9tZS12aWV3LW1vZGVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICBjb25zdCBpbmQgPSA8QWN0aXZpdHlJbmRpY2F0b3I+cGFnZS5nZXRWaWV3QnlJZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpO1xuICAgICAgICBpbmQudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICBsb2FkQW5uKGFyZ3MpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEhvbWVWaWV3TW9kZWwoKTtcblxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZ1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVkVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGVkXCIpO1xufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0YXNzKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNsYXlvdXRcIik7XG4gICAgY29uc3QgYnRuID0gbmV3IEJ1dHRvbigpO1xuICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsIGRvdWJsZWRpbGRvKTtcbiAgICBidG4udGV4dCA9IFwib2hhaVwiO1xuICAgIHN0YWNrLmFkZENoaWxkKGJ0bik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3VibGVkaWxkbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xuICAgICAgICBsYmwuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG4gICAgICAgIGxibC50ZXh0ID0gKGQuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgKyBkLmdldERhdGUoKSArIFwiL1wiICsgZC5nZXRGdWxsWWVhcigpO1xuICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgc3RhY2suYWRkQ2hpbGQobGJsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQW5uKGFyZ3MpIHtcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KHt1aWQ6IHVzZXIudWlkfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcXVlc3QpO1xuICAgICAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnBhZ2UuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xuICAgICAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly8yNC4yMTcuMjQ5LjIxNi9waHBmaWxlcy9nZXRhbm4ucGhwXCI7XG4gICAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCk7XG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIiwgXCJHRVQsIFBPU1QsIE9QVElPTlNcIik7XG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xuXG4gICAgICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGFjay5yZW1vdmVDaGlsZHJlbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZpdHlJbmRpY2F0b3IgPSA8QWN0aXZpdHlJbmRpY2F0b3I+cGFnZS5nZXRWaWV3QnlJZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpO1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5SW5kaWNhdG9yLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2JqID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSByZXNvYmoudGl0bGUubGVuZ3RoOyAvLyAjIG9mIGl0ZW1zIGluIHRoZSBhcnJheSwgbm90IHRoZSAjIG9mIGNoYXJhY3RlcnMgaW4gdGhlIHRpdGxlXG4gICAgICAgICAgICAgICAgbGV0IGJ0bjtcbiAgICAgICAgICAgICAgICBsZXQgbGJsO1xuICAgICAgICAgICAgICAgIGxldCBvbkRhdGU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNvYmouYmlydGhbaV0gIT09IG9uRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXRlID0gcmVzb2JqLmJpcnRoW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGJsID0gbmV3IExhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYmwuY2xhc3MgPSBcImRhdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxibC50ZXh0ID0gcmVzb2JqLmJpcnRoW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQobGJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidG4gPSBuZXcgQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi50ZXh0ID0gXCJbXCIgKyByZXNvYmouY2x1YltpXSArIFwiXSBcIiArIHJlc29iai50aXRsZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnRuLmJhY2tncm91bmRDb2xvciA9IHJlc29iai5jb2xvcltpXTtcbiAgICAgICAgICAgICAgICAgICAgYnRuLm9uKEJ1dHRvbi50YXBFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXNvYmouY2x1YltpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc29iai5kZXNjW2ldICsgcmVzb2JqLmNsdWJpZFtpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChidG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAgICAgeG1saHR0cC5zZW5kKHJlcXVlc3QpO1xuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3MpIHtcbiAgICBsb2FkQW5uKGFyZ3MpO1xuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBhbm5vdW5jbWVudHNcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoKGFyZ3MpIHtcbnJldHVybjtcbn1cbiJdfQ==