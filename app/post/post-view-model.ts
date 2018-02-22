import { Observable } from "data/observable";
import { ObservableProperty } from "../shared/observable-property-decorator";

export class PostViewModel extends Observable {
    @ObservableProperty() today: Date;

    constructor() {
        super();
        const reimu = new Date();
        reimu.setMonth(0);
        this.today = reimu;
    }
}
