import type { Dispatch, FC, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommandForm from "@/sections/command-form";

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalCreate: FC<Props> = ({ open, setIsOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] border-neutral-400 bg-white dark:bg-zinc-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-center ">Agregar Comando</DialogTitle>
        </DialogHeader>
        <CommandForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreate;
