import React, { useState } from "react";
import { StyledFC } from "../../_shared/types";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import EmployeesTable from "./EmployeesTable";
import { useAppSelector } from "../../redux/store";

const Employees: StyledFC = ({ className }) => {
  const [searchValue, setSearchValue] = useState("");

  const pickedCompany = useAppSelector((state) =>
    state.companiesList.list.find(
      (v) => v.id === state.companiesList.pickedCompany
    )
  );

  return (
    <div className={className}>
      <div className={"head"}>
        <Input
          clearable
          label={"Поиск"}
          placeholder={"Поиск..."}
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </div>
      {!!pickedCompany && (
        <EmployeesTable
          employees={pickedCompany.employees.filter((v) =>
            `${v.name}${v.surname}${v.position}`.includes(searchValue)
          )}
        />
      )}
    </div>
  );
};

export default styled(Employees)`
  width: 500px;

  .head {
    margin: 30px;
  }
`;
