import type { CommandI } from "types/global";

export const commandsData: CommandI[] = [
  {
    id: 1,
    name: "create react",
    description: "create project react with tanstack router and tailwind",
    command: "npx create-react-app my-app --template typescript",
    type: "command",
  },
];
