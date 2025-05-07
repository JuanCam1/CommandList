import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import type { Dispatch, SetStateAction, FC } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
const Search: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-1/3 min-w-[400px] border-1 border-neutral-400 rounded-md">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="pl-8 border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
