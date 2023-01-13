import React, { useState } from "react";
import { StyledFC } from "../../_shared/types";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import CompaniesTable from "./CompaniesTable";
import { useAppSelector } from "../../redux/store";

const CompaniesHalf: StyledFC = ({ className }) => {
  const companiesList = useAppSelector((state) => state.companiesList.list);

  const [searchValue, setSearchValue] = useState("");

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
      <CompaniesTable
        companies={companiesList.filter((v) => v.name.includes(searchValue))}
      />
    </div>
  );
};

export default styled(CompaniesHalf)`
  width: 500px;

  .head {
    margin: 30px 0;
  }
`;
