import { Observable } from "data/observable";
import { ObservableProperty } from "../shared/observable-property-decorator";
const appSettings = require("application-settings");

export class SettingsViewModel extends Observable {
    @ObservableProperty() colorMode: boolean;
    constructor() {
        super();
        this.colorMode = appSettings.getBoolean("colorblind");
    }
}
