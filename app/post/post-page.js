"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var post_view_model_1 = require("./post-view-model");
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
function onNavigatedTo() {
    // set date picker settings.
    var datePicker = frame_1.topmost().getViewById("date");
    var today = new Date();
    datePicker.date = today;
    datePicker.minDate = today;
    getClubs();
}
exports.onNavigatedTo = onNavigatedTo;
// club name and color array intialize
var clubarr;
var colorarr;
var clubidarr;
function getClubs() {
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
            var jsondata = JSON.parse(this.responseText);
            clubarr = jsondata.name;
            colorarr = jsondata.color;
            clubidarr = jsondata.id;
            var lPicker = frame_1.topmost().getViewById("listPicker");
            lPicker.items = clubarr;
        }
    };
    xmlhttp.send();
}
exports.getClubs = getClubs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsa0NBQW1DO0FBSW5DLHFEQUFrRDtBQUVsRDs7OERBRThEO0FBRTlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFaRCx3Q0FZQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLElBQU0sR0FBRyxHQUFHLG1EQUFtRCxDQUFDO0lBQ2hFLElBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFFckMsSUFBTSxLQUFLLEdBQWMsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELElBQU0sSUFBSSxHQUFhLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxJQUFNLEdBQUcsR0FBVyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxJQUFNLFVBQVUsR0FBZSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFD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RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7SUFDckcsT0FBTyxDQUFDLGtCQUFrQixHQUFHO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN4QixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxQixTQUFTLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFNLE9BQU8sR0FBZSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEUsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBcEJELDRCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ1aS9saXN0LXBpY2tlclwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IFBvc3RWaWV3TW9kZWwgfSBmcm9tIFwiLi9wb3N0LXZpZXctbW9kZWxcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IFBvc3RWaWV3TW9kZWwoKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9zdEFubigpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9wb3N0YW5uLnBocFwiO1xyXG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gPFRleHRGaWVsZD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJ0aXRsZVwiKTtcclxuICAgIGNvbnN0IGRlc2MgPSA8VGV4dFZpZXc+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGVzY1wiKTtcclxuICAgIGNvbnN0IGJ0biA9IDxCdXR0b24+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiYnV0dFwiKTtcclxuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcIm1haW5TdGFja1wiKTtcclxuICAgIGNvbnN0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJkYXRlXCIpO1xyXG4gICAgY29uc3QgZkRhdGUgPSBkYXRlUGlja2VyLnllYXIgKyBcIi1cIiArIGRhdGVQaWNrZXIubW9udGggKyBcIi1cIiArIGRhdGVQaWNrZXIuZGF5O1xyXG4gICAgY29uc3QgbFBpY2tlciA9IDxMaXN0UGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XHJcbiAgICBjb25zdCBoZXhDb2xvciA9IGNvbG9yYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF07XHJcblxyXG4gICAgLy8gQ3JlYXRlIG9iamVjdCB0byBwYXNzIHRvIHBocFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgcmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KHt0aXRsZTogdGl0bGUudGV4dCwgY2x1YjogY2x1YmFycltsUGlja2VyLnNlbGVjdGVkSW5kZXhdLCBkZXNjcmlwdGlvbjogZGVzYy50ZXh0LCBiaXJ0aDogZkRhdGUsIGNvbG9yOiBoZXhDb2xvciwgY2x1YmlkOiBjbHViaWRhcnJbbFBpY2tlci5zZWxlY3RlZEluZGV4XX0pO1xyXG5cclxuICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIiwgXCJYLVJlcXVlc3RlZC1XaXRoLCBhY2NlcHQsIGNvbnRlbnQtdHlwZVwiKTtcclxuXHJcbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB0aXRsZS50ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgZGVzYy50ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgYWxlcnQoanNvbmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4bWxodHRwLnNlbmQocmVxdWVzdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRlZFRvKCkge1xyXG4gICAgLy8gc2V0IGRhdGUgcGlja2VyIHNldHRpbmdzLlxyXG4gICAgY29uc3QgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBkYXRlUGlja2VyLmRhdGUgPSB0b2RheTtcclxuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IHRvZGF5O1xyXG4gICAgZ2V0Q2x1YnMoKTtcclxufVxyXG5cclxuLy8gY2x1YiBuYW1lIGFuZCBjb2xvciBhcnJheSBpbnRpYWxpemVcclxubGV0IGNsdWJhcnI7XHJcbmxldCBjb2xvcmFycjtcclxubGV0IGNsdWJpZGFycjtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENsdWJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCJodHRwczovL2Z6d2VzdGJvYXJkLjAwMHdlYmhvc3RhcHAuY29tL2dldGNsdWJzLnBocFwiO1xyXG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xyXG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG4gICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgY29uc3QganNvbmRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY2x1YmFyciA9IGpzb25kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIGNvbG9yYXJyID0ganNvbmRhdGEuY29sb3I7XHJcbiAgICAgICAgICAgIGNsdWJpZGFyciA9IGpzb25kYXRhLmlkO1xyXG4gICAgICAgICAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibGlzdFBpY2tlclwiKTtcclxuICAgICAgICAgICAgbFBpY2tlci5pdGVtcyA9IGNsdWJhcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhtbGh0dHAuc2VuZCgpO1xyXG59XHJcbiJdfQ==