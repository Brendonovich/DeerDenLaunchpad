const { app, BrowserWindow, Menu, dialog } = require("electron");
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");

function createWindow() {
  installExtension(REDUX_DEVTOOLS);
  let win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      noteIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });
  win.loadURL("http://localhost:3000");
  win.webContents.openDevTools();

  // let menu = [
  //   {
  //     label: "obs-launchpad",
  //     submenu: [
  //       {
  //         label: "About obs-launchpad",
  //       },
  //       {
  //         label: "Quit",
  //         accelerator: "Command+Q",
  //         click: () => {
  //           app.quit();
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     label: "File",
  //     submenu: [
  //       {
  //         label: "Save",
  //         accelerator: "CommandOrControl+S",
  //         click: () => {
  //           let path = dialog.showSaveDialogSync(win, {
  //             title: "Save Mapping",
  //             filters: [{ extensions: ["obsmap"] }],
  //             defaultPath: "Untitled.obsmap",
  //           });
  //           if (path !== undefined) win.webContents.send("SAVE", path);
  //         },
  //       },
  //       {
  //         label: "Open",
  //         accelerator: "CommandOrControl+O",
  //         click: () => {
  //           let path = dialog.showOpenDialogSync(win, {
  //             title: "Open Mapping",
  //             filters: [{ extensions: ["obsmap"] }],
  //             properties: ["openFile"],
  //           });
  //           if (path !== undefined) win.webContents.send("OPEN", path);
  //         },
  //       },
  //     ],
  //   },
  // ];

  // Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}

app.on("ready", createWindow);
