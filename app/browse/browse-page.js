"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var label_1 = require("tns-core-modules/ui/label");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var frame_1 = require("ui/frame");
var browse_view_model_1 = require("./browse-view-model");
var button_1 = require("tns-core-modules/ui/button/button");
var http = require("http");
var gestures = require("ui/gestures");
/* tslint:disable:prefer-conditional-expression jsdoc-format max-line-length*/
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    var page = args.object;
    page.bindingContext = new browse_view_model_1.BrowseViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
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
function onLoad(args) {
    putClubs(args);
}
exports.onLoad = onLoad;
function putClubs(args) {
    var page = args.object;
    var container = page.getViewById("clubContainer");
    var length;
    var titles;
    var descs;
    var ids;
    var sublist;
    // let sublist;
    firebase.getCurrentUser().then(function (user) {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getclubs.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then(function (result) {
            console.log(result.content);
            var resobj = JSON.parse(result.content);
            length = resobj.name.length;
            titles = resobj.name;
            descs = resobj.desc;
            ids = resobj.id;
            http.request({
                url: "https://fzwestboard.000webhostapp.com/subcheck.php",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ uid: user.uid })
            }).then(function (subresult) {
                var subresobj = JSON.parse(subresult.content);
                console.log("subcheck list: " + subresobj);
                sublist = subresobj;
                var _loop_1 = function (i) {
                    var stack = new stack_layout_1.StackLayout();
                    var title = new label_1.Label();
                    title.className = "title";
                    title.textWrap = true;
                    title.col = 1;
                    var desc = new label_1.Label();
                    desc.className = "desc";
                    desc.textWrap = true;
                    var subbutton = new button_1.Button();
                    subbutton.width = 200;
                    subbutton.horizontalAlignment = "right";
                    subbutton.borderRadius = 15;
                    subbutton.borderWidth = 4;
                    subbutton.marginRight = 15;
                    subbutton.text = "Subscribe";
                    title.text = titles[i];
                    // desc.text = descs[i]; 
                    subbutton.on("tap", function () {
                        console.log("tapped");
                        http.request({
                            url: "https://fzwestboard.000webhostapp.com/subscribe.php",
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            content: JSON.stringify({ uid: user.uid, clubid: ids[i] })
                        }).then(function (tapresult) {
                            console.log(JSON.stringify(tapresult));
                            sublist = JSON.parse(tapresult.content);
                            console.log("id: " + ids[i]);
                            console.log("Sublist: " + sublist);
                            console.log("boolean: " + sublist.includes(ids[i]));
                            if (sublist.includes(ids[i])) {
                                console.log(ids[i]);
                                subbutton.backgroundColor = "#48f442"; // light green
                                subbutton.borderColor = "#48f442";
                                subbutton.text = "Subscribed";
                            }
                            else {
                                console.log(ids[i]);
                                subbutton.borderColor = "#000000";
                                subbutton.backgroundColor = "#FFFFFF"; // white
                                subbutton.text = "Subscribe";
                            }
                        }, function (error) {
                            console.error(JSON.stringify(error));
                        });
                    });
                    stack.addChild(title);
                    stack.addChild(subbutton);
                    if (sublist.includes(ids[i])) {
                        subbutton.backgroundColor = "#48f442"; // light green
                        subbutton.borderColor = "#48f442";
                        subbutton.text = "Subscribed";
                    }
                    else {
                        subbutton.borderColor = "#000000";
                        subbutton.backgroundColor = "#FFFFFF"; // white
                        subbutton.text = "Subscribe";
                    }
                    var active = page.getViewById("activityIndicator");
                    active.visibility = "collapse";
                    container.addChild(stack);
                };
                for (var i = 0; i < length; i++) {
                    _loop_1(i);
                }
            }, function (error) {
                console.error(JSON.stringify(error));
            });
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.putClubs = putClubs;
function subscribe(clubidin) {
    firebase.getCurrentUser().then(function (user) {
        var request = JSON.stringify({ uid: user.uid, clubid: clubidin });
        console.log(request);
        var url = "https://fzwestboard.000webhostapp.com/subscribe.php";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(this.responseText));
            }
        };
        xmlhttp.send(request);
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.subscribe = subscribe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUEwRDtBQUcxRCxtREFBa0Q7QUFDbEQseUVBQXVFO0FBQ3ZFLGtDQUFtQztBQUVuQyx5REFBc0Q7QUFDdEQsNERBQTJEO0FBRTNELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEMsOEVBQThFO0FBRTlFOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELGdCQUF1QixJQUFJO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQU0sU0FBUyxHQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pFLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSSxNQUFNLENBQUM7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QUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDekUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7UUFFckcsT0FBTyxDQUFDLGtCQUFrQixHQUFHO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFBRSxVQUFDLEtBQUs7UUFDTCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXZCRCw4QkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UsIGdldFZpZXdCeUlkIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQnJvd3NlVmlld01vZGVsIH0gZnJvbSBcIi4vYnJvd3NlLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9ncmlkLWxheW91dC9ncmlkLWxheW91dFwiO1xyXG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbmNvbnN0IGdlc3R1cmVzID0gcmVxdWlyZShcInVpL2dlc3R1cmVzXCIpO1xyXG5cclxuLyogdHNsaW50OmRpc2FibGU6cHJlZmVyLWNvbmRpdGlvbmFsLWV4cHJlc3Npb24ganNkb2MtZm9ybWF0IG1heC1saW5lLWxlbmd0aCovXHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEJyb3dzZVZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWQoYXJncykge1xyXG4gICAgcHV0Q2x1YnMoYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXRDbHVicyhhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNsdWJDb250YWluZXJcIik7XHJcbiAgICBsZXQgbGVuZ3RoO1xyXG4gICAgbGV0IHRpdGxlcztcclxuICAgIGxldCBkZXNjcztcclxuICAgIGxldCBpZHM7XHJcbiAgICBsZXQgc3VibGlzdDtcclxuICAgIC8vIGxldCBzdWJsaXN0O1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0Y2x1YnMucGhwXCIsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoeyB1aWQ6IHVzZXIudWlkIH0pXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7IC8vIGluaXRpYWxpemUgZmlyc3RcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvYmogPSBKU09OLnBhcnNlKHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgbGVuZ3RoID0gcmVzb2JqLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aXRsZXMgPSByZXNvYmoubmFtZTtcclxuICAgICAgICAgICAgZGVzY3MgPSByZXNvYmouZGVzYztcclxuICAgICAgICAgICAgaWRzID0gcmVzb2JqLmlkO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3N1YmNoZWNrLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKChzdWJyZXN1bHQpID0+IHsgLy8gaW5pdGlhbGl6ZSBmaXJzdFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicmVzb2JqID0gSlNPTi5wYXJzZShzdWJyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1YmNoZWNrIGxpc3Q6IFwiICsgc3VicmVzb2JqKTtcclxuICAgICAgICAgICAgICAgIHN1Ymxpc3QgPSBzdWJyZXNvYmo7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2tMYXlvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuY29sID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy5jbGFzc05hbWUgPSBcImRlc2NcIjtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjLnRleHRXcmFwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJidXR0b24gPSBuZXcgQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLndpZHRoID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ob3Jpem9udGFsQWxpZ25tZW50ID0gXCJyaWdodFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJSYWRpdXMgPSAxNTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyV2lkdGggPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5tYXJnaW5SaWdodCA9IDE1O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnRleHQgPSB0aXRsZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzYy50ZXh0ID0gZGVzY3NbaV07IFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5vbihcInRhcFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3N1YnNjcmliZS5waHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQsIGNsdWJpZDogaWRzW2ldIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHRhcHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGFwcmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0ID0gSlNPTi5wYXJzZSh0YXByZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlkOiBcIiArIGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Ymxpc3Q6IFwiICsgc3VibGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvb2xlYW46IFwiICsgc3VibGlzdC5pbmNsdWRlcyhpZHNbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpIHsgLy8gc2V0IHRoZSBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiIzQ4ZjQ0MlwiOyAvLyBsaWdodCBncmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzQ4ZjQ0MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlckNvbG9yID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjRkZGRkZGXCI7IC8vIHdoaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKHRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChzdWJidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpIHsgLy8gc2V0IHRoZSBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjNDhmNDQyXCI7IC8vIGxpZ2h0IGdyZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzQ4ZjQ0MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzAwMDAwMFwiOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjRkZGRkZGXCI7IC8vIHdoaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHN0YWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoY2x1YmlkaW4pIHsgLy8gdW5maW5pc2hlZFxyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KHt1aWQ6IHVzZXIudWlkLCBjbHViaWQ6IGNsdWJpZGlufSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVxdWVzdCk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3N1YnNjcmliZS5waHBcIjtcclxuICAgICAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG5cclxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuIl19