import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  image: string;
  name: string;
  age: number;
  price: number;
}

import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import { updatePageNavigation } from "../../Features/Features";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl, imageUrl } from "../../URL";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const fn_getProducts = async () => {
    const response = await axios.get(`${apiUrl}/product`);
    setProductData(response?.data?.results);
  };

  useEffect(() => {
    dispatch(updatePageNavigation("product-list"));
    fn_getProducts();
  }, [dispatch]);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (productData?.length > 0) {
      const updatedData = productData.map((item: any) => ({
        key: item?.id,
        image: item?.images[0], // Assuming img is defined elsewhere in your component
        name: item?.productName,
        age: item?.productCode,
        price: item?.productPrice,
      }));

      setData(updatedData); // Update state once with the complete array
    }
  }, [productData]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img
          src={`${imageUrl}/${text}`}
          alt="Product"
          style={{ width: 50, height: 50, borderRadius: "6px" }}
        />
      ),
      ellipsis: true,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Product Code",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Product Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/product/product-edit?id=${record.key}`)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => fn_deleteImage(record.key)}
            danger
          />
        </div>
      ),
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSortedInfo(sorter as Sorts);
  };

  const fn_deleteImage = async (id: any) => {
    const response = await axios.delete(`${apiUrl}/product/${id}`);
    if (response?.status === 200) {
      const updatedData = data.filter((item: any) => item.key !== id);
      setData(updatedData);
      return toast.success("Product Deleted");
    } else {
      return toast.error("Network Error");
    }
  };

  return (
    <div className="flex-1">
      <PagesHeader title="Product List" nav={"Product / Product List"} />
      <div className="mx-[15px] mt-[15px]">
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          scroll={{ y: 400 }}
          sticky
        />
      </div>
    </div>
  );
};

export default ProductList;
