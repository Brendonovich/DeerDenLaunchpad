import { observable, action, IObservableArray } from "mobx";
import WebMidi from "webmidi";

import { BaseStore } from "./BaseStore";
import Launchpad from "../classes/Launchpad";
import { RootStore } from ".";
import { portsMatch, portNeutralize } from "../utils";

export class LaunchpadStore extends BaseStore {
  readonly launchpads: IObservableArray<Launchpad> = observable([]);
  @observable initialized = false;
  @observable currentLaunchpad?: Launchpad;

  private lastScan?: Date = undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);
    WebMidi.enable((e) => {
      if (e) return;
      let listener = () =>
        this.scan().then((lps) => {
          if (lps !== undefined) this.launchpads.replace(lps);
        });
      listener();

      WebMidi.addListener("connected", listener);
      WebMidi.addListener("disconnected", listener);

      this.initialized = true;
    }, true);
  }

  @action.bound
  async scan() {
    const launchpads: Launchpad[] = [];

    let currentTimestamp = new Date();

    if (this.lastScan === undefined || this.lastScan < currentTimestamp)
      this.lastScan = currentTimestamp;

    for (let input of WebMidi.inputs) {
      for (let output of WebMidi.outputs) {
        if (portsMatch(input.name, output.name)) {
          if (this.lastScan > currentTimestamp) return;

          const launchpad = new Launchpad(input.name, input, output);

          launchpads.push(launchpad);
        }
      }
    }
    if (this.lastScan > currentTimestamp) return;
    return launchpads;
  }

  @action.bound
  setCurrentLaunchpad(launchpad: string) {
    let lp = this.launchpads.find((lp) => lp.name === launchpad);
    if (lp === undefined) return;
    this.currentLaunchpad = lp;
    this.currentLaunchpad.addListener("midievent", (data) => {
      this.rootStore.mappings.performAction(data.note);
    });
  }
}
