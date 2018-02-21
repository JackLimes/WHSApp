import { Observable } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
import { ObservableProperty } from "../../shared/observable-property-decorator";

const http = require("http");
const appSettings = require("application-settings");

/* ***********************************************************
* Keep data that is displayed in your app drawer in the drawer custom component view model.
*************************************************************/
export class DrawerViewModel extends Observable {
    @ObservableProperty() selectedPage: string;
    @ObservableProperty() email: string;
    @ObservableProperty() username: string;
    @ObservableProperty() imgurl: string;
    @ObservableProperty() postvis: string;

    /* ***********************************************************
    * Use the drawer view model constructor to initialize the properties data values.
    *************************************************************/

    constructor(selectedPage: string) {
        super();
        console.log("Selected Page: " + selectedPage);
        firebase.getCurrentUser().then((user) => {
            this.email = user.email;
            this.username = user.name;
            this.imgurl = user.profileImageURL;
            this.postvis = "collapsed";
            if (appSettings.getNumber("adminCount") >= 1) {
                this.postvis = "visible";
            }
        }, (error) => {
            alert("FB ERROR: " + error);
        });
        this.selectedPage = selectedPage;
    }
}
