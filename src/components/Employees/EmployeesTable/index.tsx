import React, { useEffect, useMemo, useState } from "react";
import { Employee, StyledFC } from "../../../_shared/types";
import styled from "styled-components";
import EmployeeRow from "./EmployeeRow";
import AddNewEmployeeForm from "./AddNewEmployeeForm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteEmployees } from "../../../redux/companiesSlice";
import { Button, Checkbox } from "semantic-ui-react";
import ConfirmModal from "../../_shared/ConfirmModal";

const EmployeesTable: StyledFC<{ employees: Employee[] }> = ({
  className,
  employees,
}) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(
    (state) => state.companiesList.pickedCompany
  );
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>(
    (function () {
      const initial: { [key: string]: boolean } = {};
      for (const employee of employees) {
        initial[employee.id] = false;
      }

      return initial;
    })()
  );
  const [requestConfirm, setRequestConfirm] = useState(false);

  useEffect(() => {
    const newToAdd: { [key: string]: boolean } = {};
    for (const employee of employees) {
      if (!(employee.id in checkedRows)) {
        newToAdd[employee.id] = false;
      }
    }
    setCheckedRows((state) => ({ ...state, ...newToAdd }));
  }, [employees]);

  const checkAll: "none" | "some" | "all" = useMemo(() => {
    const vals = Object.values(checkedRows);
    return vals.every((v) => v)
      ? "all"
      : vals.every((v) => !v)
      ? "none"
      : "some";
  }, [employees, checkedRows]);

  const handleCheckAll = () => {
    setCheckedRows((state) => {
      const newState = { ...state };
      for (const row in newState) {
        newState[row] = true;
      }
      return newState;
    });
  };

  const handleUnCheckAll = () => {
    setCheckedRows((state) => {
      const newState = { ...state };
      for (const row in newState) {
        newState[row] = false;
      }
      return newState;
    });
  };

  const showDelete = useMemo(() => {
    return Object.values(checkedRows).some((v) => v);
  }, [checkedRows]);

  const handleToggle = (val: boolean, id: string) => {
    setCheckedRows((state) => {
      const newState = { ...state };
      newState[id] = val;
      return newState;
    });
  };

  const handleDeleteCompany = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setRequestConfirm(true);
  };

  const confirmDeletion = () => {
    if (companyId) {
      dispatch(
        deleteEmployees({
          id: Object.entries(checkedRows)
            .filter(([k, v]) => v)
            .map(([k, v]) => k),
          companyId: companyId,
        })
      );
      setCheckedRows({});
    }
    setRequestConfirm(false);
  };

  const closeModal = () => {
    setRequestConfirm(false);
  };

  return (
    <div className={className}>
      {showDelete && (
        <>
          <Button
            negative
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              handleDeleteCompany(e)
            }
          >
            Удалить выбранные
          </Button>
          <Button primary onClick={() => setCheckedRows({})}>
            Убрать выделение
          </Button>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th className={"check-box"}>
              <Checkbox
                label={"Выделить все"}
                fitted
                defaultChecked={false}
                checked={checkAll === "all"}
                indeterminate={checkAll === "some"}
                onClick={() =>
                  checkAll === "all" ? handleUnCheckAll() : handleCheckAll()
                }
              />
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Должность</th>
            <th className={"controls"} />
          </tr>
        </thead>
        <tbody>
          <AddNewEmployeeForm />
          {employees.map((v) => (
            <EmployeeRow
              key={v.id}
              {...v}
              checked={!!checkedRows[v.id]}
              setChecked={(value) => handleToggle(value, v.id)}
            />
          ))}
        </tbody>
      </table>
      {requestConfirm && (
        <ConfirmModal
          onClose={closeModal}
          onCancel={closeModal}
          onConfirm={confirmDeletion}
          msg={`Вы действительно хотите удалить выбранные элементы?`}
        />
      )}
    </div>
  );
};

export default styled(EmployeesTable)`
  table {
    collapse: no-collapse;
    background-color: white;
    border-collapse: collapse;
    width: 600px;
    table-layout: fixed;
    min-width: 600px;
    
    thead {
      th {
        height: 40px;
      }
    }
  }
  }

  tr:nth-child(even) {
    background-color: #f5f5f5;

    &:hover {
      background-color: #e0e0e0;
    }
  }
  .check-box {
    width: 70px;
  }

.checked-row {
  background-color: beige !important;
}
  .controls {
    width: 80px;
  }
`;
