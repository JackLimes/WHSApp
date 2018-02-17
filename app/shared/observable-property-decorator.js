"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ObservableProperty() {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this["_" + propertyKey];
            },
            set: function (value) {
                if (this["_" + propertyKey] === value) {
                    return;
                }
                this["_" + propertyKey] = value;
                this.notifyPropertyChange(propertyKey, value);
            },
            enumerable: true,
            configurable: true
        });
    };
}
exports.ObservableProperty = ObservableProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvYnNlcnZhYmxlLXByb3BlcnR5LWRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQ0ksTUFBTSxDQUFDLFVBQUMsTUFBa0IsRUFBRSxXQUFtQjtRQUMzQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUU7WUFDdkMsR0FBRztnQkFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsR0FBRyxZQUFDLEtBQUs7Z0JBQ0wsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxNQUFNLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQWxCRCxnREFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9ic2VydmFibGVQcm9wZXJ0eSgpIHtcclxuICAgIHJldHVybiAodGFyZ2V0OiBPYnNlcnZhYmxlLCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbXCJfXCIgKyBwcm9wZXJ0eUtleV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbXCJfXCIgKyBwcm9wZXJ0eUtleV0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNbXCJfXCIgKyBwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UocHJvcGVydHlLZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==