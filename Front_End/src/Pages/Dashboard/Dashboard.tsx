import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import { RootState, updatePageNavigation } from "../../Features/Features";
import { RiStore2Line } from "react-icons/ri";

const Dashboard = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);
  useEffect(() => {
    dispatch(updatePageNavigation("dashboard"));
  }, [dispatch]);
  return (
    <div className="flex-1">
      <PagesHeader title="Dashboard" nav={"Home"} />
      <div className="flex gap-[30px] justify-between m-[20px]">
        <div
          className={`flex-1 border min-w-[300px] p-[20px] min-h-[200px] rounded-3xl shadow-xl ${
            darkMode ? "bg-[--sidebar-color]" : "bg-white"
          }`}
        >
          <div className="bg-gray-300 h-[60px] w-[60px] rounded-[8px] mb-5 flex items-center justify-center">
            <RiStore2Line className="text-[35px]" />
          </div>
          <p className={`text-[20px] font-[600] ${darkMode ? "text-gray-200" : "text-[--sidebar-color]"}`}>
            Total Products
          </p>
          <p className={`text-[30px] font-[700] mt-[-5px] ${darkMode ? "text-white" : "text-black"}`}>200</p>
        </div>
        <div
          className={`flex-1 min-w-[300px] min-h-[200px] rounded-3xl shadow-xl ${
            darkMode ? "bg-[--sidebar-color]" : "bg-white"
          }`}
        ></div>
        <div
          className={`flex-1 min-w-[300px] min-h-[200px] rounded-3xl shadow-xl ${
            darkMode ? "bg-[--sidebar-color]" : "bg-white"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
