"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var colorModule = require("tns-core-modules/color");
var button_1 = require("tns-core-modules/ui/button/button");
var label_1 = require("tns-core-modules/ui/label");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var frame_1 = require("ui/frame");
var browse_view_model_1 = require("./browse-view-model");
var Color = colorModule.Color;
var gray = new Color("#c6c6c6");
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
                var lastStack;
                var _loop_1 = function (i) {
                    var stack = new stack_layout_1.StackLayout();
                    stack.borderBottomWidth = 2;
                    stack.borderBottomColor = gray;
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
                    var spacer = new label_1.Label();
                    spacer.height = 10;
                    stack.addChild(spacer);
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
                    lastStack = stack;
                };
                for (var i = 0; i < length; i++) {
                    _loop_1(i);
                }
                lastStack.borderBottomWidth = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUEwRDtBQUUxRCxvREFBc0Q7QUFFdEQsNERBQTJEO0FBQzNELG1EQUFrRDtBQUVsRCx5RUFBdUU7QUFDdkUsa0NBQW1DO0FBRW5DLHlEQUFzRDtBQUV0RCxJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEMsOEVBQThFO0FBRTlFOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELGdCQUF1QixJQUFJO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFB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V0FBVyxHQUFHLFNBQVMsQ0FBQzt3QkFDbEMsU0FBUyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsQ0FBQyxRQUFRO3dCQUMvQyxTQUFTLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztvQkFDakMsQ0FBQztvQkFFRCxJQUFNLE1BQU0sR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUN4RSxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDL0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdEIsQ0FBQztnQkF4RUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzRCQUF0QixDQUFDO2lCQXdFVDtnQkFDRCxTQUFTLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF0SEQsNEJBc0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgb2JzZXJ2YWJsZU1vZHVsZSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgKiBhcyBjb2xvck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGl2aXR5LWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b24vYnV0dG9uXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXQvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IGdldFZpZXdCeUlkLCBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQnJvd3NlVmlld01vZGVsIH0gZnJvbSBcIi4vYnJvd3NlLXZpZXctbW9kZWxcIjtcclxuXHJcbmNvbnN0IENvbG9yID0gY29sb3JNb2R1bGUuQ29sb3I7XHJcbmNvbnN0IGdyYXkgPSBuZXcgQ29sb3IoXCIjYzZjNmM2XCIpO1xyXG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XHJcbmNvbnN0IGdlc3R1cmVzID0gcmVxdWlyZShcInVpL2dlc3R1cmVzXCIpO1xyXG5cclxuLyogdHNsaW50OmRpc2FibGU6cHJlZmVyLWNvbmRpdGlvbmFsLWV4cHJlc3Npb24ganNkb2MtZm9ybWF0IG1heC1saW5lLWxlbmd0aCovXHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEJyb3dzZVZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWQoYXJncykge1xyXG4gICAgcHV0Q2x1YnMoYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXRDbHVicyhhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNsdWJDb250YWluZXJcIik7XHJcbiAgICBsZXQgbGVuZ3RoO1xyXG4gICAgbGV0IHRpdGxlcztcclxuICAgIGxldCBkZXNjcztcclxuICAgIGxldCBpZHM7XHJcbiAgICBsZXQgc3VibGlzdDtcclxuICAgIC8vIGxldCBzdWJsaXN0O1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0Y2x1YnMucGhwXCIsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoeyB1aWQ6IHVzZXIudWlkIH0pXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7IC8vIGluaXRpYWxpemUgZmlyc3RcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvYmogPSBKU09OLnBhcnNlKHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgbGVuZ3RoID0gcmVzb2JqLm5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aXRsZXMgPSByZXNvYmoubmFtZTtcclxuICAgICAgICAgICAgZGVzY3MgPSByZXNvYmouZGVzYztcclxuICAgICAgICAgICAgaWRzID0gcmVzb2JqLmlkO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3N1YmNoZWNrLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKChzdWJyZXN1bHQpID0+IHsgLy8gaW5pdGlhbGl6ZSBmaXJzdFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicmVzb2JqID0gSlNPTi5wYXJzZShzdWJyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1YmNoZWNrIGxpc3Q6IFwiICsgc3VicmVzb2JqKTtcclxuICAgICAgICAgICAgICAgIHN1Ymxpc3QgPSBzdWJyZXNvYmo7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFN0YWNrO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gbmV3IFN0YWNrTGF5b3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYm9yZGVyQm90dG9tV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmJvcmRlckJvdHRvbUNvbG9yID0gZ3JheTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuY29sID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy5jbGFzc05hbWUgPSBcImRlc2NcIjtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjLnRleHRXcmFwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJidXR0b24gPSBuZXcgQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLndpZHRoID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ob3Jpem9udGFsQWxpZ25tZW50ID0gXCJyaWdodFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJSYWRpdXMgPSAxNTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyV2lkdGggPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5tYXJnaW5SaWdodCA9IDE1O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS50ZXh0ID0gdGl0bGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlc2MudGV4dCA9IGRlc2NzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24ub24oXCJ0YXBcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRhcHBlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3N1YnNjcmliZS5waHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQsIGNsdWJpZDogaWRzW2ldIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHRhcHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGFwcmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0ID0gSlNPTi5wYXJzZSh0YXByZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlkOiBcIiArIGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Ymxpc3Q6IFwiICsgc3VibGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvb2xlYW46IFwiICsgc3VibGlzdC5pbmNsdWRlcyhpZHNbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpIHsgLy8gc2V0IHRoZSBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiIzQ4ZjQ0MlwiOyAvLyBsaWdodCBncmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzQ4ZjQ0MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlckNvbG9yID0gXCIjMDAwMDAwXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkZGRkZcIjsgLy8gd2hpdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKHRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChzdWJidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYWNlciA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlci5oZWlnaHQgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChzcGFjZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VibGlzdC5pbmNsdWRlcyhpZHNbaV0pKSB7IC8vIHNldCB0aGUgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiIzQ4ZjQ0MlwiOyAvLyBsaWdodCBncmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyQ29sb3IgPSBcIiM0OGY0NDJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyQ29sb3IgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRkZGRlwiOyAvLyB3aGl0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSA8QWN0aXZpdHlJbmRpY2F0b3I+cGFnZS5nZXRWaWV3QnlJZChcImFjdGl2aXR5SW5kaWNhdG9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS52aXNpYmlsaXR5ID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChzdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFN0YWNrID0gc3RhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0U3RhY2suYm9yZGVyQm90dG9tV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJGQiBFUlJPUjogXCIgKyBlcnJvcik7XHJcbiAgICB9KTtcclxufVxyXG4iXX0=