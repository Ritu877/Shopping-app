import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Admin() {
  const navigate = useNavigate();
  const [odersdata, setodersdata] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const goOnAddItems = () => {
    navigate("/additems");
  };

  const logOut = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };
 
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/orders");
    const data = await res.json();
    setodersdata(data);
  };
  let admin = localStorage.getItem('admin');
  console.log(admin);
  return (
    <>
    { admin ? (<div>
        <div className="text-center m-5 bg-warning p-2">
          <span className="font-weight-bolder display-5 lead">
            Admin Pannel
          </span>
        </div>
        <div className="container ">
          <div className="text-end ">
            <button
              className="btn btn-info text-white btn-lg me-3 "
              onClick={goOnAddItems}
            >
              Add Items
            </button>
            <button className="btn btn-info text-white btn-lg" onClick={logOut}>
              Logout
            </button>
          </div>
        </div>
        <div>
          {odersdata.length !== 0 ? (
            <div className="container">
              <h5 className="font-weight-bolder mb-5">All Orders</h5>
              <table class="table">
                <thead>
                  <tr className="bg-info text-white">
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price Per Item</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {odersdata.map((data) => {
                    return data.map((item) => {
                      return (
                        <>
                          <tr>
                            <td>{item.productname}</td>
                            <td>{item.count}</td>
                            <td>
                              {item.price} {item.quantityname}
                            </td>
                            <td>{item.price * item.count} rs.</td>
                          </tr>
                        </>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center mt-5 display-6">
              No Orders Available!!
            </div>
          )}
        </div>
      </div>

    ):(
      
<p  className=" text-centre">  page not found </p>
    ) }
      
    </>
  );
}
export default Admin;
