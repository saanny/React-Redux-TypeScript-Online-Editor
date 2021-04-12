import "./add-cell.css";
import { useActions } from "../hooks/use-actions";
interface AddCellProps {
  nextCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertBeforeCell } = useActions();
  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBeforeCell(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};
export default AddCell;
