import { BaseStore } from "./BaseStore";
import webmidi, { Output } from "webmidi";
import { observable, action } from "mobx";
import { RootStore } from ".";
import { MidiTypes } from "./MappingStore";

interface MidiMessage {
  channel: number;
  type: MidiTypes;
  note: number;
}

const MidiBytes = {
  [MidiTypes.NOTE_OFF]: 0x8,
  [MidiTypes.NOTE_ON]: 0x9,
  [MidiTypes.CONTROL_CHANGE]: 0xa,
};

export class MidiStore extends BaseStore {
  @observable output?: Output;
  @observable outputs: string[] = [];

  constructor(root: RootStore) {
    super(root);

    webmidi.enable((e) => {
      if (e) return;

      let listener = () => {
        this.outputs = webmidi.outputs.map((out) => out.name);
      };

      webmidi.addListener("connected", listener);
      webmidi.addListener("disconnected", listener);

      listener();
    });
  }

  @action.bound
  setOutput(output: string) {
    this.output = webmidi.outputs.find((out) => out.name === output);
  }

  @action.bound
  sendMidi(message: MidiMessage) {
    this.output?.send(MidiBytes[message.type] * 0x10 + message.channel - 1, [
      message.note,
      127,
    ]);
  }
}
