import { BaseStore } from "./BaseStore";
import { observable, action, computed } from "mobx";

export enum MidiTypes {
  NOTE_ON = "Note On",
  NOTE_OFF = "Note Off",
  CONTROL_CHANGE = "Control Change",
}

export type Mapping = {
  color?: [number, number];
  midi?: {
    note: number;
    type: MidiTypes;
    channel: number;
  };
  page?: number;
};

export class MappingStore extends BaseStore {
  @observable mappings: {
    [padIndex: number]: Mapping;
  }[] = [{}];

  @observable currentPage: number = 0;

  @action.bound
  createNewPage() {
    let newPage = this.mappings.push({}) - 1;
    this.currentPage = newPage;
  }

  @computed
  get currentPadMapping() {
    let selectedPad = this.rootStore.ui.selectedPad;
    if (selectedPad === undefined) return undefined;

    let mapping = this.mappings[this.currentPage][selectedPad];
    return mapping;
  }

  @action.bound
  performAction(pad: number) {
    let mapping: Mapping | undefined = this.mappings[this.currentPage]?.[pad];
    if (!mapping) return;
    if (
      mapping?.midi !== undefined &&
      this.rootStore.midi.output !== undefined
    ) {
      this.rootStore.midi.sendMidi(mapping.midi);
    }
    
    if (mapping.page) this.currentPage = mapping.page;
  }
}
