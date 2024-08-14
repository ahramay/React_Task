/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 14/08/2024 - 04:09:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2024
    * - Author          : 
    * - Modification    : 
**/
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

import { IoCloseCircle, IoImageSharp } from "react-icons/io5";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { apiUrl, imageUrl } from "../../URL";
import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import {
  RootState,
  updateEditProduct,
  updatePageNavigation,
} from "../../Features/Features";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id: any = searchParams.get("id");
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const { quill, quillRef } = useQuill();
  const [images, setImages] = useState<(string | File)[]>([]);
  const [newUploads, setNewUploads] = useState<File[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>([]);
  // const [imageObjects, setImageObjects] = useState<File[]>([]);

  const [product, setProduct] = useState<any>({});

  const fn_getProductById = async (id: any) => {
    try {
      const response = await axios.get(`${apiUrl}/product/${id}`);
      if (response?.status === 200) {
        setProduct(response?.data);
        setInitialImages(response?.data.images || []);
      } else {
        navigate("/product/product-list");
      }
    } catch (error) {
      navigate("/product/product-list");
    }
  };

  useEffect(() => {
    dispatch(updatePageNavigation("product-edit"));
    if (id === null) {
      navigate("/product/product-list");
    } else {
      fn_getProductById(id);
    }
  }, [dispatch, id, navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newFileURLs = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newFileURLs]);
      setNewUploads((prevUploads) => [...prevUploads, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    const removedImage = images[index];
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    if (typeof removedImage === "string") {
      // Remove image from initialImages if it was an existing image
      setInitialImages((prevImages) =>
        prevImages.filter((img) => img !== removedImage)
      );
    } else {
      // Remove new upload
      setNewUploads((prevUploads) => prevUploads.filter((_, i) => i !== index));
    }
  };

  const initialValues = {
    name: product?.productName || "",
    code: product?.productCode || "",
    description: product?.productDescription || "",
    price: product?.productPrice || "",
    discount: product?.productDiscount || "",
  };

  const Formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
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
      if (images.length === 0) {
        toast.error("Select or provide Images");
        return;
      }

      const formData = new FormData();
      formData.append("id", id);
      formData.append("productName", values.name);
      formData.append("productCode", values.code);
      formData.append("productDescription", values.description);
      formData.append("productPrice", values.price);
      formData.append("productDiscount", values.discount);


      initialImages.forEach((image) => formData.append("existingImages", image));
      newUploads.forEach((image) => formData.append("images", image));

      dispatch(updateEditProduct(formData));
      setTimeout(() => {
        navigate("/product/product-list");
      }, 1000);
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        Formik.setFieldValue("description", quill.root.innerHTML);
      });
    }
  }, [quill, Formik]);

  useEffect(() => {
    if (quill && product?.productDescription) {
      quill.clipboard.dangerouslyPasteHTML(product.productDescription);
    }
  }, [quill, product]);

  useEffect(() => {
    if (product?.images?.length) {
      const fetchedImages = product.images.map((img: string) => {
        console.log(img);
        if (img.split("d")[0] === "uploa") {
          return `${imageUrl}/${img}`;
        } else {
          return `${imageUrl}/upload/${img}`;
        }
      });
      setImages(fetchedImages);
    }
  }, [product, imageUrl]);

  return (
    <div className="flex-1">
      <PagesHeader title="Edit Product" nav={"Product / Edit"} />
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
                >
                  <IoCloseCircle
                    className="absolute top-0 right-0 text-white bg-red-500 rounded-full text-[24px] cursor-pointer"
                    onClick={() => removeImage(index)}
                  />
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    className="w-[100%] h-[100%] object-cover rounded-[8px]"
                    alt={`Product ${index}`}
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
            <div ref={quillRef} />
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
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
