import React from "react";

export type StyledFC<T = {}> = React.FC<T & { className?: string }>;

export type Employee = {
  id: string;
  name: string;
  surname: string;
  position: string;
};

export type Company = {
  id: string;
  name: string;
  address: string;
  employeeSize: number;
  employees: Employee[];
};
