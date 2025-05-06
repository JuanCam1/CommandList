import type { Dispatch, FC, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { CommandI } from "types/global";
import CommandForm from "@/sections/command-form";

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalCreate: FC<Props> = ({ open, setIsOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-background border-accent">
        <DialogHeader>
          <DialogTitle className="text-center dark:text-white">
            Agregar Comando
          </DialogTitle>
        </DialogHeader>
        <CommandForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreate;
