import React, { createContext, useContext } from "react";
import { LaunchpadStore } from "./LaunchpadStore";
import { MidiStore } from "./MidiStore";
import { MappingStore } from "./MappingStore";
import { UIStore } from "./UIStore";

export class RootStore {
  launchpads = new LaunchpadStore(this);
  midi = new MidiStore(this);
  mappings = new MappingStore(this);
  ui = new UIStore(this)
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
