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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3Qyx1REFBMEQ7QUFDMUQsNEZBQWdGO0FBRWhGOzs4REFFOEQ7QUFDOUQ7SUFBcUMsbUNBQVU7SUFNM0M7O2tFQUU4RDtJQUU5RCx5QkFBWSxZQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBU1Y7UUFSRyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNoQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN2QyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBbkJxQjtRQUFyQixrREFBa0IsRUFBRTs7eURBQXNCO0lBQ3JCO1FBQXJCLGtEQUFrQixFQUFFOztrREFBZTtJQUNkO1FBQXJCLGtEQUFrQixFQUFFOztxREFBa0I7SUFDakI7UUFBckIsa0RBQWtCLEVBQUU7O21EQUFnQjtJQWlCekMsc0JBQUM7Q0FBQSxBQXJCRCxDQUFxQyx1QkFBVSxHQXFCOUM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29ic2VydmFibGUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEtlZXAgZGF0YSB0aGF0IGlzIGRpc3BsYXllZCBpbiB5b3VyIGFwcCBkcmF3ZXIgaW4gdGhlIGRyYXdlciBjdXN0b20gY29tcG9uZW50IHZpZXcgbW9kZWwuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGNsYXNzIERyYXdlclZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBzZWxlY3RlZFBhZ2U6IHN0cmluZztcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgZW1haWw6IHN0cmluZztcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgdXNlcm5hbWU6IHN0cmluZztcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgaW1ndXJsOiBzdHJpbmc7XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBkcmF3ZXIgdmlldyBtb2RlbCBjb25zdHJ1Y3RvciB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0aWVzIGRhdGEgdmFsdWVzLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RlZFBhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgIHRoaXMuaW1ndXJsID0gdXNlci5wcm9maWxlSW1hZ2VVUkw7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJGQiBFUlJPUjogXCIgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IHNlbGVjdGVkUGFnZTtcbiAgICB9XG59XG4iXX0=