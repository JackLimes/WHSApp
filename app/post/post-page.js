"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var frame_1 = require("ui/frame");
var post_view_model_1 = require("./post-view-model");
var http = require("http");
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
    page.bindingContext = new post_view_model_1.PostViewModel();
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
function postAnn() {
    var url = "https://fzwestboard.000webhostapp.com/postann.php";
    var xmlhttp = new XMLHttpRequest();
    var title = frame_1.topmost().getViewById("title");
    var desc = frame_1.topmost().getViewById("desc");
    var btn = frame_1.topmost().getViewById("butt");
    var stack = frame_1.topmost().getViewById("mainStack");
    var datePicker = frame_1.topmost().getViewById("date");
    var fDate = datePicker.year + "-" + datePicker.month + "-" + datePicker.day;
    var lPicker = frame_1.topmost().getViewById("listPicker");
    var hexColor = colorarr[lPicker.selectedIndex];
    if (title.text === "" || desc.text === "") {
        alert("You do not have both Field filled out.");
        return;
    }
    if (lPicker.items.length === 0) {
        alert("You do not have access to any clubs to post from");
        return;
    }
    // Create object to pass to php
    // tslint:disable-next-line:max-line-length
    var request = JSON.stringify({ title: title.text, club: clubarr[lPicker.selectedIndex], description: desc.text, birth: fDate, color: hexColor, clubid: clubidarr[lPicker.selectedIndex] });
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsondata = JSON.parse(this.responseText);
            title.text = "";
            desc.text = "";
            alert(jsondata);
        }
    };
    xmlhttp.send(request);
}
exports.postAnn = postAnn;
function onLoad(args) {
    var page = args.object;
    // set date picker settings.
    var datePicker = page.getViewById("date");
    var today = new Date();
    datePicker.date = today;
    datePicker.minDate = today;
    getClubs(args);
    var lPicker = page.getViewById("listPicker");
    console.log(lPicker.selectedIndex);
}
exports.onLoad = onLoad;
// club name and color array intialize
var clubarr;
var colorarr;
var clubidarr;
function getClubs(args) {
    var page = args.object;
    firebase.getCurrentUser().then(function (user) {
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getadminclubs.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then(function (result) {
            var jsondata = JSON.parse(result.content);
            clubarr = jsondata.name;
            colorarr = jsondata.color;
            clubidarr = jsondata.id;
            var lPicker = page.getViewById("listPicker");
            lPicker.items = clubarr;
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.getClubs = getClubs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdURBQTBEO0FBUzFELGtDQUFtQztBQUluQyxxREFBa0Q7QUFFbEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCOzs4REFFOEQ7QUFFOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwrQkFBYSxFQUFFLENBQUM7QUFDOUMsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVEO0lBQ0ksSUFBTSxHQUFHLEdBQUcsbURBQW1ELENBQUM7SUFDaEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUVyQyxJQUFNLEtBQUssR0FBYyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsSUFBTSxJQUFJLEdBQWEsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELElBQU0sR0FBRyxHQUFXLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxJQUFNLEtBQUssR0FBZ0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlE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QyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQUUsVUFBQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFyQkQsNEJBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ1aS9saXN0LXBpY2tlclwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IFBvc3RWaWV3TW9kZWwgfSBmcm9tIFwiLi9wb3N0LXZpZXctbW9kZWxcIjtcclxuXHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IFBvc3RWaWV3TW9kZWwoKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9zdEFubigpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9wb3N0YW5uLnBocFwiO1xyXG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gPFRleHRGaWVsZD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJ0aXRsZVwiKTtcclxuICAgIGNvbnN0IGRlc2MgPSA8VGV4dFZpZXc+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGVzY1wiKTtcclxuICAgIGNvbnN0IGJ0biA9IDxCdXR0b24+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiYnV0dFwiKTtcclxuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcIm1haW5TdGFja1wiKTtcclxuICAgIGNvbnN0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJkYXRlXCIpO1xyXG4gICAgY29uc3QgZkRhdGUgPSBkYXRlUGlja2VyLnllYXIgKyBcIi1cIiArIGRhdGVQaWNrZXIubW9udGggKyBcIi1cIiArIGRhdGVQaWNrZXIuZGF5O1xyXG4gICAgY29uc3QgbFBpY2tlciA9IDxMaXN0UGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XHJcbiAgICBjb25zdCBoZXhDb2xvciA9IGNvbG9yYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF07XHJcbiAgICBpZiAodGl0bGUudGV4dCA9PT0gXCJcIiB8fCBkZXNjLnRleHQgPT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIllvdSBkbyBub3QgaGF2ZSBib3RoIEZpZWxkIGZpbGxlZCBvdXQuXCIpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxQaWNrZXIuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJZb3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIGFueSBjbHVicyB0byBwb3N0IGZyb21cIik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgb2JqZWN0IHRvIHBhc3MgdG8gcGhwXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3RpdGxlOiB0aXRsZS50ZXh0LCBjbHViOiBjbHViYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF0sIGRlc2NyaXB0aW9uOiBkZXNjLnRleHQsIGJpcnRoOiBmRGF0ZSwgY29sb3I6IGhleENvbG9yLCBjbHViaWQ6IGNsdWJpZGFycltsUGlja2VyLnNlbGVjdGVkSW5kZXhdfSk7XHJcblxyXG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG5cclxuICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25kYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHRpdGxlLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBkZXNjLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBhbGVydChqc29uZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZChhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICAvLyBzZXQgZGF0ZSBwaWNrZXIgc2V0dGluZ3MuXHJcbiAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+cGFnZS5nZXRWaWV3QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBkYXRlUGlja2VyLmRhdGUgPSB0b2RheTtcclxuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IHRvZGF5O1xyXG4gICAgZ2V0Q2x1YnMoYXJncyk7XHJcbiAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+cGFnZS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XHJcbiAgICBjb25zb2xlLmxvZyhsUGlja2VyLnNlbGVjdGVkSW5kZXgpO1xyXG59XHJcblxyXG4vLyBjbHViIG5hbWUgYW5kIGNvbG9yIGFycmF5IGludGlhbGl6ZVxyXG5sZXQgY2x1YmFycjtcclxubGV0IGNvbG9yYXJyO1xyXG5sZXQgY2x1YmlkYXJyO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2x1YnMoYXJncykge1xyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaHR0cC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0YWRtaW5jbHVicy5waHBcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QganNvbmRhdGEgPSBKU09OLnBhcnNlKHJlc3VsdC5jb250ZW50KTtcclxuICAgICAgICAgICAgY2x1YmFyciA9IGpzb25kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIGNvbG9yYXJyID0ganNvbmRhdGEuY29sb3I7XHJcbiAgICAgICAgICAgIGNsdWJpZGFyciA9IGpzb25kYXRhLmlkO1xyXG4gICAgICAgICAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+cGFnZS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XHJcbiAgICAgICAgICAgIGxQaWNrZXIuaXRlbXMgPSBjbHViYXJyO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcbiJdfQ==