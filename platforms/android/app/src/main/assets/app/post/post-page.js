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
    var club = frame_1.topmost().getViewById("club");
    var desc = frame_1.topmost().getViewById("desc");
    var btn = frame_1.topmost().getViewById("butt");
    var stack = frame_1.topmost().getViewById("mainStack");
    var datePicker = frame_1.topmost().getViewById("date");
    var formattedDate = datePicker.year + "-" + datePicker.month + "-" + datePicker.day;
    // Create object to pass to php
    var request = JSON.stringify({ title: title.text, club: club.text, description: desc.text, birth: formattedDate });
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
            club.text = "";
            desc.text = "";
            alert(jsondata);
        }
    };
    xmlhttp.send(request);
}
exports.postAnn = postAnn;
function dateTest() {
    var datePicker = frame_1.topmost().getViewById("date");
    alert(datePicker.year + "-" + datePicker.month + "-" + datePicker.day);
}
exports.dateTest = dateTest;
function onNavigatedTo() {
    var datePicker = frame_1.topmost().getViewById("date");
    var today = new Date();
    datePicker.date = today;
    datePicker.minDate = today;
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0Esa0NBQW1DO0FBR25DLHFEQUFrRDtBQUVsRDs7OERBRThEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFaRCx3Q0FZQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLElBQU0sR0FBRyxHQUFHLDRDQUE0QyxDQUFDO0lBQ3pELElBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFFckMsSUFBTSxLQUFLLEdBQWMsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELElBQU0sSUFBSSxHQUFjLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxJQUFNLElBQUksR0FBYSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsSUFBTSxHQUFHLEdBQVcsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELElBQU0sS0FBSyxHQUFnQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUQsSUFBTSxVQUFVLEdBQWUsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFFdEYsK0JBQStCO0lBQy9CLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztJQUVuSCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7SUFDNUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9FLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUVyRyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9DLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWhDRCwwQkFnQ0M7QUFFRDtJQUNJLElBQU0sVUFBVSxHQUFlLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFIRCw0QkFHQztBQUVEO0lBQ0ksSUFBTSxVQUFVLEdBQWUsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELElBQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDekIsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDeEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDL0IsQ0FBQztBQUxELHNDQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlclwiO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgVGV4dFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBQb3N0Vmlld01vZGVsIH0gZnJvbSBcIi4vcG9zdC12aWV3LW1vZGVsXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBpZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBQb3N0Vmlld01vZGVsKCk7XG59XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0QW5uKCkge1xuICAgIGNvbnN0IHVybCA9IFwiaHR0cDovLzI0LjIxNy4yNDkuMjE2L3BocGZpbGVzL3Bvc3Rhbm4ucGhwXCI7XG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgY29uc3QgdGl0bGUgPSA8VGV4dEZpZWxkPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInRpdGxlXCIpO1xuICAgIGNvbnN0IGNsdWIgPSA8VGV4dEZpZWxkPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImNsdWJcIik7XG4gICAgY29uc3QgZGVzYyA9IDxUZXh0Vmlldz50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJkZXNjXCIpO1xuICAgIGNvbnN0IGJ0biA9IDxCdXR0b24+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiYnV0dFwiKTtcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJtYWluU3RhY2tcIik7XG4gICAgY29uc3QgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRhdGVcIik7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGVQaWNrZXIueWVhciArIFwiLVwiICsgZGF0ZVBpY2tlci5tb250aCArIFwiLVwiICsgZGF0ZVBpY2tlci5kYXk7XG5cbiAgICAvLyBDcmVhdGUgb2JqZWN0IHRvIHBhc3MgdG8gcGhwXG4gICAgY29uc3QgcmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KHt0aXRsZTogdGl0bGUudGV4dCwgY2x1YjogY2x1Yi50ZXh0LCBkZXNjcmlwdGlvbjogZGVzYy50ZXh0LCBiaXJ0aDogZm9ybWF0dGVkRGF0ZX0pO1xuXG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XG5cbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25kYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB0aXRsZS50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIGNsdWIudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBkZXNjLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgYWxlcnQoanNvbmRhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4bWxodHRwLnNlbmQocmVxdWVzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRlVGVzdCgpIHtcbiAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGF0ZVwiKTtcbiAgICBhbGVydChkYXRlUGlja2VyLnllYXIgKyBcIi1cIiArIGRhdGVQaWNrZXIubW9udGggKyBcIi1cIiArIGRhdGVQaWNrZXIuZGF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVkVG8oKSB7XG4gICAgY29uc3QgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRhdGVcIik7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGVQaWNrZXIuZGF0ZSA9IHRvZGF5O1xuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IHRvZGF5O1xufVxuIl19