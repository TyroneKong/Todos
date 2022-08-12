import React, { FC, useState, useEffect, useRef } from "react";
import { Input, Button } from "@mui/material";
import { getTodos } from "../../functions/functions";
import TodosList from "../todos/TodosList";

type todos = {
  id: number;
  title: string;
  completed: boolean;
};

const Form: FC = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [userInput, setUserInput] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getTodos().then((response: any) => setTodos(response));
  }, []);

  //ADD TODO
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { id: todos.length + 1, title: userInput, completed: false },
    ]);
    formRef.current?.reset();
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
      <TodosList setTodos={setTodos} todos={todos} />
    </>
  );
};

export default Form;
