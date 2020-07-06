# DeerDenLaunchpad

A MIDI remapping tool developed for [DeerDenRadio](https://twitch.tv/deerdenradio).

Allows for a Launchpad MK1 to emit any MIDI signal needed by taking input from the Launchpad, comparing it with user defined mappings, and outputting the altered MIDI signal to a passthrough port, usually provided by [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html). Multiple pages of mappings can be created and switched to, creating virtually infinite mappings!

Additionally, the LEDs on the pads can be controlled, so that different mappings can be assigned different colours.

Developed with Typescript, React, MobX and WebMIDI.
