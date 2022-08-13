import React, { FC, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

type propTypes = {
  completedTodo: {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
  }[];
};

const CompetedTodos: FC<propTypes> = ({ completedTodo }) => {
  return (
    <div>
      <h1 className="text-4xl mt-10 ">Completed Todos</h1>
      {completedTodo?.map((todo: any) => {
        return (
          <div className="flex justify-center mt-10" key={todo.id}>
            <s>
              <p className="text-xl">{todo.title}</p>
            </s>{" "}
            <DoneOutlineIcon style={{ color: "green" }} />
          </div>
        );
      })}
    </div>
  );
};

export default CompetedTodos;
