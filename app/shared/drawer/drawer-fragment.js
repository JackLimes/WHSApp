"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLWZyYWdtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJhd2VyLWZyYWdtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esa0NBQW1DO0FBR25DLHlEQUFzRDtBQUV0RDs7OERBRThEO0FBQzlELGtCQUF5QixJQUFlO0lBQ3BDLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksbUNBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBTEQsNEJBS0M7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsNkJBQW9DLElBQWU7SUFDL0MsSUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNmLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsa0RBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcblxuaW1wb3J0IHsgRHJhd2VyVmlld01vZGVsIH0gZnJvbSBcIi4vZHJhd2VyLXZpZXctbW9kZWxcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVXNlIHRoZSBcImxvYWRlZFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIHdyYXBwaW5nIGxheW91dCBlbGVtZW50IHRvIGJpbmQgdGhlIHZpZXcgbW9kZWwgdG8geW91ciB2aWV3LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcbiAgICBjb25zdCBjb21wb25lbnRUaXRsZSA9IGNvbXBvbmVudC5nZXQoXCJzZWxlY3RlZFBhZ2VcIik7XG5cbiAgICBjb21wb25lbnQuYmluZGluZ0NvbnRleHQgPSBuZXcgRHJhd2VyVmlld01vZGVsKGNvbXBvbmVudFRpdGxlKTtcbn1cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVXNlIHRoZSBcInRhcFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIDxHcmlkTGF5b3V0PiBjb21wb25lbnQgZm9yIGhhbmRsaW5nIG5hdmlnYXRpb24gaXRlbSB0YXBzLlxuKiBUaGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSBhcHAgZHJhd2VyIDxHcmlkTGF5b3V0PiBpdGVtIGlzIHVzZWQgdG8gbmF2aWdhdGUgdGhlIGFwcFxuKiBiYXNlZCBvbiB0aGUgdGFwcGVkIG5hdmlnYXRpb25JdGVtJ3Mgcm91dGUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGlvbkl0ZW1UYXAoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gPEdyaWRMYXlvdXQ+YXJncy5vYmplY3Q7XG4gICAgY29uc3QgY29tcG9uZW50Um91dGUgPSBjb21wb25lbnQuZ2V0KFwicm91dGVcIik7XG5cbiAgICB0b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICBtb2R1bGVOYW1lOiBjb21wb25lbnRSb3V0ZSxcbiAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgbmFtZTogXCJmYWRlXCJcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIl19