import { useDispatch, useSelector } from "react-redux";
import { RootState, updateAccountNav, updateAddressInfo } from "../../Features/Features";
import { useFormik } from "formik";
import { addressInfoSchema } from "../../Schema/Schema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressInfo:any = useSelector((state:RootState) => state.addressInfo);
  const darkMode = useSelector((state: RootState) => state.darkMode);

  interface FormValues {
    country: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  const initalValues: FormValues = {
    country: addressInfo?.country ? addressInfo?.country : "",
    addressLine1: addressInfo?.addressLine1 ? addressInfo?.addressLine1 : "",
    addressLine2: addressInfo?.addressLine2 ? addressInfo?.addressLine2 : "",
    city: addressInfo?.city ? addressInfo?.city : "",
    state: addressInfo?.state ? addressInfo?.state : "",
    zipCode: addressInfo?.zipCode ? addressInfo?.zipCode : "",
  };
  
  const Formik = useFormik({
    initialValues: initalValues,
    validationSchema: addressInfoSchema,
    onSubmit: (values) => {
      toast.success("2nd Step Cleared!");
      dispatch(updateAccountNav("financial"));
      dispatch(updateAddressInfo(values));
      navigate("/setting/financial-information");
    },
  });

  return (
    <div>
      <p className="font-[600] h-[40px] flex items-center text-[22px]">
        Address Information
      </p>
      <p className="text-[15px] font-[500] text-gray-500">
        Enter your address information help us to speed up the verication
        process.
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
              Country*
            </label>
            <input
              placeholder="Country"
              name="country"
              value={Formik.values.country}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border  focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.country && Formik.errors.country && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.country}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Address Line 1*
            </label>
            <input
              placeholder="Address Line 1"
              name="addressLine1"
              value={Formik.values.addressLine1}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.addressLine1 && Formik.errors.addressLine1 && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.addressLine1}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Address Line 2*
            </label>
            <input
              placeholder="Address Line 2"
              name="addressLine2"
              value={Formik.values.addressLine2}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border  focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.addressLine2 && Formik.errors.addressLine2 && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.addressLine2}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              City*
            </label>
            <input
              placeholder="City"
              name="city"
              value={Formik.values.city}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.city && Formik.errors.city && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.city}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              State*
            </label>
            <input
              placeholder="State"
              name="state"
              value={Formik.values.state}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border  focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.state && Formik.errors.state && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.state}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Zip Code*
            </label>
            <input
              placeholder="Zip Code"
              name="zipCode"
              value={Formik.values.zipCode}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            />
            {Formik.touched.zipCode && Formik.errors.zipCode && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.zipCode}
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

export default AddressInformation;
