import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import { Input, Button } from "@mui/material";
import { getTodos } from "../../functions/functions";
import TodosList from "../todos/TodosList";
import axios from "axios";

type todos = {
  id: number;
  title: string;
  completed: boolean;
};

const Form: FC = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [userInput, setUserInput] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  console.log("parent rendered!");

  const fetchTodos = () => {
    getTodos().then((response: any) => setTodos(response));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  //ADD TODO
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postRequest();
    setTodos(todos);

    // setTodos([
    //   ...todos,
    //   { id: todos.length + 1, title: userInput, completed: false },
    // ]);

    formRef.current?.reset();
  };

  const postRequest = () => {
    axios.post("http://localhost:4002/todos", {
      title: userInput,
      completed: false,
    });
    fetchTodos();
  };

  return (
    <>
      <form ref={formRef} onSubmit={(e) => addTodo(e)}>
        <Input
          placeholder="enter todo..."
          onChange={(e) => setUserInput(e.currentTarget.value)}
          required
        ></Input>

        <Button type="submit" variant="contained">
          Add todo
        </Button>
      </form>
      <TodosList fetchTodos={fetchTodos} setTodos={setTodos} todos={todos} />
    </>
  );
};

export default Form;
