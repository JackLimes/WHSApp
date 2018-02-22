"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_property_decorator_1 = require("../shared/observable-property-decorator");
var PostViewModel = /** @class */ (function (_super) {
    __extends(PostViewModel, _super);
    function PostViewModel() {
        var _this = _super.call(this) || this;
        var reimu = new Date();
        reimu.setMonth(0);
        _this.today = reimu;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Date)
    ], PostViewModel.prototype, "today", void 0);
    return PostViewModel;
}(observable_1.Observable));
exports.PostViewModel = PostViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLHlGQUE2RTtBQUU3RTtJQUFtQyxpQ0FBVTtJQUd6QztRQUFBLFlBQ0ksaUJBQU8sU0FJVjtRQUhHLElBQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7SUFDdkIsQ0FBQztJQVBxQjtRQUFyQixrREFBa0IsRUFBRTtrQ0FBUSxJQUFJO2dEQUFDO0lBUXRDLG9CQUFDO0NBQUEsQUFURCxDQUFtQyx1QkFBVSxHQVM1QztBQVRZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCIuLi9zaGFyZWQvb2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgdG9kYXk6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3QgcmVpbXUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZWltdS5zZXRNb250aCgwKTtcbiAgICAgICAgdGhpcy50b2RheSA9IHJlaW11O1xuICAgIH1cbn1cbiJdfQ==