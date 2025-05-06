import type { CommandI } from "types/global";

export const readCommands = async () => {
  return await window.api.readData();
};

export const createCommand = async(command: CommandI) => {
  return await window.api.createData(command);
};

export const updateCommand = async(command: CommandI) => {
  return await window.api.updateData(command);
};

export const deleteCommand = async(id: string) => {
  return await window.api.deleteData(id);
};
