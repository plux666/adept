import React, { useState } from "react";
import { StyledFC } from "../../../_shared/types";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addEmployee } from "../../../redux/companiesSlice";
import { v4 as uuidv4 } from "uuid";
import AddNewForm from "../../_shared/AddNewForm";
import AddNewRow from "../../_shared/AddNewRow";

export type EmployeeFormData = {
  name: { label: "Имя"; value: "" };
  surname: { label: "Фамилия"; value: "" };
  position: { label: "Должность"; value: "" };
};

const initData: EmployeeFormData = {
  name: { label: "Имя", value: "" },
  surname: { label: "Фамилия", value: "" },
  position: { label: "Должность", value: "" },
};

const AddNewEmployeeForm: StyledFC = ({ className }) => {
  const dispatch = useAppDispatch();

  const companyId = useAppSelector(
    (state) => state.companiesList.pickedCompany
  );

  const [showForm, setShowForm] = useState(false);

  const handleSave = (data: EmployeeFormData) => {
    dispatch(
      addEmployee({
        companyId: companyId!,
        data: {
          id: uuidv4(),
          name: data.name.value,
          surname: data.surname.value,
          position: data.position.value,
        },
      })
    );
    setShowForm(false);
  };

  const handleCancelNClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <AddNewRow
        title={"Добавить нового сотрудника"}
        onClick={() => setShowForm(true)}
      />
      {!!showForm && (
        <AddNewForm<EmployeeFormData>
          onClose={handleCancelNClose}
          onCancel={handleCancelNClose}
          onSave={(data) => handleSave(data)}
          initialData={initData}
        />
      )}
    </>
  );
};

export default styled(AddNewEmployeeForm)``;
