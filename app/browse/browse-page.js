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
                    desc.text = descs[i];
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
                        subbutton.text = "processing...";
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
                    stack.addChild(desc);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUEwRDtBQUUxRCxvREFBc0Q7QUFFdEQsNERBQTJEO0FBQzNELG1EQUFrRDtBQUVsRCx5RUFBdUU7QUFDdkUsa0NBQW1DO0FBRW5DLHlEQUFzRDtBQUV0RCxJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEMsOEVBQThFO0FBRTlFOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELGdCQUF1QixJQUFJO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFB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Q29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCAqIGFzIGNvbG9yTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5SW5kaWNhdG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvbi9idXR0b25cIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9ncmlkLWxheW91dC9ncmlkLWxheW91dFwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgZ2V0Vmlld0J5SWQsIE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBCcm93c2VWaWV3TW9kZWwgfSBmcm9tIFwiLi9icm93c2Utdmlldy1tb2RlbFwiO1xyXG5cclxuY29uc3QgQ29sb3IgPSBjb2xvck1vZHVsZS5Db2xvcjtcclxuY29uc3QgZ3JheSA9IG5ldyBDb2xvcihcIiNjNmM2YzZcIik7XHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuY29uc3QgZ2VzdHVyZXMgPSByZXF1aXJlKFwidWkvZ2VzdHVyZXNcIik7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZTpwcmVmZXItY29uZGl0aW9uYWwtZXhwcmVzc2lvbiBqc2RvYy1mb3JtYXQgbWF4LWxpbmUtbGVuZ3RoKi9cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgQnJvd3NlVmlld01vZGVsKCk7XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxyXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XHJcbiAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZChhcmdzKSB7XHJcbiAgICBwdXRDbHVicyhhcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1dENsdWJzKGFyZ3MpIHtcclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IDxTdGFja0xheW91dD5wYWdlLmdldFZpZXdCeUlkKFwiY2x1YkNvbnRhaW5lclwiKTtcclxuICAgIGxldCBsZW5ndGg7XHJcbiAgICBsZXQgdGl0bGVzO1xyXG4gICAgbGV0IGRlc2NzO1xyXG4gICAgbGV0IGlkcztcclxuICAgIGxldCBzdWJsaXN0O1xyXG4gICAgLy8gbGV0IHN1Ymxpc3Q7XHJcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9nZXRjbHVicy5waHBcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHsgLy8gaW5pdGlhbGl6ZSBmaXJzdFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29iaiA9IEpTT04ucGFyc2UocmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBsZW5ndGggPSByZXNvYmoubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRpdGxlcyA9IHJlc29iai5uYW1lO1xyXG4gICAgICAgICAgICBkZXNjcyA9IHJlc29iai5kZXNjO1xyXG4gICAgICAgICAgICBpZHMgPSByZXNvYmouaWQ7XHJcblxyXG4gICAgICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vc3ViY2hlY2sucGhwXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoeyB1aWQ6IHVzZXIudWlkIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHN1YnJlc3VsdCkgPT4geyAvLyBpbml0aWFsaXplIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJyZXNvYmogPSBKU09OLnBhcnNlKHN1YnJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3ViY2hlY2sgbGlzdDogXCIgKyBzdWJyZXNvYmopO1xyXG4gICAgICAgICAgICAgICAgc3VibGlzdCA9IHN1YnJlc29iajtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0U3RhY2s7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2tMYXlvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5ib3JkZXJCb3R0b21XaWR0aCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYm9yZGVyQm90dG9tQ29sb3IgPSBncmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnRleHRXcmFwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5jb2wgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBuZXcgTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjLmNsYXNzTmFtZSA9IFwiZGVzY1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MudGV4dFdyYXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MudGV4dCA9IGRlc2NzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YmJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24ud2lkdGggPSAyMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmhvcml6b250YWxBbGlnbm1lbnQgPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlclJhZGl1cyA9IDE1O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJXaWR0aCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLm1hcmdpblJpZ2h0ID0gMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLnRleHQgPSB0aXRsZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzYy50ZXh0ID0gZGVzY3NbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5vbihcInRhcFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJwcm9jZXNzaW5nLi4uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFwcGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vc3Vic2NyaWJlLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCwgY2x1YmlkOiBpZHNbaV0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigodGFwcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0YXByZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3QgPSBKU09OLnBhcnNlKHRhcHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWQ6IFwiICsgaWRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VibGlzdDogXCIgKyBzdWJsaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9vbGVhbjogXCIgKyBzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ymxpc3QuaW5jbHVkZXMoaWRzW2ldKSkgeyAvLyBzZXQgdGhlIGNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjNDhmNDQyXCI7IC8vIGxpZ2h0IGdyZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlckNvbG9yID0gXCIjNDhmNDQyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyQ29sb3IgPSBcIiMwMDAwMDBcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRkZGRlwiOyAvLyB3aGl0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQodGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKHN1YmJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhY2VyID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VyLmhlaWdodCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmFkZENoaWxkKHNwYWNlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpIHsgLy8gc2V0IHRoZSBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjNDhmNDQyXCI7IC8vIGxpZ2h0IGdyZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzQ4ZjQ0MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjRkZGRkZGXCI7IC8vIHdoaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U3RhY2sgPSBzdGFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RTdGFjay5ib3JkZXJCb3R0b21XaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcbiJdfQ==