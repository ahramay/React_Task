import { Outlet } from "react-router-dom";
import PagesHeader from "../../Components/PagesHeader/PagesHeader";

const Product = () => {
  return (
    <div className="flex-1">
      <PagesHeader title="Product Management" nav={"Product"} />
      <div className="mx-[15px] mt-[15px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Product;
