import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import AutoDropDown from "./util/autoDropDown";
import DocumentDataService from "./services/DocumentDataService";
import AuthenticationService from "./services/AuthenticationService";

function DeleteCustomer(props) {
  const [customerName, setCustomerName] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [documentData, setDocumentData] = React.useState({
    username: AuthenticationService.getLoggedInUserName(),
    status: "",
    customerName: "",
    customerAddress: "",
    standard: "",
    inwardDate: "",
    suppliersName: "",
    productDescription: "",
    rm1: "",
    rm1_Percent: 0,
    rm2: "",
    rm2_Percent: 0,
    rm3: "",
    rm3_Percent: 0,
    rm4: "",
    rm4_Percent: 0,
    composition: "",
    tcNumber: "",
    netWtKG: 0,
    openingStock: 0,
    lotPoNo: "",
    finishedProduct: "",
    organicName: "",
    blend1Name: "",
    blend2Name: "",
    blend3Name: "",
    nonCertified1Name: "",
    nonCertified2Name: "",
    nonCertified3Name: "",
    nonCertified4Name: "",
    organicPercent: 0,
    recyclePre: 0,
    recyclePost: 0,
    blend1Percent: 0,
    blend2Percent: 0,
    blend3Percent: 0,
    nonCertified1Percent: 0,
    nonCertified2Percent: 0,
    nonCertified3Percent: 0,
    nonCertified4Percent: 0,
    organicFinished: 0,
    recyclePreFinished: 0,
    recyclePostFinished: 0,
    organicLoss: 0,
    recyclePreLoss: 0,
    recyclePostLoss: 0,
    organicCheck: 0,
    recyclePreCheck: 0,
    recyclePostCheck: 0,
    blend1Check: 0,
    blend2Check: 0,
    blend3Check: 0,
    nonCertified1Check: 0,
    nonCertified2Check: 0,
    nonCertified3Check: 0,
    nonCertified4Check: 0,
    accessoriesWt: 0,
    grossWtKg: 0,
    netWtKgFinished: 0,
    buyerName: "",
    invoiceNumber: "",
    invoiceDate: "",
    transportDocNumber: "",
    transportDocDate: "",
    qtySold: 0,
    documentUpload1: [],
    documentUpload2: [],
    documentUpload3: [],
    documentUpload4: [],
    documentUpload5: [],
    documentValidate1: false,
    documentValidate2: false,
    documentValidate3: false,
    documentValidate4: false,
    documentValidate5: false,
    certifiedRawMaterialKg: 0,
    finishedProductKG: 0,
    finalTcNumber: "",
  });

  useEffect(() => {
    if (customerName) {
      console.log("useeffect");
      DocumentDataService.getCustomerData(customerName)
        .then((response) => {
          if (response) {
            setDocumentData(response.data);
          } else {
            toast.error("Unable to fetch customer");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [customerName]);

  const fetchResult = async (searchquery) => {
    await DocumentDataService.fetchFilteredCustomerList(searchquery).then(
      (res) => {
        if (res) {
          setCustomers(res);
        } else {
          toast.error("Unable to fetch customer list");
        }
      }
    );
  };

  const debounceFetch = useCallback(
    _.debounce((q) => fetchResult(q), 500),
    []
  );

  const customerSearch = (event, value) => {
    console.log("customersarch");
    debounceFetch(value);
    console.log(value);
  };

  const handleChange = (event, val, ref) => {
    console.log("handleChange");
    const name =
      event.target.name == null
        ? ref.current.getAttribute("name")
        : event.target.name;
    const value = event.target.name == null ? val : event.target.value;
    setCustomerName(value);
  };

  return (
    <React.Fragment>
      <div style={{ display: "block" }}>
        <AutoDropDown
          fieldName={"customerName"}
          name={"Customer Name"}
          newValue={false}
          multipleVal={false}
          dropDownValues={customers.map((customers) => customers.customerName)}
          onInputChange={customerSearch}
          handleChange={handleChange}
          currentVal={customerName}
        />
      </div>
    </React.Fragment>
  );
}

export default DeleteCustomer;
