import React, { FC } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import { Button } from "@mui/material";
import { TodayRounded } from "@mui/icons-material";

type propTypes = {
  completedTodo: {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
  }[];
  setCompletedTodo: any;
};

//REMOVE COMPLETED TODOS
const CompetedTodos: FC<propTypes> = ({ completedTodo, setCompletedTodo }) => {
  const deleteCompletedTodo = (id: number) => {
    const foundItem = completedTodo.filter((todo: any) => todo.id !== id);

    setCompletedTodo(foundItem);
    localStorage.setItem("completedTodos", JSON.stringify(foundItem));
  };

  return (
    <div>
      <h1 className="text-4xl mt-10 ">Completed Todos</h1>
      {completedTodo?.map((todo: any) => {
        return (
          <div className="flex justify-center mt-10" key={todo.id}>
            <s>
              <p className="text-xl">{todo.title}</p>
            </s>
            <DoneOutlineIcon style={{ color: "green" }} />
            <Button onClick={() => deleteCompletedTodo(todo.id)}>remove</Button>
          </div>
        );
      })}
    </div>
  );
};

export default CompetedTodos;
