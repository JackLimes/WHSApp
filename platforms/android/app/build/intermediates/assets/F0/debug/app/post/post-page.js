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
    var request = JSON.stringify({ title: title.text, club: clubarr[lPicker.selectedIndex], description: desc.text, birth: fDate, color: hexColor });
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
            var lPicker = frame_1.topmost().getViewById("listPicker");
            lPicker.items = clubarr;
        }
    };
    xmlhttp.send();
}
exports.getClubs = getClubs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsa0NBQW1DO0FBSW5DLHFEQUFrRDtBQUVsRDs7OERBRThEO0FBRTlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFaRCx3Q0FZQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLElBQU0sR0FBRyxHQUFHLDRDQUE0QyxDQUFDO0lBQ3pELElBQU0sT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFFckMsSUFBTSxLQUFLLEdBQWMsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELElBQU0sSUFBSSxHQUFhLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxJQUFNLEdBQUcsR0FBVyxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RCxJQUFNLFVBQVUsR0FBZSxlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFD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QyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3JHLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDeEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBTSxPQUFPLEdBQWUsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDLENBQUM7SUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQW5CRCw0QkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCI7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCI7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ1aS9saXN0LXBpY2tlclwiO1xuaW1wb3J0IHsgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7IFBvc3RWaWV3TW9kZWwgfSBmcm9tIFwiLi9wb3N0LXZpZXctbW9kZWxcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgUG9zdFZpZXdNb2RlbCgpO1xufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdEFubigpIHtcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly8yNC4yMTcuMjQ5LjIxNi9waHBmaWxlcy9wb3N0YW5uLnBocFwiO1xuICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIGNvbnN0IHRpdGxlID0gPFRleHRGaWVsZD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJ0aXRsZVwiKTtcbiAgICBjb25zdCBkZXNjID0gPFRleHRWaWV3PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRlc2NcIik7XG4gICAgY29uc3QgYnRuID0gPEJ1dHRvbj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJidXR0XCIpO1xuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcIm1haW5TdGFja1wiKTtcbiAgICBjb25zdCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwiZGF0ZVwiKTtcbiAgICBjb25zdCBmRGF0ZSA9IGRhdGVQaWNrZXIueWVhciArIFwiLVwiICsgZGF0ZVBpY2tlci5tb250aCArIFwiLVwiICsgZGF0ZVBpY2tlci5kYXk7XG4gICAgY29uc3QgbFBpY2tlciA9IDxMaXN0UGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XG4gICAgY29uc3QgaGV4Q29sb3IgPSBjb2xvcmFycltsUGlja2VyLnNlbGVjdGVkSW5kZXhdO1xuXG4gICAgLy8gQ3JlYXRlIG9iamVjdCB0byBwYXNzIHRvIHBocFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3RpdGxlOiB0aXRsZS50ZXh0LCBjbHViOiBjbHViYXJyW2xQaWNrZXIuc2VsZWN0ZWRJbmRleF0sIGRlc2NyaXB0aW9uOiBkZXNjLnRleHQsIGJpcnRoOiBmRGF0ZSwgY29sb3I6IGhleENvbG9yfSk7XG5cbiAgICB4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCk7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIiwgXCJHRVQsIFBPU1QsIE9QVElPTlNcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiLCBcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIiwgXCJYLVJlcXVlc3RlZC1XaXRoLCBhY2NlcHQsIGNvbnRlbnQtdHlwZVwiKTtcblxuICAgIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgY29uc3QganNvbmRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIHRpdGxlLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgZGVzYy50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIGFsZXJ0KGpzb25kYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeG1saHR0cC5zZW5kKHJlcXVlc3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbygpIHtcbiAgICAvLyBzZXQgZGF0ZSBwaWNrZXIgc2V0dGluZ3MuXG4gICAgY29uc3QgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImRhdGVcIik7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGVQaWNrZXIuZGF0ZSA9IHRvZGF5O1xuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IHRvZGF5O1xuICAgIGdldENsdWJzKCk7XG59XG5cbi8vIGNsdWIgbmFtZSBhbmQgY29sb3IgYXJyYXkgaW50aWFsaXplXG5sZXQgY2x1YmFycjtcbmxldCBjb2xvcmFycjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbHVicygpIHtcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly8yNC4yMTcuMjQ5LjIxNi9waHBmaWxlcy9nZXRjbHVicy5waHBcIjtcbiAgICBjb25zdCB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XG4gICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2x1YmFyciA9IGpzb25kYXRhLm5hbWU7XG4gICAgICAgICAgICBjb2xvcmFyciA9IGpzb25kYXRhLmNvbG9yO1xuICAgICAgICAgICAgY29uc3QgbFBpY2tlciA9IDxMaXN0UGlja2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImxpc3RQaWNrZXJcIik7XG4gICAgICAgICAgICBsUGlja2VyLml0ZW1zID0gY2x1YmFycjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeG1saHR0cC5zZW5kKCk7XG59XG4iXX0=