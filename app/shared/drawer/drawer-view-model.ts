import { Observable } from "data/observable";
import firebase = require("nativescript-plugin-firebase");
import { ObservableProperty } from "../../shared/observable-property-decorator";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the drawer custom component view model.
*************************************************************/
export class DrawerViewModel extends Observable {
    @ObservableProperty() selectedPage: string;
    @ObservableProperty() email: string;
    @ObservableProperty() username: string;
    @ObservableProperty() imgurl: string;

    /* ***********************************************************
    * Use the drawer view model constructor to initialize the properties data values.
    *************************************************************/

    constructor(selectedPage: string) {
        super();
        firebase.getCurrentUser().then((user) => {
            this.email = user.email;
            this.username = user.name;
            this.imgurl = user.profileImageURL;
        }, (error) => {
            alert("FB ERROR: " + error);
        });
        this.selectedPage = selectedPage;
    }
}
