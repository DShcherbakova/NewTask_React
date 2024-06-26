const root = ReactDOM.createRoot(document.getElementById("root"));

const Task = ({ id, title, del, isChecked, onToggle }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const [updatedTask, setUpdatedTask] = React.useState(title);

  const textRef = React.useRef();

  const handleClickSave = () => {
    setUpdatedTask(textRef.current.value);
    setIsEdit(false);
  };

  return isEdit ? (
    <>
      <div className="task-container">
        <textarea ref={textRef} defaultValue={updatedTask}></textarea>
        <button className="btn green" onClick={handleClickSave}>
          Save
        </button>
      </div>
    </>
  ) : (
    <div className="border border-black border-1 w-50" style={{ margin: "0 auto" }}>
      <p className={isChecked ? "checked" : ""} style={{ marginTop: "5px" }}>
        {updatedTask}
      </p>
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={onToggle}/>
      <div className="d-flex justify-content-between mt-auto mb-3">
        <button className="btn beige flex-fill mx-1" onClick={() => setIsEdit(true)}>Edit</button>
        <button className="btn red flex-fill mx-1" onClick={() => del(id)}>Delete</button>
      </div>
    </div>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = React.useState([
    { id: Math.random(), title: "Сделать домашку!", isChecked: false },
    { id: Math.random(), title: "Заварить чай!!", isChecked: false },
    { id: Math.random(), title: "Купить книги!", isChecked: false },
  ]);

  const [newTask, setNewTask] = React.useState("");

  const toggleTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isChecked: !task.isChecked } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Math.random(), title: newTask, isChecked: false }]);
      setNewTask("");
    }
  };


  return (
    <>
      <h1 className="text-center" style={{ margin: "50px" }}>
        Todo List App
      </h1>
      <div style={{ margin: "0 auto" }} className="w-50 d-flex">
      <input
          className="form-control"
          value={newTask.title}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите новую задачу..."
        />
        <button
          style={{ width: "160px" }}
          className="btn btn-secondary"
          onClick={addTask}>Add Task</button>
      </div>
      <div className="d-flex flex-column text-center">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isChecked={task.isChecked}
            onToggle={() => toggleTask(task.id)}
            del={deleteTask}
          />
        ))}
      </div>
    </>
  );
};

root.render(<TaskList />);