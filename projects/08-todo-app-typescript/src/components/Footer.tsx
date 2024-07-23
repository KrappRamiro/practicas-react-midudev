import { FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount = 0, // La cantidad de tareas activas
  completedCount = 0, // La cantidad de tareas completadas
  filterSelected,
  handleFilterChange,
  onClearCompleted, // la funcion a llamar cuando queramos borrar las completadas
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount} tareas pendientes</strong>
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      ></Filters>

      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Borrar completadas
        </button>
      )}
    </footer>
  );
};
