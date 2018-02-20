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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdURBQTBEO0FBUzFELGtDQUFtQztBQUluQyxxREFBa0Q7QUFFbEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCOzs4REFFOEQ7QUFFOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwrQkFBYSxFQUFFLENBQUM7QUFDOUMsQ0FBQztBQVpELHdDQVlDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVEO0lBQ0ksSUFBTSxHQUFHLEdBQUcsbURBQW1ELENBQUM7SUFDaEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUVyQyxJQUFNLEtBQUssR0FBYyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsSUFBTSxJQUFJLEdBQWEsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELElBQU0sR0FBRyxHQUFXLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxJQUFNLEtBQUssR0FBZ0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlE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LEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsR0FBRyxFQUFFLHlEQUF5RDtZQUM5RCxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTtZQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDWCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN4QixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxQixTQUFTLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFNLE9BQU8sR0FBZSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUMsRUFBRSxVQUFDLEtBQUs7WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxVQUFDLEtBQUs7UUFDTCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXJCRCw0QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgVGV4dFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInVpL2xpc3QtcGlja2VyXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgUG9zdFZpZXdNb2RlbCB9IGZyb20gXCIuL3Bvc3Qtdmlldy1tb2RlbFwiO1xyXG5cclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgUG9zdFZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3N0QW5uKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL3Bvc3Rhbm4ucGhwXCI7XHJcbiAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSA8VGV4dEZpZWxkPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInRpdGxlXCIpO1xyXG4gICAgY29uc3QgZGVzYyA9IDxUZXh0Vmlldz50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJkZXNjXCIpO1xyXG4gICAgY29uc3QgYnRuID0gPEJ1dHRvbj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJidXR0XCIpO1xyXG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibWFpblN0YWNrXCIpO1xyXG4gICAgY29uc3QgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCBmRGF0ZSA9IGRhdGVQaWNrZXIueWVhciArIFwiLVwiICsgZGF0ZVBpY2tlci5tb250aCArIFwiLVwiICsgZGF0ZVBpY2tlci5kYXk7XHJcbiAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibGlzdFBpY2tlclwiKTtcclxuICAgIGNvbnN0IGhleENvbG9yID0gY29sb3JhcnJbbFBpY2tlci5zZWxlY3RlZEluZGV4XTtcclxuICAgIGlmICh0aXRsZS50ZXh0ID09PSBcIlwiIHx8IGRlc2MudGV4dCA9PT0gXCJcIikge1xyXG4gICAgICAgIGFsZXJ0KFwiWW91IGRvIG5vdCBoYXZlIGJvdGggRmllbGQgZmlsbGVkIG91dC5cIik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgb2JqZWN0IHRvIHBhc3MgdG8gcGhwXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3RpdGxlOiB0aXRsZS50ZXh0LCBjbHViOiBjbHViYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF0sIGRlc2NyaXB0aW9uOiBkZXNjLnRleHQsIGJpcnRoOiBmRGF0ZSwgY29sb3I6IGhleENvbG9yLCBjbHViaWQ6IGNsdWJpZGFycltsUGlja2VyLnNlbGVjdGVkSW5kZXhdfSk7XHJcblxyXG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG5cclxuICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25kYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHRpdGxlLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBkZXNjLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBhbGVydChqc29uZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZChhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICAvLyBzZXQgZGF0ZSBwaWNrZXIgc2V0dGluZ3MuXHJcbiAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+cGFnZS5nZXRWaWV3QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBkYXRlUGlja2VyLmRhdGUgPSB0b2RheTtcclxuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IHRvZGF5O1xyXG4gICAgZ2V0Q2x1YnMoYXJncyk7XHJcbn1cclxuXHJcbi8vIGNsdWIgbmFtZSBhbmQgY29sb3IgYXJyYXkgaW50aWFsaXplXHJcbmxldCBjbHViYXJyO1xyXG5sZXQgY29sb3JhcnI7XHJcbmxldCBjbHViaWRhcnI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbHVicyhhcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9nZXRhZG1pbmNsdWJzLnBocFwiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHsgdWlkOiB1c2VyLnVpZCB9KVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UocmVzdWx0LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICBjbHViYXJyID0ganNvbmRhdGEubmFtZTtcclxuICAgICAgICAgICAgY29sb3JhcnIgPSBqc29uZGF0YS5jb2xvcjtcclxuICAgICAgICAgICAgY2x1YmlkYXJyID0ganNvbmRhdGEuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxQaWNrZXIgPSA8TGlzdFBpY2tlcj5wYWdlLmdldFZpZXdCeUlkKFwibGlzdFBpY2tlclwiKTtcclxuICAgICAgICAgICAgbFBpY2tlci5pdGVtcyA9IGNsdWJhcnI7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGFsZXJ0KFwiRkIgRVJST1I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuIl19