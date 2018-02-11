"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
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
        _this.selectedPage = selectedPage;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], DrawerViewModel.prototype, "selectedPage", void 0);
    return DrawerViewModel;
}(observable_1.Observable));
exports.DrawerViewModel = DrawerViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3Qyw0RkFBZ0Y7QUFFaEY7OzhEQUU4RDtBQUM5RDtJQUFxQyxtQ0FBVTtJQUczQzs7a0VBRThEO0lBRTlELHlCQUFZLFlBQW9CO1FBQWhDLFlBQ0ksaUJBQU8sU0FHVjtRQURHLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBVnFCO1FBQXJCLGtEQUFrQixFQUFFOzt5REFBc0I7SUFXL0Msc0JBQUM7Q0FBQSxBQVpELENBQXFDLHVCQUFVLEdBWTlDO0FBWlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlUHJvcGVydHkgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29ic2VydmFibGUtcHJvcGVydHktZGVjb3JhdG9yXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEtlZXAgZGF0YSB0aGF0IGlzIGRpc3BsYXllZCBpbiB5b3VyIGFwcCBkcmF3ZXIgaW4gdGhlIGRyYXdlciBjdXN0b20gY29tcG9uZW50IHZpZXcgbW9kZWwuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGNsYXNzIERyYXdlclZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBzZWxlY3RlZFBhZ2U6IHN0cmluZztcblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIGRyYXdlciB2aWV3IG1vZGVsIGNvbnN0cnVjdG9yIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnRpZXMgZGF0YSB2YWx1ZXMuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGVkUGFnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBzZWxlY3RlZFBhZ2U7XG4gICAgfVxufVxuIl19