import React from "react";
import { useStore } from "../store";
import { useObserver } from "mobx-react-lite";
import { MidiTypes } from "../store/MappingStore";
import TextInput from "./TextInput";
import TextSelect from "./TextSelect";
import { rgbToHsv, lpColor } from "../utils";

const PadOptions = ({ pad }: { pad: number }) => {
  const mappingStore = useStore().mappings;

  return useObserver(() => (
    <div>
      <p
        style={{
          fontSize: 24,
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          color: "white",
        }}
        onClick={() => {
          if (mappingStore.currentPadMapping === undefined)
            mappingStore.mappings[mappingStore.currentPage][pad] = {};
          else delete mappingStore.mappings[mappingStore.currentPage][pad];
        }}
      >
        {mappingStore.currentPadMapping === undefined
          ? "Add mapping"
          : "Remove mapping"}
      </p>
      {mappingStore.currentPadMapping !== undefined && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            padding: "0 20px",
          }}
        >
          <span style={{ fontSize: 24 }}>
            Midi{" "}
            <input
              type="checkbox"
              checked={mappingStore.currentPadMapping.midi !== undefined}
              onChange={(e) =>
                (mappingStore.currentPadMapping!.midi = e.target.checked
                  ? {
                      type: MidiTypes.NOTE_ON,
                      channel: 1,
                      note: 0,
                    }
                  : undefined)
              }
            />
          </span>
          {mappingStore.currentPadMapping.midi !== undefined && (
            <>
              <span style={{ fontSize: 20 }}>
                Channel
                <TextSelect
                  style={{ marginLeft: 10 }}
                  value={mappingStore.currentPadMapping.midi.channel.toString()}
                  options={new Array(16)
                    .fill("", 0, 16)
                    .map((_, index) => (index + 1).toString())}
                  onChange={(e) =>
                    (mappingStore.currentPadMapping!.midi!.channel = parseInt(
                      e.target.value
                    ))
                  }
                />
              </span>
              <span style={{ fontSize: 20 }}>
                Type
                <TextSelect
                  style={{ marginLeft: 10 }}
                  value={mappingStore.currentPadMapping.midi.type}
                  options={Object.values(MidiTypes)}
                  onChange={(e) =>
                    (mappingStore.currentPadMapping!.midi!.type = e.target
                      .value as MidiTypes)
                  }
                />
              </span>
              <span style={{ fontSize: 20 }}>
                Note{" "}
                <TextInput
                  style={{ width: 40, marginLeft: 10 }}
                  value={mappingStore.currentPadMapping.midi.note}
                  onChange={(e: any) => {
                    let note = parseInt(e.target.value);
                    if (e.target.value === "") note = 0;
                    if (!isNaN(note) && note < 128 && note > -1)
                      mappingStore.currentPadMapping!.midi!.note = note;
                  }}
                />
              </span>
            </>
          )}
          <span style={{ fontSize: 24 }}>
            Color{" "}
            <input
              type="checkbox"
              checked={mappingStore.currentPadMapping.color !== undefined}
              onChange={(e) =>
                (mappingStore.currentPadMapping!.color = e.target.checked
                  ? [3, 3]
                  : undefined)
              }
            />
          </span>
          {mappingStore.currentPadMapping.color !== undefined && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                height: 80,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 20, width: 55, textAlign: "center" }}
                  >
                    Red
                  </span>

                  {[0, 1, 2, 3].map((n) => (
                    <div
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: "rgb(139, 139, 139)",
                        outline:
                          mappingStore.currentPadMapping?.color![0] === n
                            ? "2px solid white"
                            : undefined,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        (mappingStore.currentPadMapping!.color![0] = n)
                      }
                    >
                      <div
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: "red",
                          opacity: n / 3,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 20, width: 55, textAlign: "center" }}
                  >
                    Green
                  </span>
                  {[0, 1, 2, 3].map((n) => (
                    <div
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: "rgb(139, 139, 139)",
                        outline:
                          mappingStore.currentPadMapping?.color![1] === n
                            ? "2px solid white"
                            : undefined,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        (mappingStore.currentPadMapping!.color![1] = n)
                      }
                    >
                      <div
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: "green",
                          opacity: n / 3,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: 50,
                  marginLeft: 10,
                  height: "100%",
                  backgroundColor: "rgb(139, 139, 139)",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: "100%",
                    backgroundColor: lpColor(
                      mappingStore.currentPadMapping.color!
                    ),
                    opacity: rgbToHsv([
                      (240 * mappingStore.currentPadMapping.color![0]) / 3,
                      (240 * mappingStore.currentPadMapping.color![1]) / 3,
                      0,
                    ])[2],
                  }}
                ></div>
              </div>
            </div>
          )}
          <span style={{ fontSize: 24 }}>
            Page{" "}
            <input
              type="checkbox"
              checked={mappingStore.currentPadMapping.page !== undefined}
              onChange={(e) =>
                (mappingStore.currentPadMapping!.page = e.target.checked
                  ? 0
                  : undefined)
              }
            />
          </span>{" "}
          {mappingStore.currentPadMapping.page !== undefined && (
            <span style={{ fontSize: 20 }}>
              Switch to{" "}
              <TextSelect
                style={{ paddingLeft: 10 }}
                value={mappingStore.currentPadMapping.page.toString()}
                options={mappingStore.mappings.map((_, index) =>
                  index.toString()
                )}
                onChange={(e) =>
                  (mappingStore.currentPadMapping!.page = parseInt(
                    e.target.value
                  ))
                }
              />
            </span>
          )}
        </div>
      )}
    </div>
  ));
};

export default PadOptions;
