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
    var url = "http://24.217.249.216/phpfiles/postann.php";
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
    var url = "http://24.217.249.216/phpfiles/getclubs.php";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsa0NBQW1DO0FBSW5DLHFEQUFrRDtBQUVsRDs7OERBRThEO0FBRTlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFaRCx3Q0FZQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLElBQU0sR0FBRyxHQUFHLDRDQUE0QyxDQUFDO0lBQ3pELElBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFFckMsSUFBTSxLQUFLLEdBQWMsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELElBQU0sSUFBSSxHQUFhLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxJQUFNLEdBQUcsR0FBVyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxJQUFNLFVBQVUsR0FBZSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFD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RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGdDQUFnQyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7SUFDckcsT0FBTyxDQUFDLGtCQUFrQixHQUFHO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN4QixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMxQixTQUFTLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFNLE9BQU8sR0FBZSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEUsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBcEJELDRCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCI7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInVpL2xpc3QtcGlja2VyXCI7XG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHsgUG9zdFZpZXdNb2RlbCB9IGZyb20gXCIuL3Bvc3Qtdmlldy1tb2RlbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBQb3N0Vmlld01vZGVsKCk7XG59XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0QW5uKCkge1xuICAgIGNvbnN0IHVybCA9IFwiaHR0cDovLzI0LjIxNy4yNDkuMjE2L3BocGZpbGVzL3Bvc3Rhbm4ucGhwXCI7XG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgY29uc3QgdGl0bGUgPSA8VGV4dEZpZWxkPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInRpdGxlXCIpO1xuICAgIGNvbnN0IGRlc2MgPSA8VGV4dFZpZXc+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGVzY1wiKTtcbiAgICBjb25zdCBidG4gPSA8QnV0dG9uPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImJ1dHRcIik7XG4gICAgY29uc3Qgc3RhY2sgPSA8U3RhY2tMYXlvdXQ+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibWFpblN0YWNrXCIpO1xuICAgIGNvbnN0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJkYXRlXCIpO1xuICAgIGNvbnN0IGZEYXRlID0gZGF0ZVBpY2tlci55ZWFyICsgXCItXCIgKyBkYXRlUGlja2VyLm1vbnRoICsgXCItXCIgKyBkYXRlUGlja2VyLmRheTtcbiAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibGlzdFBpY2tlclwiKTtcbiAgICBjb25zdCBoZXhDb2xvciA9IGNvbG9yYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF07XG5cbiAgICAvLyBDcmVhdGUgb2JqZWN0IHRvIHBhc3MgdG8gcGhwXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGNvbnN0IHJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeSh7dGl0bGU6IHRpdGxlLnRleHQsIGNsdWI6IGNsdWJhcnJbbFBpY2tlci5zZWxlY3RlZEluZGV4XSwgZGVzY3JpcHRpb246IGRlc2MudGV4dCwgYmlydGg6IGZEYXRlLCBjb2xvcjogaGV4Q29sb3IsIGNsdWJpZDogY2x1YmlkYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF19KTtcblxuICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xuXG4gICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgdGl0bGUudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBkZXNjLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgYWxlcnQoanNvbmRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4bWxodHRwLnNlbmQocmVxdWVzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRlZFRvKCkge1xuICAgIC8vIHNldCBkYXRlIHBpY2tlciBzZXR0aW5ncy5cbiAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGF0ZVwiKTtcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgZGF0ZVBpY2tlci5kYXRlID0gdG9kYXk7XG4gICAgZGF0ZVBpY2tlci5taW5EYXRlID0gdG9kYXk7XG4gICAgZ2V0Q2x1YnMoKTtcbn1cblxuLy8gY2x1YiBuYW1lIGFuZCBjb2xvciBhcnJheSBpbnRpYWxpemVcbmxldCBjbHViYXJyO1xubGV0IGNvbG9yYXJyO1xubGV0IGNsdWJpZGFycjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbHVicygpIHtcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly8yNC4yMTcuMjQ5LjIxNi9waHBmaWxlcy9nZXRjbHVicy5waHBcIjtcbiAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XG4gICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2x1YmFyciA9IGpzb25kYXRhLm5hbWU7XG4gICAgICAgICAgICBjb2xvcmFyciA9IGpzb25kYXRhLmNvbG9yO1xuICAgICAgICAgICAgY2x1YmlkYXJyID0ganNvbmRhdGEuaWQ7XG4gICAgICAgICAgICBjb25zdCBsUGlja2VyID0gPExpc3RQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwibGlzdFBpY2tlclwiKTtcbiAgICAgICAgICAgIGxQaWNrZXIuaXRlbXMgPSBjbHViYXJyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4bWxodHRwLnNlbmQoKTtcbn1cbiJdfQ==