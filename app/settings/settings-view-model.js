"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_property_decorator_1 = require("../shared/observable-property-decorator");
var appSettings = require("application-settings");
var SettingsViewModel = /** @class */ (function (_super) {
    __extends(SettingsViewModel, _super);
    function SettingsViewModel() {
        var _this = _super.call(this) || this;
        _this.colorMode = appSettings.getBoolean("colorblind");
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Boolean)
    ], SettingsViewModel.prototype, "colorMode", void 0);
    return SettingsViewModel;
}(observable_1.Observable));
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFDN0MseUZBQTZFO0FBQzdFLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRXBEO0lBQXVDLHFDQUFVO0lBRTdDO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUMxRCxDQUFDO0lBSnFCO1FBQXJCLGtEQUFrQixFQUFFOzt3REFBb0I7SUFLN0Msd0JBQUM7Q0FBQSxBQU5ELENBQXVDLHVCQUFVLEdBTWhEO0FBTlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCIuLi9zaGFyZWQvb2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcbmNvbnN0IGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgY29sb3JNb2RlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbG9yTW9kZSA9IGFwcFNldHRpbmdzLmdldEJvb2xlYW4oXCJjb2xvcmJsaW5kXCIpO1xuICAgIH1cbn1cbiJdfQ==