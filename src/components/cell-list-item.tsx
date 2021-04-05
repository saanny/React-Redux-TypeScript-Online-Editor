import { Cell } from "../state";
import CodeCell from "./code-cell";
interface CellListItemProps {
  cell: Cell;
}
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};
export default CellListItem;
