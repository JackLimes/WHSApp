"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("tns-core-modules/ui/button");
var label_1 = require("tns-core-modules/ui/label");
var dialogs = require("ui/dialogs");
var frame_1 = require("ui/frame");
var home_view_model_1 = require("./home-view-model");
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
    page.bindingContext = new home_view_model_1.HomeViewModel();
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
function datass(args) {
    var stack = frame_1.topmost().getViewById("slayout");
    var btn = new button_1.Button();
    btn.on(button_1.Button.tapEvent, doubledildo);
    btn.text = "ohai";
    stack.addChild(btn);
}
exports.datass = datass;
function doubledildo(args) {
    var stack = frame_1.topmost().getViewById("slayout");
    var d = new Date();
    for (var i = 0; i < 7; i++) {
        var lbl = new label_1.Label();
        lbl.className = "date";
        lbl.text = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        d.setDate(d.getDate() + 1);
        stack.addChild(lbl);
    }
}
exports.doubledildo = doubledildo;
function sqltest(args) {
    var url = "http://24.217.249.216/phpfiles/nsparseq.php";
    var request = JSON.stringify({ indat: "anime club" });
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // var jsondata = JSON.parse(this.responseText);
            var lbl = new label_1.Label();
            var stack = frame_1.topmost().getViewById("slayout");
            lbl.textWrap = true;
            lbl.text = JSON.parse(this.responseText);
            stack.addChild(lbl);
        }
    };
    xmlhttp.send(request);
}
exports.sqltest = sqltest;
function loadAnn(args) {
    var stack = frame_1.topmost().getViewById("slayout");
    var url = "http://24.217.249.216/phpfiles/getann.php";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var resobj_1 = JSON.parse(this.responseText);
            var count = resobj_1.title.length;
            var btn = void 0;
            var _loop_1 = function (i) {
                btn = new button_1.Button();
                btn.text = resobj_1.title[i];
                btn.on(button_1.Button.tapEvent, function () {
                    dialogs.alert({
                        title: resobj_1.club[i],
                        message: resobj_1.desc[i],
                        okButtonText: "Close"
                    });
                });
                stack.addChild(btn);
            };
            for (var i = 0; i < count; i++) {
                _loop_1(i);
            }
        }
    };
    xmlhttp.send();
}
exports.loadAnn = loadAnn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EscURBQW9EO0FBQ3BELG1EQUFrRDtBQUVsRCxvQ0FBc0M7QUFDdEMsa0NBQW1DO0FBRW5DLHFEQUFrRDtBQUVsRDs7OERBRThEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFaRCx3Q0FZQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRCxnQkFBdUIsSUFBZTtJQUNsQyxJQUFNLEtBQUssR0FBZ0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELElBQU0sR0FBRyxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDekIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ2xCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQU5ELHdCQU1DO0FBRUQscUJBQTRCLElBQWU7SUFDdkMsSUFBTSxLQUFLLEdBQWdCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFT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SUFDTCxDQUFDLENBQUM7SUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQWhDRCwwQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgSG9tZVZpZXdNb2RlbCB9IGZyb20gXCIuL2hvbWUtdmlldy1tb2RlbFwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSG9tZVZpZXdNb2RlbCgpO1xufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0YXNzKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNsYXlvdXRcIik7XG4gICAgY29uc3QgYnRuID0gbmV3IEJ1dHRvbigpO1xuICAgIGJ0bi5vbihCdXR0b24udGFwRXZlbnQsIGRvdWJsZWRpbGRvKTtcbiAgICBidG4udGV4dCA9IFwib2hhaVwiO1xuICAgIHN0YWNrLmFkZENoaWxkKGJ0bik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb3VibGVkaWxkbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xuICAgICAgICBsYmwuY2xhc3NOYW1lID0gXCJkYXRlXCI7XG4gICAgICAgIGxibC50ZXh0ID0gKGQuZ2V0TW9udGgoKSArIDEpICsgXCIvXCIgKyBkLmdldERhdGUoKSArIFwiL1wiICsgZC5nZXRGdWxsWWVhcigpO1xuICAgICAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgc3RhY2suYWRkQ2hpbGQobGJsKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcWx0ZXN0KGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHVybCA9IFwiaHR0cDovLzI0LjIxNy4yNDkuMjE2L3BocGZpbGVzL25zcGFyc2VxLnBocFwiO1xuICAgIGNvbnN0IHJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeSh7aW5kYXQ6IFwiYW5pbWUgY2x1YlwifSk7XG4gICAgY29uc3QgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeG1saHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsIFwiR0VULCBQT1NULCBPUFRJT05TXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJDb250ZW50LVR5cGVcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aCwgYWNjZXB0LCBjb250ZW50LXR5cGVcIik7XG5cbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIC8vIHZhciBqc29uZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc3QgbGJsID0gbmV3IExhYmVsKCk7XG4gICAgICAgICAgICBjb25zdCBzdGFjayA9IDxTdGFja0xheW91dD50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzbGF5b3V0XCIpO1xuICAgICAgICAgICAgbGJsLnRleHRXcmFwID0gdHJ1ZTtcbiAgICAgICAgICAgIGxibC50ZXh0ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBzdGFjay5hZGRDaGlsZChsYmwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4bWxodHRwLnNlbmQocmVxdWVzdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQW5uKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHN0YWNrID0gPFN0YWNrTGF5b3V0PnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNsYXlvdXRcIik7XG4gICAgY29uc3QgdXJsID0gXCJodHRwOi8vMjQuMjE3LjI0OS4yMTYvcGhwZmlsZXMvZ2V0YW5uLnBocFwiO1xuICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XG4gICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcbiAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xuICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xuXG4gICAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNvYmogPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcmVzb2JqLnRpdGxlLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBidG47XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBidG4gPSBuZXcgQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgYnRuLnRleHQgPSByZXNvYmoudGl0bGVbaV07XG4gICAgICAgICAgICAgICAgYnRuLm9uKEJ1dHRvbi50YXBFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXNvYmouY2x1YltpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc29iai5kZXNjW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhY2suYWRkQ2hpbGQoYnRuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgeG1saHR0cC5zZW5kKCk7XG59XG4iXX0=