import React, { useState } from "react";
import { Employee, StyledFC } from "../../../_shared/types";
import styled from "styled-components";
import { deleteEmployees, editEmployee } from "../../../redux/companiesSlice";
import { Checkbox, Icon, Input } from "semantic-ui-react";
import ConfirmModal from "../../_shared/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const EmployeeRow: StyledFC<
  Employee & { checked: boolean; setChecked: (value: boolean) => void }
> = ({ className, checked, setChecked, name, surname, position, id }) => {
  const dispatch = useAppDispatch();

  const companyId = useAppSelector(
    (state) => state.companiesList.pickedCompany
  );

  const [edit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState({ name, surname, position });
  const [requestConfirm, setRequestConfirm] = useState(false);

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (companyId) {
      dispatch(
        editEmployee({ data: { ...formValues, id }, companyId: companyId })
      );
      setEdit(false);
    }
  };

  const handleCancelSave = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setFormValues({ name, surname, position });
    setEdit(false);
  };

  const handleDeleteEmployee = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setRequestConfirm(true);
  };

  const confirmDeletion = () => {
    if (companyId)
      dispatch(deleteEmployees({ companyId: companyId, id: [id] }));
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
          <td>{formValues.name}</td>
          <td>{formValues.surname}</td>
          <td>{formValues.position}</td>
          <td>
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
                color={"red"}
                name={"trash"}
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleDeleteEmployee(e)
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
              size={"mini"}
              value={formValues.name}
              onChange={(e) =>
                setFormValues((state) => ({ ...state, name: e.target.value }))
              }
            />
          </td>
          <td>
            <Input
              size={"mini"}
              value={formValues.surname}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  surname: e.target.value,
                }))
              }
            />
          </td>
          <td>
            <Input
              size={"mini"}
              value={formValues.position}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  position: e.target.value,
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
                color={"red"}
                name={"close"}
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

export default styled(EmployeeRow)`
  td {
    height: 50px;
    min-height: 50px;
    word-break: break-word;
    width: 200px;
    text-align: center;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
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

  &:hover {
    background-color: #e0e0e0;
  }
`;
