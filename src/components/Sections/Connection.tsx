import React, { useEffect } from "react";
import { useObserver } from "mobx-react-lite";

import Combobox from "../Combobox";

import { useStore } from "../../store";
import { autorun } from "mobx";

const Connection = () => {
  const store = useStore();

  useEffect(() => {
    autorun(() => {
      if (
        store.launchpads.currentLaunchpad === undefined &&
        store.launchpads.launchpads.length > 0
      )
        store.launchpads.setCurrentLaunchpad(
          store.launchpads.launchpads[0].name
        );
      if (store.midi.output === undefined && store.midi.outputs.length > 0)
        store.midi.setOutput(store.midi.outputs[0]);
    });
    //eslint-disable-next-line
  }, []);

  return useObserver(() => (
    <div
      style={{
        flex: 1,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 20,
            lineHeight: 1,
            margin: "auto 0",
          }}
        >
          Launchpad
        </p>
        <div style={{ marginLeft: 10, flex: 1 }}>
          <Combobox
            onChanged={(lp) => store.launchpads.setCurrentLaunchpad(lp)}
            options={store.launchpads.launchpads.map((lp) => lp.name)}
            style={{ width: "100%" }}
            value={store.launchpads.currentLaunchpad?.name}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: 20,
            lineHeight: 1,
            margin: "auto 0",
          }}
        >
          Passthrough
        </p>
        <div style={{ marginLeft: 10, flex: 1 }}>
          <Combobox
            onChanged={(out) => store.midi.setOutput(out)}
            options={store.midi.outputs}
            style={{ width: "100%" }}
            value={store.midi.output?.name}
          />
        </div>
      </div>
    </div>
  ));
};

export default Connection;
