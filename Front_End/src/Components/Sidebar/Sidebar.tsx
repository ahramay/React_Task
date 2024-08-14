/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 14/08/2024 - 04:07:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2024
    * - Author          : 
    * - Modification    : 
**/
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  updateAccountNav,
  updateProductMenu,
  updateSidebar,
} from "../../Features/Features";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaSellsy } from "react-icons/fa6";
import { BiSolidDashboard, BiSolidEdit } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiListMagnifyingGlass } from "react-icons/pi";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSidebar = useSelector((state: RootState) => state.showSideBar);
  const pageNavigate = useSelector((state: RootState) => state.pageNavigate);
  const openProductMenu = useSelector(
    (state: RootState) => state.openProductMenu
  );
  const fn_controlSidebar = () => {
    dispatch(updateSidebar(false));
  };
  interface fn_navigationToProps {
    nav: string;
  }
  const fn_navigationTo = (props: fn_navigationToProps): void => {
    navigate(props.nav);
  };
  return (
    <div
      className={`${
        !showSidebar && "hidden"
      } absolute lg:relative lg:block w-[270px] bg-[var(--sidebar-color)] text-white min-h-screen z-[999]`}
    >
      <div className="relative h-[70px] border-b border-[var(--border-color)] flex items-center px-5">
        <p
          className="absolute end-5 w-[30px] h-[30px] flex lg:hidden items-center justify-center rounded cursor-pointer text-[--border-color]"
          onClick={fn_controlSidebar}
        >
          <FaArrowLeft />
        </p>
        <p className="absolute">Logo</p>
      </div>
      <div className="m-5">
        <p className="text-[var(--border-color)] font-[600] text-[17px] mb-5 ps-2">
          Menus
        </p>
        <ul className="flex gap-2 flex-col">
          <li
            className={`${
              pageNavigate === "products" && "bg-[var(--border-color)]"
            } cursor-pointer p-2 rounded-[8px] hover:bg-[var(--border-color)] flex items-center justify-between gap-4`}
            onClick={() => {
              dispatch(updateProductMenu(!openProductMenu));
            }}
          >
            <div className="flex items-center gap-4">
              <FaSellsy className="scale-[1.3]" />
              Products
            </div>
            {openProductMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </li>
          {openProductMenu && (
            <>
              <li
                className={`${
                  pageNavigate === "product-list" && "bg-[var(--border-color)]"
                } cursor-pointer p-2 ps-11 rounded-[8px] hover:bg-[var(--border-color)] flex items-center gap-4`}
                onClick={() => fn_navigationTo({ nav: "/product/product-list" })}
              >
                <PiListMagnifyingGlass className="scale-[1.3]" />
                Product List
              </li>
              <li
                className={`${
                  pageNavigate === "product-edit" && "bg-[var(--border-color)]"
                } cursor-pointer p-2 ps-11 rounded-[8px] hover:bg-[var(--border-color)] flex items-center gap-4`}
                onClick={() => fn_navigationTo({ nav: "/product/product-edit" })}
              >
                <BiSolidEdit className="scale-[1.3]" />
                Product Edit
              </li>
              <li
                className={`${
                  pageNavigate === "new-product" && "bg-[var(--border-color)]"
                } cursor-pointer p-2 ps-11 rounded-[8px] hover:bg-[var(--border-color)] flex items-center gap-4`}
                onClick={() => fn_navigationTo({ nav: "/product/new-product" })}
              >
                <VscGitPullRequestCreate className="scale-[1.2]" />
                New Product
              </li>
            </>
          )}
          <li
            className={`${
              pageNavigate === "setting" && "bg-[var(--border-color)]"
            } cursor-pointer p-2 rounded-[8px] hover:bg-[var(--border-color)] flex items-center gap-4`}
            onClick={() => {
              fn_navigationTo({ nav: "/setting/personal-information" });
              dispatch(updateAccountNav("personal"));
            }}
          >
            <IoSettingsSharp className="scale-[1.2]" />
            Setting
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
