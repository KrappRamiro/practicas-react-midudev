import { useState } from "react";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import {
  type Todo as TodoType,
  type ListOfTodos,
  type TodoID,
  FilterValue,
  TodoTitle,
} from "./types";
import { TODO_FILTERS } from "./consts";
import { Header } from "./components/Header";

const mockTodos: ListOfTodos = [
  {
    id: "1",
    title: "Ver el twitch de midudev",
    completed: true,
  },
  {
    id: "2",
    title: "Aprender React con TypeScript",
    completed: false,
  },
  {
    id: "3",
    title: "Sacar el ticket de la midufest",
    completed: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  ); //no podemos usar useState(TODO_FILTERS.ALL) porque sino va a pensar que solamente se puede usar "all". Cosa rara

  const handleRemove = ({ id }: TodoID) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleComplete = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}></Header>
      <Todos
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleComplete}
        todos={filteredTodos}
      ></Todos>
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  );
};

export default App;
