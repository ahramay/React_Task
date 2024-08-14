import { useDispatch, useSelector } from "react-redux";
import { RootState, updateFinancialInfo } from "../../Features/Features";
import { useFormik } from "formik";
import { financialInfoSchema } from "../../Schema/Schema";
import toast from "react-hot-toast";

const FinancialInformation = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const financialInfo:any = useSelector((state:RootState) => state.financialInfo);
  
  interface FormValues {
    occupation: string;
    annualIncome: string;
    sourceOfWealth: string;
  };

  const initalValues: FormValues = {
    occupation: financialInfo.occupation ? financialInfo.occupation : "",
    annualIncome: financialInfo.annualIncome ? financialInfo.annualIncome : "",
    sourceOfWealth: financialInfo.sourceOfWealth ? financialInfo.sourceOfWealth : "",
  };

  const Formik = useFormik({
    initialValues: initalValues,
    validationSchema: financialInfoSchema,
    onSubmit: (values) => {
      toast.success("Everything is Cleared!");
      dispatch(updateFinancialInfo(values));
    },
  });
  
  return (
    <div>
      <p className="font-[600] h-[40px] flex items-center text-[22px]">
        Financial Information
      </p>
      <p className="text-[15px] font-[500] text-gray-500">
        Fill in your financial information to help us speed up the verication
        process.
      </p>
      <form
        className="mt-[30px] flex flex-col gap-5"
        onSubmit={Formik.handleSubmit}
      >
        <div className="flex-1 flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Occupation*
          </label>
          <input
            placeholder="Occupation"
            name="occupation"
            value={Formik.values.occupation}
            onChange={Formik.handleChange}
            className={`text-[15px] font-[500] border  focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
              darkMode
                ? "text-gray-300 border-gray-700"
                : "text-black border-gray-300"
            }`}
          />
          {Formik.touched.occupation && Formik.errors.occupation && (
            <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
              {Formik.errors.occupation}
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
              Annual Income*
            </label>
            <select
              name="annualIncome"
              value={Formik.values.annualIncome}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            >
              <option className="text-gray-500" value={""}>---Select---</option>
              <option value={"$30,001 - $60,0000"}>$30,001 - $60,0000</option>
              <option value={"$60,0001 - $100,000"}>$60,0001 - $100,000</option>
              <option value={"$100,0001 - $150,000"}>$100,0001 - $150,000</option>
              <option value={"$150,001 - $200,000"}>$150,001 - $200,000</option>
              <option value={"$200,001 - $300,000"}>$200,001 - $300,000</option>
              <option value={"$More than $300,000"}>$More than $300,000</option>
            </select>
            {Formik.touched.annualIncome && Formik.errors.annualIncome && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.annualIncome}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              className={`font-[600] text-[15px] ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Source Of Wealth*
            </label>
            <select
              name="sourceOfWealth"
              value={Formik.values.sourceOfWealth}
              onChange={Formik.handleChange}
              className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-black border-gray-300"
              }`}
            >
              <option className="text-gray-500">---Select---</option>
              <option>Saving</option>
              <option>Salary</option>
              <option>Investment Earning</option>
              <option>Busniess Profit</option>
            </select>
            {Formik.touched.sourceOfWealth && Formik.errors.sourceOfWealth && (
              <p className="text-[11px] font-[500] text-[red] mt-[-5px]">
                {Formik.errors.sourceOfWealth}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end my-5">
          <button
            type="submit"
            className="h-[40px] px-5 rounded-[8px] shadow-md bg-[--sidebar-color] text-gray-200 font-[500] text-[17px] w-[max-content]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialInformation;
