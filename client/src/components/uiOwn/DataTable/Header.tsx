import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import capitalise from "@/lib/capitalise";
import { type Column } from "@tanstack/react-table";

const Header = <T,>({ column, name }: { column: Column<T>; name?: string }) => {
  const isSorted = column.getIsSorted();

  const handleSortToggle = () => {
    // not sorted > asc > desc > not sorted
    if (isSorted === false) {
      column.toggleSorting(false); // Set to 'asc'
    } else if (isSorted === "asc") {
      column.toggleSorting(true); // Set to 'desc'
    } else if (isSorted === "desc") {
      column.clearSorting(); // Set to not sorted
    }
  };

  return (
    <Button //
      variant="ghost"
      onClick={() => handleSortToggle()}
    >
      {name ? name : capitalise(column.id)}
      {isSorted === false && <ArrowUpDown />}
      {isSorted === "asc" && <ArrowDown />}
      {isSorted === "desc" && <ArrowUp />}
    </Button>
  );
};

export default Header;
