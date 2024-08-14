import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../URL";
import toast from "react-hot-toast";

async function fn_createApi(data: any) {
  try {
    const response = await axios.post(`${apiUrl}/product`, data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function fn_personalInfo(data: any) {
  try {
    const response = await axios.put(`${apiUrl}/multiplefrom/stepOne`, {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      gender: data.gender,
      maritalstatus: data.martialStatus,
      maritalStatus: data.martialStatus,
      nationality: data.nationality,
      phoneNumber: data.phoneNumber,
      birth: data.dob,
    });
    console.log("personal data  => ", response);
  } catch (error) {
    console.log(error);
  }
}

async function fn_addressInfo(data: any) {
  try {
    const response = await axios.put(`${apiUrl}/multiplefrom/stepTwo`, data);
    console.log("address data  => ", response);
  } catch (error) {
    console.log(error);
  }
}

async function fn_financialInfo(data: any) {
  try {
    const response = await axios.put(`${apiUrl}/multiplefrom/stepThree`, data);
    console.log("financial data  => ", response);
  } catch (error) {
    console.log(error);
  }
}

async function fn_editApi(data: any) {
  const id = data.get("id");
  const response = await axios.patch(`${apiUrl}/product/${id}`, data);
  console.log(response);
  if (response?.status === 200) {
    toast.success("Product Updated Successfully");
  }
}

interface FeaturesState {
  showSideBar: boolean;
  pageNavigate: string;
  darkMode: boolean;
  openProductMenu: boolean;
  accountSubNav: string;
  personalInfo: object;
  addressInfo: object;
  financialInfo: object;
  product: object;
  editProduct: object;
}

const initialState: FeaturesState = {
  showSideBar: false,
  pageNavigate: "dashboard",
  darkMode: false,
  openProductMenu: false,
  accountSubNav: "personal",
  personalInfo: {},
  addressInfo: {},
  financialInfo: {},
  product: {},
  editProduct: {},
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updateSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSideBar = action.payload;
    },
    updatePageNavigation: (state, action: PayloadAction<string>) => {
      state.pageNavigate = action.payload;
    },
    updateWebMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    updateProductMenu: (state, action: PayloadAction<boolean>) => {
      state.openProductMenu = action.payload;
    },
    updateAccountNav: (state, action: PayloadAction<string>) => {
      state.accountSubNav = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<object>) => {
      state.personalInfo = action.payload;
      fn_personalInfo(action.payload);
    },
    updateAddressInfo: (state, action: PayloadAction<object>) => {
      state.addressInfo = action.payload;
      fn_addressInfo(action.payload);
    },
    updateFinancialInfo: (state, action: PayloadAction<object>) => {
      state.financialInfo = action.payload;
      fn_financialInfo(action.payload);
    },
    updateProduct: (state, action: PayloadAction<object>) => {
      state.product = action.payload;
      fn_createApi(action.payload);
    },
    updateEditProduct: (state, action: PayloadAction<object>) => {
      state.editProduct = action.payload;
      fn_editApi(action.payload);
    },
  },
});

export const {
  updateSidebar,
  updatePageNavigation,
  updateWebMode,
  updateProductMenu,
  updateAccountNav,
  updatePersonalInfo,
  updateAddressInfo,
  updateFinancialInfo,
  updateProduct,
  updateEditProduct,
} = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
export type RootState = ReturnType<typeof featuresReducer>;
