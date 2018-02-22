/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "application";
import "./bundle-config";
const firebase = require("nativescript-plugin-firebase");
const appSettings = require("application-settings");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log(`firebase.init error: ${error}`);
  }
);

appSettings.setNumber("adminCount", 0);

if (!appSettings.hasKey("colorblind")) {
  appSettings.setBoolean("colorblind", false);
}

app.start({ moduleName: "login/login-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
