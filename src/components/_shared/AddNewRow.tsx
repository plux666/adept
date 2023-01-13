import React from "react";
import { StyledFC } from "../../_shared/types";
import styled from "styled-components";

const AddNewRow: StyledFC<{ onClick: () => void; title: string }> = ({
  className,
  onClick,
  title,
}) => {
  return (
    <tr className={className}>
      <td
        colSpan={5}
        className={"add-button"}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {title}
      </td>
    </tr>
  );
};

export default styled(AddNewRow)`
  text-align: center;
  background-color: #00b5db;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
  color: white;

  td {
    padding: 10px 0;
    cursor: pointer;
  }

  &:hover {
    background-color: #0c8ff2;
  }
`;
