import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import { RootState, updatePageNavigation, updateProduct } from "../../Features/Features";
import { IoCloseCircle, IoImageSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const { quill, quillRef } = useQuill();
  const [images, setImages] = useState<string[]>([]);
  const [imageObjects, setImageObjects] = useState<File[]>([]);

  useEffect(() => {
    dispatch(updatePageNavigation("new-product"));
  }, [dispatch]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(fileArray));
      setImageObjects((prevImageObjects) =>
        prevImageObjects.concat(Array.from(files))
      );
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageObjects((prevImageObjects) =>
      prevImageObjects.filter((_, i) => i !== index)
    );
  };

  const initialValues = {
    images: [],
    name: "",
    code: "",
    description: "",
    price: "",
    discount: "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (
        values.name === "" ||
        values.code === "" ||
        values.price === "" ||
        values.description === ""
      ) {
        toast.error("Fill all Required Fields");
        return;
      }
      if (imageObjects.length === 0) {
        toast.error("Select Images");
        return;
      }
      const formData = new FormData();
      formData.append("productName", values.name);
      formData.append("productCode", values.code);
      formData.append("productDescription", values.description);
      formData.append("productPrice", values.price);
      formData.append("productDiscount", values.discount);

      imageObjects.forEach((image) => {
        formData.append("images", image);
      });
      dispatch(updateProduct(formData));
      toast.success("Product Added Successfully");
      navigate("/product/product-list");
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        Formik.setFieldValue("description", quill.root.innerHTML);
      });
    }
  }, [quill, Formik]);

  return (
    <div className="flex-1">
      <PagesHeader title="Add New Product" nav={"Product / Add"} />
      <form
        className="m-[15px] flex flex-col gap-3"
        onSubmit={Formik.handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Product Image*
          </label>
          {images?.length === 0 && (
            <div
              className={`h-[200px] border border-dashed rounded-[8px] cursor-pointer flex gap-2 justify-center items-center flex-col ${
                darkMode ? "border-gray-200" : "border-black"
              }`}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <IoImageSharp
                className={`text-[50px] ${
                  darkMode ? "text-gray-200" : "text-black"
                }`}
              />
              <p
                className={`text-[17px] font-[500] ${
                  darkMode ? "text-gray-200" : "text-black"
                }`}
              >
                Choose Image
              </p>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          {images?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[150px] h-[150px] bg-cover bg-center border border-black rounded-[8px]"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <IoCloseCircle
                    className="absolute top-0 right-0 text-white bg-red-500 rounded-full text-[24px] cursor-pointer"
                    onClick={() => removeImage(index)}
                  />
                </div>
              ))}
              <div
                className="relative w-[150px] h-[150px] border border-black rounded-[8px] flex flex-col gap-3 justify-center items-center cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <IoImageSharp
                  className={`text-[30px] ${
                    darkMode ? "text-gray-200" : "text-black"
                  }`}
                />
                <p
                  className={`text-center text-[15px] font-[600] leading-4 ${
                    darkMode ? "text-gray-200" : "text-black"
                  }`}
                >
                  Upload More Images
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Product Name*
          </label>
          <input
            placeholder="Product Name"
            name="name"
            value={Formik.values.name}
            onChange={Formik.handleChange}
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Product Code*
          </label>
          <input
            placeholder="Product Code"
            name="code"
            value={Formik.values.code}
            onChange={Formik.handleChange}
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Description*
          </label>
          <div style={{ width: "100%", height: 200 }}>
            <div ref={quillRef} onChange={(e) => console.log(e)} />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-[90px] sm:mt-[65px] xl:mt-[40px]">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Product Price*
          </label>
          <div
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent flex gap-3 items-center ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            <p>$</p>
            <input
              type="number"
              placeholder="Product Price"
              className={`focus:outline-none bg-transparent w-full ${
                darkMode ? "text-gray-300" : "text-black"
              }`}
              name="price"
              value={Formik.values.price}
              onChange={Formik.handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-[600] text-[15px] ${
              darkMode ? "text-gray-200" : "text-black"
            }`}
          >
            Discount (%)
          </label>
          <div
            className={`text-[15px] font-[500] border focus:outline-none h-[40px] rounded-[8px] px-[15px] bg-transparent flex gap-3 items-center ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            <input
              type="number"
              placeholder="Discount Percent"
              className={`focus:outline-none bg-transparent w-full ${
                darkMode ? "text-gray-300" : "text-black"
              }`}
              name="discount"
              value={Formik.values.discount}
              onChange={Formik.handleChange}
            />
            <p>%</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[--sidebar-color] h-[50px] rounded-[8px] shadow-md text-gray-200 font-[500] my-[10px]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
