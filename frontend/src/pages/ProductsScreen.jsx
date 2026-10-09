import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    saveProduct,
    listProducts,
    deleteProduct
} from "../redux/slices/productSlice.js";

function ProductsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const productSave = useSelector(state => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { success: successDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
    }, [dispatch, successSave, successDelete]);

    const openModal = product => {
        setModalVisible(true);
        setId(product._id || "");
        setName(product.name || "");
        setPrice(product.price || "");
        setDescription(product.description || "");
        setImage(product.image || "");
        setBrand(product.brand || "");
        setCategory(product.category || "");
        setCountInStock(product.countInStock || "");
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            })
        );
    };

    const deleteHandler = product => {
        dispatch(deleteProduct(product._id));
    };

    const inputClass = "rounded border border-gray-300 p-2";

    return (
        <div className="m-4">
            <div className="flex items-start justify-between">
                <h3 className="text-2xl">Products</h3>
                <button
                    className="cursor-pointer rounded-lg border-2 border-black bg-gold-light px-4 py-2 transition-colors duration-300 hover:bg-white"
                    onClick={() => openModal({})}
                >
                    Create Product
                </button>
            </div>
            {modalVisible && (
                <div className="my-4 flex justify-center">
                    <form onSubmit={submitHandler}>
                        <ul className="flex w-96 flex-col rounded-lg border-2 border-gray-100 p-8 list-none">
                            <li className="my-4">
                                <h2 className="text-2xl">
                                    {id ? "Update" : "Create"} Product
                                </h2>
                            </li>
                            <li className="my-4">
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div className="text-red-600">{errorSave}</div>}
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    name="name"
                                    id="name"
                                    onChange={e => setName(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    value={price}
                                    name="price"
                                    id="price"
                                    onChange={e => setPrice(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    value={image}
                                    name="image"
                                    id="image"
                                    onChange={e => setImage(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    value={brand}
                                    name="brand"
                                    id="brand"
                                    onChange={e => setBrand(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    name="category"
                                    id="category"
                                    onChange={e => setCategory(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input
                                    type="text"
                                    value={countInStock}
                                    name="countInStock"
                                    id="countInStock"
                                    onChange={e => setCountInStock(e.target.value)}
                                    className={inputClass}
                                ></input>
                            </li>
                            <li className="my-4 flex flex-col">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    value={description}
                                    id="description"
                                    name="description"
                                    onChange={e => setDescription(e.target.value)}
                                    className={inputClass}
                                ></textarea>
                            </li>
                            <li className="my-4">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border-2 border-black bg-gold-light p-4 transition-colors duration-300 hover:bg-white"
                                >
                                    {id ? "Update" : "Create"}
                                </button>
                            </li>
                            <li className="my-4">
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="w-full cursor-pointer rounded-lg border-2 border-black bg-gray-100 p-4 transition-colors duration-300 hover:bg-white"
                                >
                                    Back
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}

            <div className="mt-4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">Name</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Category</th>
                            <th className="text-left">Brand</th>
                            <th className="text-left">Count In Stock</th>
                            <th className="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product._id}
                                className={index % 2 === 0 ? "bg-gray-100" : ""}
                            >
                                <td>{product._id} </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <button
                                        className="mr-2 w-24 cursor-pointer rounded-lg border-2 border-black bg-gold-light p-1 transition-colors duration-300 hover:bg-white"
                                        onClick={() => openModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="w-24 cursor-pointer rounded-lg border-2 border-black bg-gray-100 p-1 transition-colors duration-300 hover:bg-white"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProductsScreen;
