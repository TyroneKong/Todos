import React, { FC, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Input, Button } from "@mui/material";

type propTypes = {
  todos: {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
  }[];
  setTodos: any;
};

type foundTodoType = {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}[];

const TodosList: FC<propTypes> = ({ todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [singleTodo, setSingleTodo] = useState<foundTodoType>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [done, setDone] = useState(false);

  // DELETE TODO
  const deleteTdo = (id: number) => {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodos);
  };

  //EDIT TODO
  const editTodo = (id: number) => {
    setEdit(true);
    const foundTodo: foundTodoType = todos.filter(
      (todo: any) => todo.id === id
    );
    setSingleTodo(foundTodo);
  };

  //SAVE TODO
  const saveTodo = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    const editedTask = todos.filter((todo: any) => todo.id === id);
    const taskItems = [...editedTask];

    taskItems[0].title = userInput;
    setEdit(false);
  };

  return (
    <div className="mt-10 gap-10 flex flex-col 	">
      {!edit
        ? todos
            .sort((a, b) => b.id - a.id)
            .map((todo: any) => {
              return (
                <div key={todo.id}>
                  <table className="border-6 border-slate-100 shadow-xl w-8/12 hover:bg-emerald-600 bg-white ">
                    <tbody>
                      <tr className="border">
                        <th className="border text-xl">ID</th>
                        <th className="border text-xl w-2/5">Task</th>
                        <th className="border text-xl ">Edit</th>
                        <th className="border text-xl">Delete</th>
                      </tr>
                      <tr>
                        <td className="border">{todo.id}</td>

                        <td className="border text-xl">{todo.title}</td>

                        <td className="border">
                          <EditIcon
                            className="cursor-pointer"
                            onClick={() => editTodo(todo.id)}
                            fontSize="large"
                            style={{ color: "blue" }}
                          />
                        </td>
                        <td>
                          <DeleteOutlineOutlinedIcon
                            className="cursor-pointer"
                            onClick={() => deleteTdo(todo.id)}
                            fontSize="large"
                            style={{ color: "red" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })
        : singleTodo.map((todo: any) => {
            return (
              <div key={todo.id}>
                <table className="border-4 shadow-xl mb-10 w-8/12 bg-white">
                  <tbody>
                    <tr className="border ">
                      <th className="border text-xl ">ID</th>
                      <th className="border text-xl">Task</th>
                    </tr>
                    <tr>
                      <td className="border">{todo.id}</td>

                      <td className="border">
                        <form onSubmit={(e) => saveTodo(e, todo.id)}>
                          <Input
                            value={userInput}
                            type="text"
                            onChange={(e) =>
                              setUserInput(e.currentTarget.value)
                            }
                            required
                          ></Input>
                          <div className="mt-10">
                            <Button type="submit" variant="contained">
                              done
                            </Button>
                            <Button onClick={() => setEdit(false)}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
    </div>
  );
};

export default TodosList;
