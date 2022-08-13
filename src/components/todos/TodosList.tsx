import React, { FC, useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Input, Button } from "@mui/material";
import CompletedTodos from "./CompetedTodos";
import axios from "axios";

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
  const [completedTodo, setCompletedTodo] = useState<foundTodoType>([]);

  // DELETE TODO
  const deleteTdo = (id: number) => {
    axios.delete(`http://localhost:4002/todos/${id}`);

    // mutating state storage as opposed to json
    // const newTodos = todos.filter((todo: any) => todo.id !== id);
    // setTodos(newTodos);
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
    axios.put(`http://localhost:4002/todos/${id}`, {
      title: userInput,
      completed: false,
    });

    //muating state storage as opposed to json
    // const editedTask = todos.filter((todo: any) => todo.id === id);

    // editedTask[0].title = userInput;
    setEdit(false);
  };

  //save to localstorage
  const savetoLocal = () => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodo));
  };

  //get from localstorage
  const getFromLocal = () => {
    if (localStorage.getItem("completedTodos") === null) {
      localStorage.setItem("completedTodos", JSON.stringify(completedTodo));
    } else {
      const localTodos = JSON.parse(
        localStorage.getItem("completedTodos") || "{}"
      );
      setCompletedTodo(localTodos);
    }
  };

  //COMPLETED TODOS

  const todoCompleted = (id: number) => {
    const foundTodo: foundTodoType = todos.filter(
      (todo: any) => todo.id === id
    );
    setCompletedTodo([...completedTodo, ...foundTodo]);
    deleteTdo(id);
  };

  //save to local upon render
  useEffect(() => {
    if (completedTodo.length > 0) {
      savetoLocal();
    }
  }, [completedTodo]);

  //get from local upon render
  useEffect(() => {
    getFromLocal();
  }, []);

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
                        <th className="border text-xl">Completed</th>
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
                        <td className="border cursor-pointer">
                          <Button onClick={() => todoCompleted(todo.id)}>
                            set completed
                          </Button>
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
                            placeholder={todo.title}
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
      <CompletedTodos
        setCompletedTodo={setCompletedTodo}
        completedTodo={completedTodo}
      />
      {completedTodo.length < 1 && (
        <h2 className="text-xl">No completed todos</h2>
      )}
    </div>
  );
};

export default TodosList;
