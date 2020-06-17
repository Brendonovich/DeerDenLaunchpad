import { BaseStore } from "./BaseStore";
import { observable } from "mobx";

export class UIStore extends BaseStore {
  @observable selectedPad?: number;
}
