import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, Employee } from "../_shared/types";
import { v4 as uuidv4 } from "uuid";

interface CompaniesState {
  list: Company[];
  pickedCompany: string | null;
}

const initial: Company[] = [
  {
    id: uuidv4(),
    name: "Авито",
    address: "Ул. Пушкина д. Колотушкина",
    employeeSize: 2,
    employees: [
      {
        name: "Anton",
        surname: "Petrov",
        id: uuidv4(),
        position: "CEO",
      },
      {
        name: "Alex",
        surname: "Suvorov",
        id: uuidv4(),
        position: "CTO",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Яндекс",
    address: "Ул. Душкина д. Полотушкина",
    employeeSize: 2,
    employees: [
      {
        name: "Sergay",
        surname: "Vasiliev",
        id: uuidv4(),
        position: "CEO",
      },
      {
        name: "Dmitri",
        surname: "Polivkin",
        id: uuidv4(),
        position: "CTO",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "СберЗвук",
    address: "Ул. Душкина д. Полотушкина",
    employeeSize: 2,
    employees: [
      {
        name: "Ignat",
        surname: "Vasiliev",
        id: uuidv4(),
        position: "Hr",
      },
      {
        name: "Dmitri",
        surname: "Solnevoi",
        id: uuidv4(),
        position: "HEAD",
      },
      {
        name: "Oleg",
        surname: "Vodonaev",
        id: uuidv4(),
        position: "CTO",
      },
      {
        name: "Sol",
        surname: "Goodman",
        id: uuidv4(),
        position: "Marketing",
      },
      {
        name: "Vlad",
        surname: "Bumaga",
        id: uuidv4(),
        position: "UI/UX Designer",
      },
    ],
  },
];

const cache = window.localStorage.getItem("companies");

const initialState: CompaniesState = {
  list: cache ? JSON.parse(cache) : [...initial],
  pickedCompany: null,
};

export const companies = createSlice({
  name: "companiesSlice",
  initialState: initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company>) => {
      window.localStorage.setItem(
        "companies",
        JSON.stringify([...state.list, action.payload])
      );
      state.list = [...state.list, action.payload];
    },
    pickCompany: (state, action: PayloadAction<string | null>) => {
      state.pickedCompany = action.payload;
    },
    editCompany: (
      state,
      action: PayloadAction<{ name: string; address: string; id: string }>
    ) => {
      const idx = state.list.findIndex((v) => v.id === action.payload.id);
      state.list[idx] = {
        ...state.list[idx],
        name: action.payload.name,
        address: action.payload.address,
      };
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.list.unshift(action.payload);
    },
    deleteCompanies: (state, action: PayloadAction<string[]>) => {
      if (action.payload.length === 1) {
        const idx = state.list.findIndex((v) => v.id === action.payload[0]);
        state.list.splice(idx, 1);
      } else {
        state.list = state.list.filter((v) => !action.payload.includes(v.id));
      }
    },
    addEmployee: (
      state,
      action: PayloadAction<{ data: Employee; companyId: string }>
    ) => {
      const idx = state.list.findIndex(
        (v) => v.id === action.payload.companyId
      );
      state.list[idx].employees.unshift(action.payload.data);
    },
    deleteEmployees: (
      state,
      action: PayloadAction<{ id: string[]; companyId: string }>
    ) => {
      if (action.payload.id.length === 1) {
        const companyIdx = state.list.findIndex(
          (v) => v.id === action.payload.companyId
        );
        const empIdx = state.list[companyIdx].employees.findIndex(
          (v) => v.id === action.payload.id[0]
        );

        state.list[companyIdx].employees.splice(empIdx, 1);
      } else {
        const companyIdx = state.list.findIndex(
          (v) => v.id === action.payload.companyId
        );

        state.list[companyIdx].employees = state.list[
          companyIdx
        ].employees.filter((v) => !action.payload.id.includes(v.id));
      }
    },
    editEmployee: (
      state,
      action: PayloadAction<{ data: Employee; companyId: string }>
    ) => {
      const companyIdx = state.list.findIndex(
        (v) => v.id === action.payload.companyId
      );
      const empIdx = state.list[companyIdx].employees.findIndex(
        (v) => v.id === action.payload.data.id
      );

      state.list[companyIdx].employees[empIdx] = action.payload.data;
    },
  },
});

export const {
  setCompanies,
  pickCompany,
  editCompany,
  addCompany,
  deleteCompanies,
  addEmployee,
  deleteEmployees,
  editEmployee,
} = companies.actions;

export default companies;
