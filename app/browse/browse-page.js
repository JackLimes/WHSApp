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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUEwRDtBQUUxRCxvREFBc0Q7QUFFdEQsNERBQTJEO0FBQzNELG1EQUFrRDtBQUVsRCx5RUFBdUU7QUFDdkUsa0NBQW1DO0FBRW5DLHlEQUFzRDtBQUV0RCxJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEMsOEVBQThFO0FBRTlFOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELGdCQUF1QixJQUFJO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFB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XCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0ICogYXMgY29sb3JNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCI7XHJcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0L2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBnZXRWaWV3QnlJZCwgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEJyb3dzZVZpZXdNb2RlbCB9IGZyb20gXCIuL2Jyb3dzZS12aWV3LW1vZGVsXCI7XHJcblxyXG5jb25zdCBDb2xvciA9IGNvbG9yTW9kdWxlLkNvbG9yO1xyXG5jb25zdCBncmF5ID0gbmV3IENvbG9yKFwiI2M2YzZjNlwiKTtcclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5jb25zdCBnZXN0dXJlcyA9IHJlcXVpcmUoXCJ1aS9nZXN0dXJlc1wiKTtcclxuXHJcbi8qIHRzbGludDpkaXNhYmxlOnByZWZlci1jb25kaXRpb25hbC1leHByZXNzaW9uIGpzZG9jLWZvcm1hdCBtYXgtbGluZS1sZW5ndGgqL1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBCcm93c2VWaWV3TW9kZWwoKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkKGFyZ3MpIHtcclxuICAgIHB1dENsdWJzKGFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHV0Q2x1YnMoYXJncykge1xyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gPFN0YWNrTGF5b3V0PnBhZ2UuZ2V0Vmlld0J5SWQoXCJjbHViQ29udGFpbmVyXCIpO1xyXG4gICAgbGV0IGxlbmd0aDtcclxuICAgIGxldCB0aXRsZXM7XHJcbiAgICBsZXQgZGVzY3M7XHJcbiAgICBsZXQgaWRzO1xyXG4gICAgbGV0IHN1Ymxpc3Q7XHJcbiAgICAvLyBsZXQgc3VibGlzdDtcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGh0dHAucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL2dldGNsdWJzLnBocFwiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCB9KVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4geyAvLyBpbml0aWFsaXplIGZpcnN0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2JqID0gSlNPTi5wYXJzZShyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgIGxlbmd0aCA9IHJlc29iai5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgdGl0bGVzID0gcmVzb2JqLm5hbWU7XHJcbiAgICAgICAgICAgIGRlc2NzID0gcmVzb2JqLmRlc2M7XHJcbiAgICAgICAgICAgIGlkcyA9IHJlc29iai5pZDtcclxuXHJcbiAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9zdWJjaGVjay5waHBcIixcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICAgICAgfSkudGhlbigoc3VicmVzdWx0KSA9PiB7IC8vIGluaXRpYWxpemUgZmlyc3RcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnJlc29iaiA9IEpTT04ucGFyc2Uoc3VicmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWJjaGVjayBsaXN0OiBcIiArIHN1YnJlc29iaik7XHJcbiAgICAgICAgICAgICAgICBzdWJsaXN0ID0gc3VicmVzb2JqO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RTdGFjaztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFjayA9IG5ldyBTdGFja0xheW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLmJvcmRlckJvdHRvbVdpZHRoID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5ib3JkZXJCb3R0b21Db2xvciA9IGdyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBuZXcgTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUudGV4dFdyYXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLmNvbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzYyA9IG5ldyBMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MuY2xhc3NOYW1lID0gXCJkZXNjXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYy50ZXh0ID0gZGVzY3NbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViYnV0dG9uID0gbmV3IEJ1dHRvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi53aWR0aCA9IDIwMDtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uaG9yaXpvbnRhbEFsaWdubWVudCA9IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyUmFkaXVzID0gMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlcldpZHRoID0gNDtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24ubWFyZ2luUmlnaHQgPSAxNTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUudGV4dCA9IHRpdGxlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZXNjLnRleHQgPSBkZXNjc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLm9uKFwidGFwXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9zdWJzY3JpYmUucGhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoeyB1aWQ6IHVzZXIudWlkLCBjbHViaWQ6IGlkc1tpXSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh0YXByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRhcHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdCA9IEpTT04ucGFyc2UodGFwcmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZDogXCIgKyBpZHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJsaXN0OiBcIiArIHN1Ymxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib29sZWFuOiBcIiArIHN1Ymxpc3QuaW5jbHVkZXMoaWRzW2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VibGlzdC5pbmNsdWRlcyhpZHNbaV0pKSB7IC8vIHNldCB0aGUgY29sb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0OGY0NDJcIjsgLy8gbGlnaHQgZ3JlZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYm9yZGVyQ29sb3IgPSBcIiM0OGY0NDJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24udGV4dCA9IFwiU3Vic2NyaWJlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzAwMDAwMFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjRkZGRkZGXCI7IC8vIHdoaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZCh0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQoZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQoc3ViYnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFjZXIgPSBuZXcgTGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZXIuaGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQoc3BhY2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Ymxpc3QuaW5jbHVkZXMoaWRzW2ldKSkgeyAvLyBzZXQgdGhlIGNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0OGY0NDJcIjsgLy8gbGlnaHQgZ3JlZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlckNvbG9yID0gXCIjNDhmNDQyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJvcmRlckNvbG9yID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkZGRkZcIjsgLy8gd2hpdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViYnV0dG9uLnRleHQgPSBcIlN1YnNjcmliZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gPEFjdGl2aXR5SW5kaWNhdG9yPnBhZ2UuZ2V0Vmlld0J5SWQoXCJhY3Rpdml0eUluZGljYXRvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQoc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTdGFjayA9IHN0YWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdFN0YWNrLmJvcmRlckJvdHRvbVdpZHRoID0gMDtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuIl19