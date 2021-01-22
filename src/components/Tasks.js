import Task from './Task';
const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((item) => (
        <Task
          key={item.id}
          task={item}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
