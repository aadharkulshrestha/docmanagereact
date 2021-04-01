import { Button, TextField, withStyles } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import DocumentDataService from "./services/DocumentDataService";

const StyledTextField = withStyles({
  root: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    // paddingBottom: 0,
    marginTop: 10,
    fontWeight: 500,
    color: "red",
  },
})(TextField);

function AddNewProduct(props) {
  const [product, setProduct] = React.useState({
    serialNumber: "",
    productName: "",
  });

  const handleSubmit = (event) => {
    DocumentDataService.AddNewProduct(product)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleChange = (event) => {
    setProduct({
      productName: event.target.value,
    });
  };
  return (
    <React.Fragment>
      <div style={{ display: "block", width: "100%" }}>
        <h2>Enter Product Name</h2>
        <StyledTextField
          id="productName"
          name="productName"
          type="text"
          variant="outlined"
          label="Product Name"
          value={product.productName}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "green",
            margin: "20px",
            color: "white",
            float: "right",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}

export default AddNewProduct;
