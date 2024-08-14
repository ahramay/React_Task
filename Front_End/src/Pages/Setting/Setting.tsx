import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  RootState,
  updateAccountNav,
  updatePageNavigation,
} from "../../Features/Features";
import { Link, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const Setting = () => {
  const dispatch = useDispatch();
  const accountSubNav = useSelector((state: RootState) => state.accountSubNav);
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const addressInfo = useSelector((state: RootState) => state.addressInfo);

  useEffect(() => {
    dispatch(updatePageNavigation("setting"));
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="w-[250px] p-4">
        <div className="mb-4 flex flex-col gap-2">
          <Link
            to="personal-information"
            className={`block py-2 font-[600] px-4 rounded ${
              accountSubNav === "personal" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => dispatch(updateAccountNav("personal"))}
          >
            Personal Information
          </Link>
          <Link
            to={
              Object.keys(personalInfo).length > 0
                ? "address-information"
                : "personal-information"
            }
            className={`block py-2 font-[600] px-4 rounded ${
              accountSubNav === "address" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              if (Object.keys(personalInfo).length === 0) {
                return toast.error("First Complete Personal Information");
              } else {
                dispatch(updateAccountNav("address"));
              }
            }}
          >
            Address Information
          </Link>
          <Link
          //@ts-ignore
            to={
              Object.keys(personalInfo).length === 0
                ? "personal-information"
                : Object.keys(addressInfo).length !== 0
                ? "financial-information"
                : null
            }
            className={`block py-2 font-[600] px-4 rounded ${
              accountSubNav === "financial"
                ? "bg-gray-300"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              if (Object.keys(personalInfo).length === 0) {
                return toast.error("First Complete Personal Information");
              } else if (Object.keys(addressInfo).length === 0) {
                return toast.error("First Complete Address Information");
              } else {
                dispatch(updateAccountNav("financial"));
              }
            }}
          >
            Financial Information
          </Link>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
