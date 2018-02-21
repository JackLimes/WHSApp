"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
var http = require("http");
var appSettings = require("application-settings");
/* ***********************************************************
* Keep data that is displayed in your app drawer in the drawer custom component view model.
*************************************************************/
var DrawerViewModel = /** @class */ (function (_super) {
    __extends(DrawerViewModel, _super);
    /* ***********************************************************
    * Use the drawer view model constructor to initialize the properties data values.
    *************************************************************/
    function DrawerViewModel(selectedPage) {
        var _this = _super.call(this) || this;
        console.log("Selected Page: " + selectedPage);
        firebase.getCurrentUser().then(function (user) {
            _this.email = user.email;
            _this.username = user.name;
            _this.imgurl = user.profileImageURL;
            _this.postvis = "collapsed";
            if (appSettings.getNumber("adminCount") >= 1) {
                _this.postvis = "visible";
            }
        }, function (error) {
            alert("FB ERROR: " + error);
        });
        _this.selectedPage = selectedPage;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "selectedPage", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "email", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "username", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "imgurl", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "postvis", void 0);
    return DrawerViewModel;
}(observable_1.Observable));
exports.DrawerViewModel = DrawerViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx1REFBMEQ7QUFDMUQsNEZBQWdGO0FBRWhGLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVwRDs7OERBRThEO0FBQzlEO0lBQXFDLG1DQUFVO0lBTzNDOztrRUFFOEQ7SUFFOUQseUJBQVksWUFBb0I7UUFBaEMsWUFDSSxpQkFBTyxTQWNWO1FBYkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNoQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNuQyxLQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBekJxQjtRQUFyQixrREFBa0IsRUFBRTs7eURBQXNCO0lBQ3JCO1FBQXJCLGtEQUFrQixFQUFFOztrREFBZTtJQUNkO1FBQXJCLGtEQUFrQixFQUFFOztxREFBa0I7SUFDakI7UUFBckIsa0RBQWtCLEVBQUU7O21EQUFnQjtJQUNmO1FBQXJCLGtEQUFrQixFQUFFOztvREFBaUI7SUFzQjFDLHNCQUFDO0NBQUEsQUEzQkQsQ0FBcUMsdUJBQVUsR0EyQjlDO0FBM0JZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vYnNlcnZhYmxlLXByb3BlcnR5LWRlY29yYXRvclwiO1xuXG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogS2VlcCBkYXRhIHRoYXQgaXMgZGlzcGxheWVkIGluIHlvdXIgYXBwIGRyYXdlciBpbiB0aGUgZHJhd2VyIGN1c3RvbSBjb21wb25lbnQgdmlldyBtb2RlbC5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5leHBvcnQgY2xhc3MgRHJhd2VyVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIHNlbGVjdGVkUGFnZTogc3RyaW5nO1xuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBlbWFpbDogc3RyaW5nO1xuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSB1c2VybmFtZTogc3RyaW5nO1xuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBpbWd1cmw6IHN0cmluZztcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgcG9zdHZpczogc3RyaW5nO1xuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgZHJhd2VyIHZpZXcgbW9kZWwgY29uc3RydWN0b3IgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydGllcyBkYXRhIHZhbHVlcy5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0ZWRQYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBQYWdlOiBcIiArIHNlbGVjdGVkUGFnZSk7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWw7XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgdGhpcy5pbWd1cmwgPSB1c2VyLnByb2ZpbGVJbWFnZVVSTDtcbiAgICAgICAgICAgIHRoaXMucG9zdHZpcyA9IFwiY29sbGFwc2VkXCI7XG4gICAgICAgICAgICBpZiAoYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwiYWRtaW5Db3VudFwiKSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0dmlzID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJGQiBFUlJPUjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IHNlbGVjdGVkUGFnZTtcbiAgICB9XG59XG4iXX0=