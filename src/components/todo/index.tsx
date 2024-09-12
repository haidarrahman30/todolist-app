import { useTheme } from "@/context/theme";
import { formatDateForDisplay } from "@/helper/utils";
import { TUser, Todo as TodoType } from "@/type/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  { label: "Work", value: "work", color: "bg-amber-50" },
  { label: "Personal", value: "personal", color: "bg-red-200" },
  { label: "Health", value: "health", color: "bg-green-200" },
  { label: "Hobby", value: "hobby", color: "bg-sky-200" },
  { label: "Others", value: "others", color: "bg-rose-100" },
];

const Todo = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState(false);
  const { darkMode } = useTheme();
  const [taskData, setTaskData] = useState({
    task: "",
    reminder: "",
    category: "work",
    editTodo: null as TodoType | null,
  });
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);

      // Ambil todos yang disimpan untuk user ini
      const userTodos = localStorage.getItem(`${parsedUser.username}_todos`);
      if (userTodos) {
        const todos = JSON.parse(userTodos);
        setUser((prev) => (prev ? { ...prev, todos } : null));
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const updateUser = (updatedTodos: TodoType[]) => {
    if (!user) return;

    const updatedUser = { ...user, todos: updatedTodos };
    setUser(updatedUser);

    localStorage.setItem(
      `${user.username}_todos`,
      JSON.stringify(updatedTodos)
    );
  };

  const handleAddOrEditTask = () => {
    if (!user) return;

    if (taskData.task.trim() === "") {
      setError(true);
      return;
    }

    const { task, reminder, category, editTodo } = taskData;
    const newTodo: TodoType = {
      id: editTodo ? editTodo.id : user.todos.length + 1,
      task,
      reminder,
      category,
      completed: editTodo ? editTodo.completed : false,
    };

    const updatedTodos = editTodo
      ? user.todos.map((todo) => (todo.id === editTodo.id ? newTodo : todo))
      : [...user.todos, newTodo];

    updateUser(updatedTodos);
    setTaskData({ task: "", reminder: "", category: "work", editTodo: null });
    setError(false);

    const reminderTime = new Date(reminder).getTime();
    const now = new Date().getTime();
    const timeUntilReminder = reminderTime - now;

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        new Notification("Task Reminder", { body: `Reminder for: ${task}` });
      }, timeUntilReminder);
    }
  };

  const handleToggleCompletion = (id: number) => {
    if (!user) return;
    const updatedTodos = user.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateUser(updatedTodos);
  };

  const handleDeleteTask = (id: number) => {
    if (!user) return;
    updateUser(user.todos.filter((todo) => todo.id !== id));
  };

  const getCategoryColor = (category: string) =>
    categories.find((cat) => cat.value === category)?.color || "bg-gray-500";

  const handleInputChange = (field: string, value: string) => {
    setTaskData((prev) => ({ ...prev, [field]: value }));
  };

  const isEditMode = !!taskData.editTodo;

  if (!user) return null;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Set your list, {user.username}
      </h1>

      <div className="space-y-4 w-full max-w-md">
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Task
          </label>
          <input
            className={`w-full rounded-md border-gray-300 shadow-sm ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-gray-900"
            }`}
            placeholder="Enter task"
            value={taskData.task}
            onChange={(e) => handleInputChange("task", e.target.value)}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">Task is required</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Reminder
          </label>
          <input
            type="datetime-local"
            className={`w-full rounded-md border-gray-300 shadow-sm ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-gray-900"
            }`}
            value={taskData.reminder}
            onChange={(e) => handleInputChange("reminder", e.target.value)}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            Category
          </label>
          <select
            className={`w-full rounded-md border-gray-300 shadow-sm ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
            value={taskData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
          onClick={handleAddOrEditTask}
        >
          {isEditMode ? "Save Task" : "Add Task"}
        </button>
      </div>

      <ul className="mt-6 space-y-4 w-full max-w-3xl">
        {user.todos.map((todo) => (
          <li
            key={todo.id}
            className={`relative flex items-center p-2 border rounded-md ${getCategoryColor(
              todo.category
            )} `}
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
              checked={todo.completed}
              onChange={() => handleToggleCompletion(todo.id)}
            />
            <div
              className={`ml-2 flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <label className="font-medium">{todo.task}</label>
              <span className="px-2 py-1 ml-2 rounded-full text-xs font-semibold bg-blue-100">
                {todo.category}
              </span>
              <p className="text-gray-500">
                Reminder: {formatDateForDisplay(todo.reminder)}
              </p>
            </div>
            {!todo.completed ? (
              <>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={() =>
                    setTaskData({
                      ...taskData,
                      editTodo: todo,
                      task: todo.task,
                      reminder: todo.reminder,
                      category: todo.category,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                  onClick={() => handleDeleteTask(todo.id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button className="bg-blue-900 text-white px-2 py-1 rounded ml-2">
                Task Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
