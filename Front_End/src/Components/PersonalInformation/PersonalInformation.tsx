import { useDispatch, useSelector } from "react-redux";
import { RootState, updateAccountNav, updatePersonalInfo } from "../../Features/Features";
import { useFormik } from "formik";
import { personalInfoSchema } from "../../Schema/Schema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const personalInfo:any = useSelector((state:RootState) => state.personalInfo);
  const darkMode = useSelector((state: RootState) => state.darkMode);

  interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    martialStatus: string;
    nationality: string;
    phoneNumber: string;
    dob: string;
  }

  const initalValues: FormValues = {
    firstname: personalInfo?.firstname ? personalInfo?.firstname : "",
    lastname: personalInfo?.lastname ? personalInfo?.lastname : "",
    email: personalInfo?.email ? personalInfo?.email : "",
    gender: personalInfo?.gender ? personalInfo?.gender : "",
    martialStatus: personalInfo?.martialStatus ? personalInfo?.martialStatus : "",
    nationality: personalInfo?.nationality ? personalInfo?.nationality : "",
    phoneNumber: personalInfo?.phoneNumber ? personalInfo?.phoneNumber : "",
    dob: personalInfo?.dob ? personalInfo?.dob : "",
  };

  const Formik = useFormik({
    initialValues: initalValues,
    validationSchema: personalInfoSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("First Step Cleared!");
      dispatch(updateAccountNav("address"));
      dispatch(updatePersonalInfo(values));
      navigate("/setting/address-information");
    },
  });
  
  return (
    <div>
      <p className="font-[600] h-[40px] flex items-center text-[22px]">
        Personal Information
      </p>
      <p className="text-[15px] font-[500] text-gray-500">
        Basic information for an account opening
      </p>
      <form
        className="mt-[30px] flex flex-col gap-5"
        onSubmit={Formik.handleSubmit}
      >
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              First Name*
            </label>
            <input
              placeholder="First Name"
              name="firstname"
              value={Formik.values.firstname}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border  focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.firstname && Formik.errors.firstname && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.firstname}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Last Name*
            </label>
            <input
              placeholder="Last Name"
              name="lastname"
              value={Formik.values.lastname}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.lastname && Formik.errors.lastname && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.lastname}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Email*
          </label>
          <input
            placeholder="Email Address"
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
              darkMode
                ? "text-gray-300 border-gray-700"
                : "text-black border-gray-300"
            }`}
          />
          {Formik.touched.email && Formik.errors.email && (
            <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
              {Formik.errors.email}
            </p>
          )}
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Gender*
            </label>
            <select
              name="gender"
              value={Formik.values.gender}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            >
              <option className="text-gray-500">---Select---</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            {Formik.touched.gender && Formik.errors.gender && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.gender}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Martial Status*
            </label>
            <select
              name="martialStatus"
              value={Formik.values.martialStatus}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            >
              <option className="text-gray-500">---Select---</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Seperated</option>
              <option>Widowed</option>
            </select>
            {Formik.touched.martialStatus && Formik.errors.martialStatus && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.martialStatus}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Nationality*
          </label>
          <input
            placeholder="Nationality"
            name="nationality"
            value={Formik.values.nationality}
            onChange={Formik.handleChange}
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
              darkMode
                ? "text-gray-300 border-gray-700"
                : "text-black border-gray-300"
            }`}
          />
          {Formik.touched.nationality && Formik.errors.nationality && (
            <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
              {Formik.errors.nationality}
            </p>
          )}
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Phone Number*
            </label>
            <input
              placeholder="Phone Number"
              name="phoneNumber"
              value={Formik.values.phoneNumber}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.phoneNumber && Formik.errors.phoneNumber && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Date Of Birth*
            </label>
            <input
              type="date"
              placeholder="Date Of Birth"
              name="dob"
              value={Formik.values.dob}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.dob && Formik.errors.dob && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.dob}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end my-5">
          <button
            type="submit"
            className="h-[40px] px-5 rounded-[8px] shadow-md bg-[--sidebar-color] text-gray-200 font-[500] text-[17px] w-[max-content]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
