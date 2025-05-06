import { contextBridge, ipcRenderer } from "electron";
import type { CommandI } from "types/global";

contextBridge.exposeInMainWorld("api", {
  readData: () => ipcRenderer.invoke("read-data"),
  createData: (item: CommandI) => ipcRenderer.invoke("create-data", item),
  updateData: (item: CommandI) => ipcRenderer.invoke("update-data", item),
  deleteData: (id: string) => ipcRenderer.invoke("delete-data", id),
});
