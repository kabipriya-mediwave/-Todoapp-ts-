import { ITodo } from "../types";
import EditForm from "./EditTodo";
interface ITodoList {
  todos: ITodo[];
  extraCss?: string;
  handleDelete: (num: Number) => void;
  handleUpdate: (num: Number) => void;
  handleSaveClick: (num: Number, t: string) => void;
  setStrike: (updatedItems: ITodo[]) => void;
}

const TodoList: React.FC<ITodoList> = ({
  todos,
  extraCss,
  handleDelete,
  handleUpdate,
  handleSaveClick,
  setStrike,
}) => {
  const handleCheckboxChange = (id: Number) => {
    const updatedItems = todos.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    });
    setStrike(updatedItems);
  };
  return (
    <div className={extraCss}>
      <div className="list">
        {todos.map((t) => (
          <div key={t.id.toString()}>
            {t.isEdit ? (
              <>
                <EditForm item={t} handleSaveClick={handleSaveClick} />
              </>
            ) : (
              <div className="gap">
                <div className={t.isCompleted ? "strikethrough" : ""}>
                  <input
                    type="checkbox"
                    checked={t.isCompleted}
                    onChange={() => handleCheckboxChange(t.id)}
                  />
                  {t.text}
                  <button
                    className="deletebutton"
                    onClick={() => handleDelete(t.id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="editbutton"
                    onClick={() => handleUpdate(t.id)}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
