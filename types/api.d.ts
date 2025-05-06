declare global {
  interface Window {
    api: {
        readData: () => Promise<CommandI[]>,
        createData: (item: CommandI) => Promise<void>, 
        updateData: (item: CommandI) => Promise<void>, 
        deleteData: (id: number) => Promise<void>, 
    };
  }
}

export { };
