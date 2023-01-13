import React, { useState } from "react";
import { Company, StyledFC } from "../../../_shared/types";
import styled from "styled-components";
import { useAppDispatch } from "../../../redux/store";
import {
  deleteCompanies,
  editCompany,
  pickCompany,
} from "../../../redux/companiesSlice";
import { Checkbox, Icon, Input } from "semantic-ui-react";
import ConfirmModal from "../../_shared/ConfirmModal";

const CompanyRow: StyledFC<
  Company & { checked: boolean; setChecked: (value: boolean) => void }
> = ({ className, checked, setChecked, name, employees, address, id }) => {
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState({ name, address });
  const [requestConfirm, setRequestConfirm] = useState(false);

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(editCompany({ ...formValues, id }));
    setEdit(false);
  };

  const handleCancelSave = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setFormValues({ name, address });
    setEdit(false);
  };

  const handleDeleteCompany = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setRequestConfirm(true);
  };

  const confirmDeletion = () => {
    dispatch(deleteCompanies([id]));
    setRequestConfirm(false);
  };

  const closeModal = () => {
    setRequestConfirm(false);
  };

  return (
    <tr className={`${className} ${checked ? "checked-row" : ""}`}>
      {!edit ? (
        <>
          <td
            onClick={(e) => {
              e.stopPropagation();
              setChecked(!checked);
            }}
          >
            <Checkbox checked={checked} />
          </td>
          <td onClick={() => dispatch(pickCompany(id))}>{formValues.name}</td>
          <td onClick={() => dispatch(pickCompany(id))}>{employees.length}</td>
          <td onClick={() => dispatch(pickCompany(id))}>
            {formValues.address}
          </td>
          <td onClick={() => dispatch(pickCompany(id))}>
            <div>
              <Icon
                name={"edit"}
                color={"blue"}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.stopPropagation();
                  setEdit((state) => !state);
                }}
              />
              <Icon
                name={"trash"}
                color={"red"}
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleDeleteCompany(e)
                }
              />
            </div>
          </td>
        </>
      ) : (
        <>
          <td>-</td>
          <td>
            <Input
              value={formValues.name}
              onChange={(e) =>
                setFormValues((state) => ({ ...state, name: e.target.value }))
              }
            />
          </td>
          <td>{employees.length}</td>
          <td>
            <Input
              value={formValues.address}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  address: e.target.value,
                }))
              }
            />
          </td>
          <td>
            <div>
              <Icon
                name={"save"}
                color={"green"}
                onClick={(e: React.MouseEvent<HTMLElement>) => handleSave(e)}
              />{" "}
              <Icon
                name={"close"}
                color={"red"}
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleCancelSave(e)
                }
              />
            </div>
          </td>
        </>
      )}
      {!!requestConfirm && (
        <ConfirmModal
          onClose={closeModal}
          onCancel={closeModal}
          onConfirm={confirmDeletion}
          msg={`Вы действительно хотите удалить ${name}?`}
        />
      )}
    </tr>
  );
};

export default styled(CompanyRow)`
  td {
    height: 50px;
    min-height: 50px;
    word-break: break-word;
    width: 200px;
    text-align: center;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    padding: 10px 0;
  }

  td:last-child {
    & > div {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: space-around;
    }
  }

  cursor: pointer;

  &:nth-child(even) {
    background-color: #f5f5f5;
    &:hover {
      background-color: #e0e0e0;
    }
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;
