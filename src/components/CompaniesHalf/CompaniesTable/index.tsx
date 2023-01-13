import React, { useEffect, useMemo, useState } from "react";
import { Company, StyledFC } from "../../../_shared/types";
import CompanyRow from "./CompanyRow";
import styled from "styled-components";
import AddNewCompanyForm from "./AddNewCompanyForm";
import { Button, Checkbox } from "semantic-ui-react";
import { deleteCompanies } from "../../../redux/companiesSlice";
import { useAppDispatch } from "../../../redux/store";
import ConfirmModal from "../../_shared/ConfirmModal";

const CompaniesTable: StyledFC<{ companies: Company[] }> = ({
  className,
  companies,
}) => {
  const dispatch = useAppDispatch();

  // TODO duplicated code in tables
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>(
    (function () {
      const initial: { [key: string]: boolean } = {};
      for (const company of companies) {
        initial[company.id] = false;
      }

      return initial;
    })()
  );
  const [requestConfirm, setRequestConfirm] = useState(false);

  useEffect(() => {
    const newToAdd: { [key: string]: boolean } = {};
    for (const company of companies) {
      if (!(company.id in checkedRows)) {
        newToAdd[company.id] = false;
      }
    }
    setCheckedRows((state) => ({ ...state, ...newToAdd }));
  }, [companies]);

  const checkAll: "none" | "some" | "all" = useMemo(() => {
    const vals = Object.values(checkedRows);
    return vals.every((v) => v)
      ? "all"
      : vals.every((v) => !v)
      ? "none"
      : "some";
  }, [companies, checkedRows]);

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
    dispatch(
      deleteCompanies(
        Object.entries(checkedRows)
          .filter(([k, v]) => v)
          .map(([k, v]) => k)
      )
    );
    handleUnCheckAll();
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
          <Button primary onClick={() => handleUnCheckAll()}>
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
                checked={checkAll === "all"}
                indeterminate={checkAll === "some"}
                onClick={() =>
                  checkAll === "all" ? handleUnCheckAll() : handleCheckAll()
                }
              />
            </th>
            <th>Название</th>
            <th className={"employees"}>Кол-во сотрудников</th>
            <th>Адрес</th>
            <th className={"controls"}>-</th>
          </tr>
        </thead>
        <tbody>
          <AddNewCompanyForm />
          {companies.map((v) => (
            <CompanyRow
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

export default styled(CompaniesTable)`
  table {
    collapse: no-collapse;
    background-color: white;
    border-collapse: collapse;
    width: 600px;
    table-layout: fixed;
    thead {
      th {
        height: 40px;
      }
  }
    
    .checked-row {
      background-color: beige !important;
    }

  .add-button {
    width: 100%;
  }

  .check-box {
    width: 70px;
  }

  .employees {
    width: 60px;
  }

  .controls {
    width: 80px;
  }
`;
