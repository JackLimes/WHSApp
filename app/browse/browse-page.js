"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var label_1 = require("tns-core-modules/ui/label");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var frame_1 = require("ui/frame");
var browse_view_model_1 = require("./browse-view-model");
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
    var url = "https://fzwestboard.000webhostapp.com/getclubs.php";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsondata_1 = JSON.parse(this.responseText);
            var length_1 = jsondata_1.name.length;
            var _loop_1 = function (i) {
                var stack = new stack_layout_1.StackLayout();
                var title = new label_1.Label();
                title.className = "title";
                title.textWrap = true;
                var desc = new label_1.Label();
                desc.className = "desc";
                desc.textWrap = true;
                title.text = jsondata_1.name[i];
                desc.text = jsondata_1.desc[i];
                stack.addChild(title);
                stack.addChild(desc);
                var tapped = false;
                stack.on("tap", function () {
                    if (tapped == false) {
                        tapped = true;
                    }
                    else {
                        tapped = false;
                    }
                    if (tapped) {
                        stack.backgroundColor = "#48f442"; // light green
                        subscribe(jsondata_1.id[i]);
                    }
                    else {
                        stack.backgroundColor = "#FFFFFF"; // white
                        unsubscribe(jsondata_1.id[i]);
                    }
                });
                var active = page.getViewById("activityIndicator");
                active.visibility = "collapse";
                container.addChild(stack);
            };
            for (var i = 0; i < length_1; i++) {
                _loop_1(i);
            }
        }
    };
    xmlhttp.send();
}
exports.putClubs = putClubs;
function subscribe(clubid) {
    firebase.getCurrentUser().then(function (user) {
        var request = JSON.stringify({ uid: user.uid, clubid: clubid });
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
                var resobj = JSON.parse(this.responseText);
            }
        };
        xmlhttp.send(request);
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.subscribe = subscribe;
function unsubscribe(clubid) {
    firebase.getCurrentUser().then(function (user) {
        var request = JSON.stringify({ uid: user.uid, clubid: clubid });
        console.log(request);
        var url = "https://fzwestboard.000webhostapp.com/unsubscribe.php";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var resobj = JSON.parse(this.responseText);
            }
        };
        xmlhttp.send(request);
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.unsubscribe = unsubscribe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2UtcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVEQUEwRDtBQUcxRCxtREFBa0Q7QUFDbEQseUVBQXVFO0FBQ3ZFLGtDQUFtQztBQUVuQyx5REFBc0Q7QUFFdEQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1DQUFlLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBWkQsd0NBWUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQsZ0JBQXVCLElBQUk7SUFDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFGRCx3QkFFQztBQUVELGtCQUF5QixJQUFJO0lBQ3pCLElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsSUFBTSxTQUFTLEdBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakUsSUFBTSxHQUFHLEdBQUcsb0RBQW9ELENBQUM7SUFDakUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7SUFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9FLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUNyRyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQU0sVUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLElBQU0sUUFBTSxHQUFHLFVBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29DQUMzQixDQUFDO2dCQUNOLElBQU0sS0FBSyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO2dCQUNoQyxJQUFNLEtBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO2dCQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDMUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQU0sSUFBSSxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDbkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ1osRUFBRSxDQUFBLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQ2hCLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2xCLENBQUM7b0JBQUEsSUFBSSxDQUFBLENBQUM7d0JBQ0YsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDbkIsQ0FBQztvQkFFRCxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO3dCQUNQLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLENBQUMsY0FBYzt3QkFDakQsU0FBUyxDQUFDLFVBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFDRixLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLFFBQVE7d0JBQzNDLFdBQVcsQ0FBQyxVQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBSUwsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBTSxNQUFNLEdBQXNCLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQy9CLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQWxDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQU0sRUFBRSxDQUFDLEVBQUU7d0JBQXRCLENBQUM7YUFrQ1Q7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFyREQsNEJBcURDO0FBRUQsbUJBQTBCLE1BQU07SUFDNUIsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7UUFDaEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBTSxHQUFHLEdBQUcscURBQXFELENBQUM7UUFDbEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUVyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztRQUVyRyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF2QkQsOEJBdUJDO0FBRUQscUJBQTRCLE1BQU07SUFDOUIsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7UUFDaEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBTSxHQUFHLEdBQUcsdURBQXVELENBQUM7UUFDcEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUVyQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztRQUVyRyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRCxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF2QkQsa0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEJyb3dzZVZpZXdNb2RlbCB9IGZyb20gXCIuL2Jyb3dzZS12aWV3LW1vZGVsXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEJyb3dzZVZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWQoYXJncykge1xyXG4gICAgcHV0Q2x1YnMoYXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXRDbHVicyhhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNsdWJDb250YWluZXJcIik7XHJcbiAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0Y2x1YnMucGhwXCI7XHJcbiAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCk7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIiwgXCJHRVQsIFBPU1QsIE9QVElPTlNcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XHJcbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBqc29uZGF0YS5uYW1lLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2tMYXlvdXQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICBkZXNjLmNsYXNzTmFtZSA9IFwiZGVzY1wiO1xyXG4gICAgICAgICAgICAgICAgZGVzYy50ZXh0V3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0ID0ganNvbmRhdGEubmFtZVtpXTtcclxuICAgICAgICAgICAgICAgIGRlc2MudGV4dCA9IGpzb25kYXRhLmRlc2NbaV07XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZCh0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5hZGRDaGlsZChkZXNjKTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXBwZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN0YWNrLm9uKFwidGFwXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0YXBwZWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRhcHBlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLmJhY2tncm91bmRDb2xvciA9IFwiIzQ4ZjQ0MlwiOyAvLyBsaWdodCBncmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmUoanNvbmRhdGEuaWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkZGRkZcIjsgLy8gd2hpdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoanNvbmRhdGEuaWRbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IDxBY3Rpdml0eUluZGljYXRvcj5wYWdlLmdldFZpZXdCeUlkKFwiYWN0aXZpdHlJbmRpY2F0b3JcIik7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUudmlzaWJpbGl0eSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChzdGFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeG1saHR0cC5zZW5kKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoY2x1YmlkKSB7IC8vIHVuZmluaXNoZWRcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeSh7dWlkOiB1c2VyLnVpZCwgY2x1YmlkOiBjbHViaWR9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vc3Vic2NyaWJlLnBocFwiO1xyXG4gICAgICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XHJcblxyXG4gICAgICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2JqID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICAgICB4bWxodHRwLnNlbmQocmVxdWVzdCk7XHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5zdWJzY3JpYmUoY2x1YmlkKSB7IC8vIHVuZmluaXNoZWRcclxuICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeSh7dWlkOiB1c2VyLnVpZCwgY2x1YmlkOiBjbHViaWR9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vdW5zdWJzY3JpYmUucGhwXCI7XHJcbiAgICAgICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCk7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIiwgXCJHRVQsIFBPU1QsIE9QVElPTlNcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIiwgXCJYLVJlcXVlc3RlZC1XaXRoLCBhY2NlcHQsIGNvbnRlbnQtdHlwZVwiKTtcclxuXHJcbiAgICAgICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvYmogPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiJdfQ==