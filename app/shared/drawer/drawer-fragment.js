"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var frame_1 = require("ui/frame");
var drawer_view_model_1 = require("./drawer-view-model");
/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
function onLoaded(args) {
    var component = args.object;
    var componentTitle = component.get("selectedPage");
    component.bindingContext = new drawer_view_model_1.DrawerViewModel(componentTitle);
}
exports.onLoaded = onLoaded;
/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
function onNavigationItemTap(args) {
    var component = args.object;
    var componentRoute = component.get("route");
    frame_1.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}
exports.onNavigationItemTap = onNavigationItemTap;
function onLogoutTap(args) {
    var component = args.object;
    var componentRoute = component.get("route");
    firebase.logout();
    frame_1.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}
exports.onLogoutTap = onLogoutTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLWZyYWdtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJhd2VyLWZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdURBQTBEO0FBRTFELGtDQUFtQztBQUluQyx5REFBc0Q7QUFFdEQ7OzhEQUU4RDtBQUM5RCxrQkFBeUIsSUFBZTtJQUNwQyxJQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLG1DQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUxELDRCQUtDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDZCQUFvQyxJQUFlO0lBQy9DLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGtEQVVDO0FBRUQscUJBQTRCLElBQWU7SUFDdkMsSUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGtDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuXHJcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG5cclxuaW1wb3J0IHsgRHJhd2VyVmlld01vZGVsIH0gZnJvbSBcIi4vZHJhd2VyLXZpZXctbW9kZWxcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcImxvYWRlZFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIHdyYXBwaW5nIGxheW91dCBlbGVtZW50IHRvIGJpbmQgdGhlIHZpZXcgbW9kZWwgdG8geW91ciB2aWV3LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbXBvbmVudFRpdGxlID0gY29tcG9uZW50LmdldChcInNlbGVjdGVkUGFnZVwiKTtcclxuXHJcbiAgICBjb21wb25lbnQuYmluZGluZ0NvbnRleHQgPSBuZXcgRHJhd2VyVmlld01vZGVsKGNvbXBvbmVudFRpdGxlKTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwidGFwXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgPEdyaWRMYXlvdXQ+IGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgbmF2aWdhdGlvbiBpdGVtIHRhcHMuXHJcbiogVGhlIFwidGFwXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgYXBwIGRyYXdlciA8R3JpZExheW91dD4gaXRlbSBpcyB1c2VkIHRvIG5hdmlnYXRlIHRoZSBhcHBcclxuKiBiYXNlZCBvbiB0aGUgdGFwcGVkIG5hdmlnYXRpb25JdGVtJ3Mgcm91dGUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpb25JdGVtVGFwKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gPEdyaWRMYXlvdXQ+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb21wb25lbnRSb3V0ZSA9IGNvbXBvbmVudC5nZXQoXCJyb3V0ZVwiKTtcclxuXHJcbiAgICB0b3Btb3N0KCkubmF2aWdhdGUoe1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IGNvbXBvbmVudFJvdXRlLFxyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9nb3V0VGFwKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gPEdyaWRMYXlvdXQ+YXJncy5vYmplY3Q7XHJcbiAgICBjb25zdCBjb21wb25lbnRSb3V0ZSA9IGNvbXBvbmVudC5nZXQoXCJyb3V0ZVwiKTtcclxuICAgIGZpcmViYXNlLmxvZ291dCgpO1xyXG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiBjb21wb25lbnRSb3V0ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIl19