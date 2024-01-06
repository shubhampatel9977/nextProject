import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  interface Item {
    productName: string;
    quantity: number;
    price: number;
  }

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/grocery/add/v1",
        {
          productName,
          quantity,
          price,
        }
      );

      // Reset form fields after successful submission
      if (response.data.api_status === 201) {
        setProductName("");
        setQuantity("");
        setPrice("");
        getProductList();
      }
    } catch (error: any) {
      // Handle error
      console.error("Error submitting form:", error.message);
    }
  };

  const getProductList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/grocery/list/v1");
      if (response.data.api_status === 200) {
        setProductList(response.data.data);
      }
    } catch (error: any) {
      // Handle error
      console.error("Error geting productList:", error.message);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <div className="main">
        <div className="heading">
          <h2>Grocery Inventory Management System</h2>
        </div>
        <div className="web-box">
          <form className="form-desing" onSubmit={submitForm}>
            <div className="form-inputs">
              <label htmlFor="productName">Grocery Name:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Grocery Name"
                required
              />
            </div>
            <div className="form-inputs">
              <label htmlFor="quantity">Grocery Quantity:</label>
              <div>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                >
                  <option value="">Select Grocery Quantity</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
            <div className="form-inputs">
              <label htmlFor="price">Grocery Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Grocery Price"
                required
              />
            </div>
            <div className="form-inputs">
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="table-desing">
            <table>
              <thead>
                <tr>
                  <th>Ids</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {productList.length ? (
                  productList.map((item: Item, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
