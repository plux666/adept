import React, { useState } from "react";
import { StyledFC } from "../../../_shared/types";
import styled from "styled-components";
import { useAppDispatch } from "../../../redux/store";
import { addCompany } from "../../../redux/companiesSlice";
import { v4 as uuidv4 } from "uuid";
import AddNewForm from "../../_shared/AddNewForm";
import AddNewRow from "../../_shared/AddNewRow";

export type FormData = {
  name: { label: "Название"; value: "" };
  address: { label: "Адрес"; value: "" };
};

const initData: FormData = {
  name: { label: "Название", value: "" },
  address: { label: "Адрес", value: "" },
};

const AddNewCompanyForm: StyledFC = ({ className }) => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  const handleSave = (data: FormData) => {
    dispatch(
      addCompany({
        id: uuidv4(),
        employees: [],
        employeeSize: 0,
        name: data.name.value,
        address: data.address.value,
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
        onClick={() => setShowForm(true)}
        title={"Добавить компанию"}
      />
      {showForm && (
        <AddNewForm<FormData>
          onClose={() => handleCancelNClose()}
          onCancel={() => handleCancelNClose()}
          onSave={(data) => handleSave(data)}
          initialData={initData}
        />
      )}
    </>
  );
};

export default styled(AddNewCompanyForm)``;
