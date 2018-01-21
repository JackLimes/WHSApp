"use strict";
var BasePage_1 = require("../../shared/BasePage");
var observable_1 = require("data/observable");
var vm = new observable_1.Observable();
var SettingsPage = (function (_super) {
    __extends(SettingsPage, _super);
    function SettingsPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsPage.prototype.loaded = function (args) {
        var page = args.object;
        vm.set("blackBackground", false);
        vm.set("selectedPage", "settings");
        page.bindingContext = vm;
    };
    return SettingsPage;
}(BasePage_1.BasePage));
;
module.exports = new SettingsPage();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0RBQStDO0FBQy9DLDhDQUFzRDtBQUd0RCxJQUFJLEVBQUUsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztBQUMxQjtJQUEyQixnQ0FBUTtJQUFuQzs7SUFPQSxDQUFDO0lBTkcsNkJBQU0sR0FBTixVQUFPLElBQWM7UUFDakIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFQRCxDQUEyQixtQkFBUSxHQU9sQztBQUFBLENBQUM7QUFDRixpQkFBUyxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlUGFnZX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9CYXNlUGFnZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBFdmVudERhdGF9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5sZXQgdm0gPSBuZXcgT2JzZXJ2YWJsZSgpO1xuY2xhc3MgU2V0dGluZ3NQYWdlIGV4dGVuZHMgQmFzZVBhZ2UgeyAgICBcbiAgICBsb2FkZWQoYXJnczpFdmVudERhdGEpe1xuICAgICAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xuICAgICAgICB2bS5zZXQoXCJibGFja0JhY2tncm91bmRcIiwgZmFsc2UpO1xuICAgICAgICB2bS5zZXQoXCJzZWxlY3RlZFBhZ2VcIiwgXCJzZXR0aW5nc1wiKTtcbiAgICAgICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xuICAgIH1cbn07XG5leHBvcnQgPSBuZXcgU2V0dGluZ3NQYWdlKCk7Il19