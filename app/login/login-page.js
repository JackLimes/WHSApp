"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var frame_1 = require("ui/frame");
var login_view_model_1 = require("./login-view-model");
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var http = require("http");
var appSettings = require("application-settings");
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    var page = args.object;
    page.bindingContext = new login_view_model_1.LoginViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
function authentificate(args) {
    firebase.login({
        type: firebase.LoginType.GOOGLE
    }).then(function (user) {
        register();
        http.request({
            url: "https://fzwestboard.000webhostapp.com/getadminclubs.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ uid: user.uid })
        }).then(function (result) {
            var jsondata = JSON.parse(result.content);
            console.log("Getclubs inside: " + jsondata.name.length);
            appSettings.setNumber("adminCount", jsondata.name.length);
            console.log("AppSetting: " + appSettings.getNumber("adminCount"));
            frame_1.topmost().navigate("home/home-page");
            console.log("User ID: " + user.uid);
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }, function (errorMessage) {
        console.log(errorMessage);
    });
}
exports.authentificate = authentificate;
function register() {
    // This runs everytime. It won't reregister on server side.
    var url = "https://fzwestboard.000webhostapp.com/register.php";
    var xmlhttp = new XMLHttpRequest();
    firebase.getCurrentUser().then(function (user) {
        var request = JSON.stringify({ uid: user.uid, email: user.email });
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var jsondata = JSON.parse(this.responseText);
                console.log(jsondata);
            }
        };
        xmlhttp.send(request);
    }, function (error) {
        alert("FB ERROR: " + error);
    });
}
exports.register = register;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBMEQ7QUFHMUQsa0NBQW1DO0FBR25DLHVEQUFvRDtBQUVwRDs7OERBRThEO0FBRTlELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVwRCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUNELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztBQUMvQyxDQUFDO0FBWEQsd0NBV0M7QUFFRCx3QkFBK0IsSUFBZTtJQUMxQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ1gsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTTtLQUNoQyxDQUFDLENBQUMsSUFBSSxDQUNILFVBQUMsSUFBSTtRQUNILFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSx5REFBeUQ7WUFDOUQsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0MsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhELFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLGVBQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QyxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLEVBQ0QsVUFBQyxZQUFZO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQ0osQ0FBQztBQUNSLENBQUM7QUEvQkQsd0NBK0JDO0FBRUQ7SUFDSSwyREFBMkQ7SUFDM0QsSUFBTSxHQUFHLEdBQUcsb0RBQW9ELENBQUM7SUFDakUsSUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUVyQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtRQUNoQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBRW5FLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztRQUM1RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDL0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBRXJHLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRztZQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFCLENBQUMsRUFBRSxVQUFDLEtBQUs7UUFDTCxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTFCRCw0QkEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJWaWV3TW9kZWwgfSBmcm9tIFwiLi4vc2hhcmVkL2RyYXdlci9kcmF3ZXItdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgeyBMb2dpblZpZXdNb2RlbCB9IGZyb20gXCIuL2xvZ2luLXZpZXctbW9kZWxcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IExvZ2luVmlld01vZGVsKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRoZW50aWZpY2F0ZShhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICB0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuR09PR0xFXHJcbiAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAodXNlcikgPT4ge1xyXG4gICAgICAgICAgICByZWdpc3RlcigpO1xyXG4gICAgICAgICAgICBodHRwLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vZnp3ZXN0Ym9hcmQuMDAwd2ViaG9zdGFwcC5jb20vZ2V0YWRtaW5jbHVicy5waHBcIixcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBKU09OLnN0cmluZ2lmeSh7IHVpZDogdXNlci51aWQgfSlcclxuICAgICAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqc29uZGF0YSA9IEpTT04ucGFyc2UocmVzdWx0LmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0Y2x1YnMgaW5zaWRlOiBcIiArIGpzb25kYXRhLm5hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXROdW1iZXIoXCJhZG1pbkNvdW50XCIsIGpzb25kYXRhLm5hbWUubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFwcFNldHRpbmc6IFwiICsgYXBwU2V0dGluZ3MuZ2V0TnVtYmVyKFwiYWRtaW5Db3VudFwiKSk7XHJcbiAgICAgICAgICAgICAgICB0b3Btb3N0KCkubmF2aWdhdGUoXCJob21lL2hvbWUtcGFnZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRDogXCIgKyB1c2VyLnVpZCk7XHJcblxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xyXG4gICAgLy8gVGhpcyBydW5zIGV2ZXJ5dGltZS4gSXQgd29uJ3QgcmVyZWdpc3RlciBvbiBzZXJ2ZXIgc2lkZS5cclxuICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9mendlc3Rib2FyZC4wMDB3ZWJob3N0YXBwLmNvbS9yZWdpc3Rlci5waHBcIjtcclxuICAgIGNvbnN0IHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoe3VpZDogdXNlci51aWQsIGVtYWlsOiB1c2VyLmVtYWlsfSk7XHJcblxyXG4gICAgICAgIHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCBcIipcIik7XHJcbiAgICAgICAgeG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLCBcIkdFVCwgUE9TVCwgT1BUSU9OU1wiKTtcclxuICAgICAgICB4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gICAgICAgIHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLVJlcXVlc3QtSGVhZGVyc1wiLCBcIlgtUmVxdWVzdGVkLVdpdGgsIGFjY2VwdCwgY29udGVudC10eXBlXCIpO1xyXG5cclxuICAgICAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpzb25kYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhtbGh0dHAuc2VuZChyZXF1ZXN0KTtcclxuXHJcbiAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICBhbGVydChcIkZCIEVSUk9SOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcbiJdfQ==