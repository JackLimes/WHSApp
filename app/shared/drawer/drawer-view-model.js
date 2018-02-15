"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var firebase = require("nativescript-plugin-firebase");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
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
        firebase.getCurrentUser().then(function (user) {
            _this.email = user.email;
            _this.username = user.name;
            _this.imgurl = user.profileImageURL;
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
    return DrawerViewModel;
}(observable_1.Observable));
exports.DrawerViewModel = DrawerViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx1REFBMEQ7QUFDMUQsNEZBQWdGO0FBRWhGOzs4REFFOEQ7QUFDOUQ7SUFBcUMsbUNBQVU7SUFNM0M7O2tFQUU4RDtJQUU5RCx5QkFBWSxZQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBU1Y7UUFSRyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNoQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN2QyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBbkJxQjtRQUFyQixrREFBa0IsRUFBRTs7eURBQXNCO0lBQ3JCO1FBQXJCLGtEQUFrQixFQUFFOztrREFBZTtJQUNkO1FBQXJCLGtEQUFrQixFQUFFOztxREFBa0I7SUFDakI7UUFBckIsa0RBQWtCLEVBQUU7O21EQUFnQjtJQWlCekMsc0JBQUM7Q0FBQSxBQXJCRCxDQUFxQyx1QkFBVSxHQXFCOUM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vYnNlcnZhYmxlLXByb3BlcnR5LWRlY29yYXRvclwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBLZWVwIGRhdGEgdGhhdCBpcyBkaXNwbGF5ZWQgaW4geW91ciBhcHAgZHJhd2VyIGluIHRoZSBkcmF3ZXIgY3VzdG9tIGNvbXBvbmVudCB2aWV3IG1vZGVsLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgY2xhc3MgRHJhd2VyVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgZW1haWw6IHN0cmluZztcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIGltZ3VybDogc3RyaW5nO1xyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgZHJhd2VyIHZpZXcgbW9kZWwgY29uc3RydWN0b3IgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydGllcyBkYXRhIHZhbHVlcy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0ZWRQYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKCkudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5pbWd1cmwgPSB1c2VyLnByb2ZpbGVJbWFnZVVSTDtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGQiBFUlJPUjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBzZWxlY3RlZFBhZ2U7XHJcbiAgICB9XHJcbn1cclxuIl19