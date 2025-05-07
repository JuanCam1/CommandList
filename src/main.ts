import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { shell } from "electron";
import path from "node:path";
import fs from "node:fs";
import { platform } from "node:process";
import { template } from "./api/libs";
import type { CommandI } from "types/global";
import { commandsData } from "./api/commands-data";

let mainWindow: BrowserWindow;
const dataFilePath = path.join(app.getPath("userData"), "commands.json");

const createWindow = () => {
  try {
    mainWindow = new BrowserWindow({
      icon: path.join(__dirname, "../images/logo.png"),
      title: "CodeLaunch",
      minHeight: 600,
      minWidth: 500,
      frame: true,
      show: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    mainWindow.maximize();

    // const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(null);

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      );
    }

    // mainWindow.webContents.openDevTools({
    //   mode: "detach",
    // });

    if(!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify(commandsData, null, 2), "utf-8");
      console.log('Archivo data.json creado con datos por defecto');
    }
  } catch (error) {
    console.log('error', error);
    // fs.writeFileSync("/tmp/electron-app-error.log", String(error));
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const readData = ():CommandI[] => {
  if (!fs.existsSync(dataFilePath)) return [];
  const content = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(content);
};

const writeData = (data: CommandI[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

ipcMain.handle("read-data", () => readData());

ipcMain.handle("create-data", (_: unknown, item: Omit<CommandI, "id">) => {
  const itemCreated = { ...item, id: Date.now() };
  const data = readData();
  data.push(itemCreated);
  writeData(data);
});

ipcMain.handle("update-data", (_: unknown, updatedItem:CommandI) => {
  let data = readData();
  data = data.map((item: CommandI) =>
    item.id === updatedItem.id ? updatedItem : item,
  );
  writeData(data);
});

ipcMain.handle("delete-data", (_: unknown, id:number) => {
  const data = readData().filter((item) => item.id !== id);
  writeData(data);
});
