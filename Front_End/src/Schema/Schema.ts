import { number, object, string } from "yup";

export const personalInfoSchema = object({
    firstname: string().required("First Name is required"),
    lastname: string().required("Last Name is required"),
    email: string().email().required("Email is required"),
    gender: string().required("Gender is required"),
    martialStatus: string().required("Martial Status is required"),
    nationality: string().required("Nationality is required"),
    phoneNumber: number().required("Phone Number is Required"),
    dob: string().required("Date Of Birth is Required")
});

export const addressInfoSchema = object({
    country: string().required("Country is required"),
    addressLine1: string().required("Address Line 1 is required"),
    addressLine2: string().required("Address Line 2 is required"),
    city: string().required("City is required"),
    state: string().required("State is required"),
    zipCode: string().required("Zip Code is required"),
});

export const financialInfoSchema = object({
    occupation: string().required("Occupation is required"),
    annualIncome: string().required("Annual Income is required"),
    sourceOfWealth: string().required("Source Of Wealth is required"),
});