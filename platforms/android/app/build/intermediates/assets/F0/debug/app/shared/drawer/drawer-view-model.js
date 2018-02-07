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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXItdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUU3Qyw0RkFBZ0Y7QUFFaEY7OzhEQUU4RDtBQUM5RDtJQUFxQyxtQ0FBVTtJQUczQzs7a0VBRThEO0lBQzlELHlCQUFZLFlBQW9CO1FBQWhDLFlBQ0ksaUJBQU8sU0FHVjtRQURHLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBVHFCO1FBQXJCLGtEQUFrQixFQUFFOzt5REFBc0I7SUFVL0Msc0JBQUM7Q0FBQSxBQVhELENBQXFDLHVCQUFVLEdBVzlDO0FBWFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZVByb3BlcnR5IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vYnNlcnZhYmxlLXByb3BlcnR5LWRlY29yYXRvclwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBLZWVwIGRhdGEgdGhhdCBpcyBkaXNwbGF5ZWQgaW4geW91ciBhcHAgZHJhd2VyIGluIHRoZSBkcmF3ZXIgY3VzdG9tIGNvbXBvbmVudCB2aWV3IG1vZGVsLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgY2xhc3MgRHJhd2VyVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgc2VsZWN0ZWRQYWdlOiBzdHJpbmc7XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBkcmF3ZXIgdmlldyBtb2RlbCBjb25zdHJ1Y3RvciB0byBpbml0aWFsaXplIHRoZSBwcm9wZXJ0aWVzIGRhdGEgdmFsdWVzLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGVkUGFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhZ2UgPSBzZWxlY3RlZFBhZ2U7XHJcbiAgICB9XHJcbn1cclxuIl19