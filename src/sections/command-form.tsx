import {
  type ChangeEvent,
  useState,
  type FC,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typeData } from "@/data/type-data";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const CommandForm: FC<Props> = ({ setIsOpen }) => {
  const router = useRouter();
  const [commandNew, setCommandNew] = useState({
    name: "",
    description: "",
    type: "",
    command: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await window.api.createData(commandNew);
      toast.success("Comando creado correctamente");
      setIsOpen(false);
      router.invalidate();
    } catch (error) {
      toast.error("Error al crear el comando");
      console.log(error);
      return "error";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCommandNew((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeType = (value: string) => {
    setCommandNew((prev) => ({ ...prev, type: value }));
  };

  return (
    <Card className="border-0">
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Título</Label>
            <Input
              id="name"
              name="name"
              value={commandNew.name}
              onChange={handleChange}
              className="dark:bg-zinc-950"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              value={commandNew.description}
              onChange={handleChange}
              className="dark:bg-zinc-950"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="command">Comando</Label>
            <Textarea
              id="command"
              name="command"
              value={commandNew.command}
              onChange={handleChange}
              required
              className="font-mono dark:bg-zinc-950"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <div className="flex gap-2">
              <Select
                name="type"
                value={commandNew.type}
                onValueChange={handleChangeType}
              >
                <SelectTrigger className="flex-1 dark:bg-zinc-950 dark:border-neutral-400 cursor-pointer">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent className="dark:bg-zinc-950">
                  {typeData.map((type) => (
                    <SelectItem
                      key={type.id}
                      value={type.value}
                      className="text-white"
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-6">
          <Button variant="outline" type="submit">
            Guardar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommandForm;
