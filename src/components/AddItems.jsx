import React from "react";
import  { useState } from "react";
import Items from "./Items";
import ButtonField from "./base/ButtonField";
import InputField from "./base/InputField";
import axios from "axios";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const itemObj = {
  productname: "",
  flavourname: "",
  quantityname: "",
  price: "",
  img: "",
};

function AddItems() {
  const [product, setproduct] = useState();
  const [variations, setVariations] = useState([]);
  const [numberOfVar, setNumberOfVar] = useState(0);
  const [allData, setAllData] = useState([]);
  const [isSaveButton, setIsSaveButton] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  function handle(e) {
    const {  id } = e.target;
    let files = e.target.files;
    let imageUrl = null;
    setFile(URL.createObjectURL(e.target.files[0]));

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      imageUrl = e.target.result;
      let varArr = cloneDeep(variations);
      const idArr = id.split("-");
      varArr[idArr[1]][idArr[0]] = imageUrl;
      setVariations([...varArr]);
    };
  }

  const handleChange = (e) => {
    const {  value, id } = e.target;
    let varArr = cloneDeep(variations);
    const idArr = id.split("-");
    varArr[idArr[1]][idArr[0]] = value;
    setVariations([...varArr]);
  };

  const ProductInput = (event) => {
    setproduct(event.target.value);
  };

  const PassIpnut = (event) => {
    setNumberOfVar(event.target.value);
  };

  function handleClick() {
    let varArr = [];
    for (let i = 0; i < numberOfVar; i++) {
      let id = uuidv4();
      varArr.push({ ...itemObj, id: id });
    }
    setVariations(varArr);
    setIsSaveButton(true);
  }

   const goOnAdmin = () => {
    navigate("/admin");
  };
   
  const handleSave = async (e) => {
    await axios.post(" http://localhost:5000/products", {
      variation: variations,
      productTitle: product,
      NoOfVariation: numberOfVar,
    });
    
    goOnAdmin();
  };
   
  let admin = localStorage.getItem('admin');

  return (
    <>
    
   
{ admin ?(
<>
<div className="text-center m-5 bg-warning p-2">
<p className="font-weight-bolder display-5 lead">
  Add Your Product
</p>
</div>

      <div className="container ">
        <div className="mt-5  gap-3" style={{ display: "flex" }}>
          <InputField
            type="text"
            placeholder="Enter Product Name"
            onChange={ProductInput}
          />
          <InputField
            type="number"
            placeholder="Enter No of Variation"
            onChange={PassIpnut}
          />
          <ButtonField label="Add" handleClick={handleClick} />
        </div>
        <div className="mt-5">
          <ul>
            {variations.map((variation, i) => {
              return (
                <Items
                  key={i}
                  item={variation}
                  number={i}
                  handleChange={handleChange}
                  value={allData}
                  handle={handle}
                />
              );
            })}
          </ul>
          {isSaveButton && (
            <ButtonField label={"Save"} handleClick={handleSave} />
          )}
        </div>
      </div>
      </>):(
  <p>Page not found</p>
)}
    
     
    </>
  );
}
export default AddItems;
