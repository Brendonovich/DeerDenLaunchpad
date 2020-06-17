import {
  Input,
  Output,
  InputEventNoteon,
  InputEventNoteoff,
  InputEventControlchange,
} from "webmidi";
import { EventEmitter } from "events";

export default class Launchpad extends EventEmitter {
  name: string;
  input: Input;
  output: Output;

  constructor(name: string, input: Input, output: Output) {
    super();

    this.name = name;
    this.input = input;
    this.output = output;

    this.input.addListener("noteon", "all", (e) => this.noteon(e));
  }

  noteon(message: InputEventNoteon) {
    this.emit("midievent", { note: message.note.number });
  }
}
