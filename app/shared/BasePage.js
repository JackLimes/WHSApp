"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var page;
var drawer;
var BasePage = (function () {
    function BasePage() {
    }
    BasePage.prototype.toggleDrawer = function () {
        var page = frame_1.topmost().currentPage;
        drawer = page.getViewById("drawer");
        drawer.showDrawer();
    };
    BasePage.prototype.navigate = function (args) {
        drawer.closeDrawer();
        var pageName = args.view.text.toLowerCase();
        frame_1.topmost().navigate("pages/" + pageName + "/" + pageName);
    };
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCYXNlUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFpQztBQUtqQyxJQUFJLElBQVMsQ0FBQztBQUNkLElBQUksTUFBVSxDQUFDO0FBQ2Y7SUFBQTtJQVdBLENBQUM7SUFWRywrQkFBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLEdBQUcsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ2pDLE1BQU0sR0FBa0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELDJCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWHFCLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0b3Btb3N0fSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgRXZlbnREYXRhfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcblxubGV0IHBhZ2U6UGFnZTtcbmxldCBkcmF3ZXI6YW55O1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIHsgICAgXG4gICAgdG9nZ2xlRHJhd2VyKCl7XG4gICAgICAgIGxldCBwYWdlID0gdG9wbW9zdCgpLmN1cnJlbnRQYWdlO1xuICAgICAgICBkcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHJhd2VyXCIpO1xuICAgICAgICBkcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cbiAgICBuYXZpZ2F0ZShhcmdzKXtcbiAgICAgICAgZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgICAgIGxldCBwYWdlTmFtZSA9IGFyZ3Mudmlldy50ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZShcInBhZ2VzL1wiICsgcGFnZU5hbWUgKyBcIi9cIiArIHBhZ2VOYW1lKTtcbiAgICB9XG59Il19