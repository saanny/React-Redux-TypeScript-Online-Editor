import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id) => {
      return cells.data[id];
    });
  });
  const renderdCells = cells?.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));
  return <div>{renderdCells}</div>;
};
export default CellList;
