"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var colorModule = require("tns-core-modules/color");
var button_1 = require("tns-core-modules/ui/button/button");
var label_1 = require("tns-core-modules/ui/label");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var frame_1 = require("ui/frame");
var myClubs_view_model_1 = require("./myClubs-view-model");
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
    page.bindingContext = new myClubs_view_model_1.MyClubsViewModel();
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
            url: "https://fzwestboard.000webhostapp.com/getmyclubs.php",
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
            console.log("subcheck list: " + resobj);
            var lastStack;
            var _loop_1 = function (i) {
                var stack = new stack_layout_1.StackLayout();
                stack.borderBottomWidth = 2;
                stack.borderBottomColor = gray;
                var title = new label_1.Label();
                title.className = "title";
                title.textWrap = true;
                title.col = 1;
                title.text = titles[i];
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
                        container.removeChild(stack);
                    }, function (error) {
                        console.error(JSON.stringify(error));
                    });
                });
                stack.addChild(title);
                stack.addChild(subbutton);
                var spacer = new label_1.Label();
                spacer.height = 10;
                stack.addChild(spacer);
                subbutton.borderColor = "#000000";
                subbutton.backgroundColor = "#FF0000"; // red
                subbutton.text = "Unsubscribe";
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
        alert("FB ERROR: " + error);
    });
}
exports.putClubs = putClubs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlDbHVicy1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXlDbHVicy1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdURBQTBEO0FBRTFELG9EQUFzRDtBQUV0RCw0REFBMkQ7QUFDM0QsbURBQWtEO0FBRWxELHlFQUF1RTtBQUN2RSxrQ0FBbUM7QUFFbkMsMkRBQXdEO0FBRXhELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDaEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV4Qyw4RUFBOEU7QUFFOUU7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFDQUFnQixFQUFFLENBQUM7QUFDakQsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELGdCQUF1QixJQUFJO0lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsd0JBRUM7QUFFRCxrQkFBeUIsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMs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LEdBQUcsU0FBUyxDQUFDLENBQUMsTUFBTTtnQkFDN0MsU0FBUyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7Z0JBRS9CLElBQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3hFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUMvQixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLENBQUM7WUExREQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFO3dCQUF0QixDQUFDO2FBMERUO1lBQ0QsU0FBUyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUExRkQsNEJBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgb2JzZXJ2YWJsZU1vZHVsZSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgKiBhcyBjb2xvck1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUluZGljYXRvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGl2aXR5LWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b24vYnV0dG9uXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXQvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IGdldFZpZXdCeUlkLCBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgTXlDbHVic1ZpZXdNb2RlbCB9IGZyb20gXCIuL215Q2x1YnMtdmlldy1tb2RlbFwiO1xyXG5cclxuY29uc3QgQ29sb3IgPSBjb2xvck1vZHVsZS5Db2xvcjtcclxuY29uc3QgZ3JheSA9IG5ldyBDb2xvcihcIiNjNmM2YzZcIik7XHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuY29uc3QgZ2VzdHVyZXMgPSByZXF1aXJlKFwidWkvZ2VzdHVyZXNcIik7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZTpwcmVmZXItY29uZGl0aW9uYWwtZXhwcmVzc2lvbiBqc2RvYy1mb3JtYXQgbWF4LWxpbmUtbGVuZ3RoKi9cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgTXlDbHVic1ZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWQoYXJncykge1xyXG4gICAgcHV0Q2x1YnMoYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXRDbHVicyhhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNsdWJDb250YWluZXJcIik7XHJcbiAgICBsZXQgbGVuZ3RoO1xyXG4gICAgbGV0IHRpdGxlcztcclxuICAgIGxldCBkZXNjcztcclxuICAgIGxldCBpZHM7XHJcbiAgICBsZXQgc3VibGlzdDtcclxuICAgIC8vIGxldCBzdWJsaXN0O1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0bXljbHVicy5waHBcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHsgLy8gaW5pdGlhbGl6ZSBmaXJzdFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY29udGVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29iaiA9IEpTT04ucGFyc2UocmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBsZW5ndGggPSByZXNvYmoubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRpdGxlcyA9IHJlc29iai5uYW1lO1xyXG4gICAgICAgICAgICBkZXNjcyA9IHJlc29iai5kZXNjO1xyXG4gICAgICAgICAgICBpZHMgPSByZXNvYmouaWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3ViY2hlY2sgbGlzdDogXCIgKyByZXNvYmopO1xyXG4gICAgICAgICAgICBsZXQgbGFzdFN0YWNrO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFjayA9IG5ldyBTdGFja0xheW91dCgpO1xyXG4gICAgICAgICAgICAgICAgc3RhY2suYm9yZGVyQm90dG9tV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgc3RhY2suYm9yZGVyQm90dG9tQ29sb3IgPSBncmF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS5jb2wgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dCA9IHRpdGxlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICBkZXNjLmNsYXNzTmFtZSA9IFwiZGVzY1wiO1xyXG4gICAgICAgICAgICAgICAgZGVzYy50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXNjLnRleHQgPSBkZXNjc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJidXR0b24gPSBuZXcgQnV0dG9uKCk7XHJcbiAgICAgICAgICAgICAgICBzdWJidXR0b24ud2lkdGggPSAyMDA7XHJcbiAgICAgICAgICAgICAgICBzdWJidXR0b24uaG9yaXpvbnRhbEFsaWdubWVudCA9IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJSYWRpdXMgPSAxNTtcclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJXaWR0aCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBzdWJidXR0b24ubWFyZ2luUmlnaHQgPSAxNTtcclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJTdWJzY3JpYmVcIjtcclxuICAgICAgICAgICAgICAgIC8vIGRlc2MudGV4dCA9IGRlc2NzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5vbihcInRhcFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vc3Vic2NyaWJlLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCwgY2x1YmlkOiBpZHNbaV0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh0YXByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGFwcmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3QgPSBKU09OLnBhcnNlKHRhcHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZDogXCIgKyBpZHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1Ymxpc3Q6IFwiICsgc3VibGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9vbGVhbjogXCIgKyBzdWJsaXN0LmluY2x1ZGVzKGlkc1tpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZCh0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChzdWJidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhY2VyID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICBzcGFjZXIuaGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChzcGFjZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi5ib3JkZXJDb2xvciA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgc3ViYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGMDAwMFwiOyAvLyByZWRcclxuICAgICAgICAgICAgICAgIHN1YmJ1dHRvbi50ZXh0ID0gXCJVbnN1YnNjcmliZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChzdGFjayk7XHJcbiAgICAgICAgICAgICAgICBsYXN0U3RhY2sgPSBzdGFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0U3RhY2suYm9yZGVyQm90dG9tV2lkdGggPSAwO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcbiJdfQ==