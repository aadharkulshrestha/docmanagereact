import {
  Button,
  Checkbox,
  colors,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  GridList,
  GridListTile,
  makeStyles,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  withStyles,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import * as Icon from "react-feather";
import FormData, { finished } from "form-data";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthenticationService from "./services/AuthenticationService";
import AutoDropDown from "./util/autoDropDown";
import DropDown from "./util/dropDown";
import DocumentDataService from "./services/DocumentDataService";
import { useLocation } from "react-router-dom";
import authService from "./services/authService";
import { Tooltip } from '@material-ui/core';
const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };

// const formControl =   { margin: theme.spacing(1), minWidth: 120 };
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));
const StyledTextField = withStyles({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 10,
    fontWeight: 500,
    color: "red",
  },
})(TextField);

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     width: "50%",
//     marginLeft: "auto",
//     marginRight: "auto",
//     paddingBottom: 0,
//     marginTop: 0,
//     fontWeight: 500,
//     color: "red",
//   },
//   input: {
//     fontWeight: 700,
//     color: "black",
//   },
//   labelRoot: {
//     fontSize: 20,
//     color: "grey",
//     "&$labelFocused": {
//       fontSize: 15,
//       color: "black",
//     },
//   },
//   labelFocused: {},
// }));

function getSteps () {
  return ['Customer Details', 'Raw Materials', 'Finished Material Composition','Finished Material Weight', 'Raw Material TC Number', 'Buyer Details','Balance Inventory'];
}

function MasterForm(props) {

  // const classes = useStyles();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [documentData, setDocumentData] = React.useState({
    username: authService.getCurrentUser().username,
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
    certifiedRawMaterialKg: 0,
    finishedProductKG: 0,
    FMStockOpening: 0,
    finalTcNumber: "",
  });
  const [customers, setCustomers] = useState([]);
  const [rawMats, setRawMats] = useState([]);
  const [standards, setStandards] = useState([]);
  // const classes = useStyles();  

  const [yarnStrength, setYarnStrength] = React.useState({
    yarn1: "",
    yarn2: "",
    yarn3: "",
    yarn4: "",
  });

  const [tcNos, setTcNos] = useState([]);
  const location = useLocation();

  const steps = getSteps();

  useEffect(() => {
    // console.log(location);
    if (location.data) {
      setDocumentData(location.data);
      setStandards([location.data.standard]);
    }
  }, [location]);

  const parseProperty = (param) => {
    if (param === null) {
      return 0;
    }
    if (typeof param === "number") {
      return param;
    } else {
      return param.length > 0 ? parseFloat(param) : 0;
    }
  };

  const handleWeightChange = (event, tcNo) => {
    const index = tcNos.findIndex((tcNum) => tcNum.tcNumber === tcNo.tcNumber);
    let newData = [...tcNos];
    newData[index] = { ...newData[index], tcWeight: event.target.value };
    setTcNos(newData);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (
      name === "rm1_Percent" ||
      name === "rm2_Percent" ||
      name === "rm3_Percent" ||
      name === "rm4_Percent"
    ) {
      let {
        rm1,
        rm2,
        rm3,
        rm4,
        rm1_Percent,
        rm2_Percent,
        rm3_Percent,
        rm4_Percent,
      } = documentData;
      let composition = "";
      let composition1 = "";
      let composition2 = "";
      let composition3 = "";
      let composition4 = "";
      rm1_Percent = parseProperty(rm1_Percent);
      rm2_Percent = parseProperty(rm2_Percent);
      rm3_Percent = parseProperty(rm3_Percent);
      rm4_Percent = parseProperty(rm4_Percent);

      composition1 =
        rm1_Percent != 0
          ? rm1_Percent + "% " + (name === "rm1" ? value : rm1)
          : "";
      composition2 =
        rm2_Percent != 0
          ? +rm2_Percent + "% " + (name === "rm2" ? value : rm2)
          : "";
      composition3 =
        rm3_Percent != 0
          ? +rm3_Percent + "% " + (name === "rm3" ? value : rm3)
          : "";
      composition4 =
        rm4_Percent != 0
          ? +rm4_Percent + "% " + (name === "rm4" ? value : rm4)
          : "";

      let obj = [];
      composition1.length > 0
        ? obj.push({
            display: composition1,
            name: name === "rm1" ? value : rm1,
          })
        : obj.push();
      composition2.length > 0
        ? obj.push({
            display: composition2,
            name: name === "rm2" ? value : rm2,
          })
        : obj.push();
      composition3.length > 0
        ? obj.push({
            display: composition3,
            name: name === "rm3" ? value : rm3,
          })
        : obj.push();
      composition4.length > 0
        ? obj.push({
            display: composition4,
            name: name === "rm4" ? value : rm4,
          })
        : obj.push();

      console.log(obj);
      obj.sort((a, b) => (a.name > b.name ? 1 : -1));
      let temp = obj.map((o) => o.display);
      composition = temp.join(" and ");
      setDocumentData({
        ...documentData,
        composition: composition,
      });
    } else if (name.includes("yarn")) {
      let { rm1, rm2, rm3, rm4 } = documentData;
      if (name === "yarn1") {
        rawMats.push(yarnStrength.yarn1 + " " + rm1);
        setDocumentData({
          ...documentData,
          rm1: yarnStrength.yarn1 + " " + rm1,
        });
      }
      if (name === "yarn2") {
        rawMats.push(yarnStrength.yarn2 + " " + rm2);
        setDocumentData({
          ...documentData,
          rm2: yarnStrength.yarn2 + " " + rm2,
        });
      } else if (name === "yarn3") {
        rawMats.push(yarnStrength.yarn3 + " " + rm3);
        setDocumentData({
          ...documentData,
          rm3: yarnStrength.yarn3 + " " + rm3,
        });
      } else if (name === "yarn4") {
        rawMats.push(yarnStrength.yarn4 + " " + rm4);
        setDocumentData({
          ...documentData,
          rm4: yarnStrength.yarn4 + " " + rm4,
        });
      }
    } else if (name === "tcNumber") {
      let { customerName, composition } = documentData;
      axios
        // .post("http://192.168.1.41:8080/getOpeningStock/", {
          .post("http://localhost:8080/getOpeningStock/", {

        customerName: customerName,
          composition: composition,
        })
        .then((response) => {
          console.log(response.data);
          setDocumentData({
            ...documentData,
            openingStock: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      name === "nonCertified1Percent" ||
      name === "nonCertified2Percent" ||
      name === "nonCertified3Percent" ||
      name === "nonCertified4Percent"
    ) {
      let {
        nonCertified1Percent,
        nonCertified2Percent,
        nonCertified3Percent,
        nonCertified4Percent,
        rm1_Percent,
        rm2_Percent,
        rm3_Percent,
        rm4_Percent,
      } = documentData;
      nonCertified1Percent = parseProperty(nonCertified1Percent);
      nonCertified2Percent = parseProperty(nonCertified2Percent);
      nonCertified3Percent = parseProperty(nonCertified3Percent);
      nonCertified4Percent = parseProperty(nonCertified4Percent);
      let sum =
        nonCertified1Percent +
        nonCertified2Percent +
        nonCertified3Percent +
        nonCertified4Percent;

      const rm1calc = (parseProperty(rm1_Percent) * (100 - sum)) / 100;
      const rm2calc = (parseProperty(rm2_Percent) * (100 - sum)) / 100;
      const rm3calc = (parseProperty(rm3_Percent) * (100 - sum)) / 100;
      const rm4calc = (parseProperty(rm4_Percent) * (100 - sum)) / 100;

      setDocumentData({
        ...documentData,
        organicPercent: rm1calc,
        blend1Percent: rm2calc,
        blend2Percent: rm3calc,
        blend3Percent: rm4calc,
      });
    } else if (name === "netWtKgFinished" || name === "accessoriesWt") {
      let {
        organicPercent,
        blend1Percent,
        blend2Percent,
        blend3Percent,
        nonCertified1Percent,
        nonCertified2Percent,
        nonCertified3Percent,
        nonCertified4Percent,
        organicFinished,
        organicLoss,
        accessoriesWt,
        grossWtKg,
        netWtKgFinished,
      } = documentData;

      nonCertified1Percent = parseProperty(nonCertified1Percent);
      nonCertified2Percent = parseProperty(nonCertified2Percent);
      nonCertified3Percent = parseProperty(nonCertified3Percent);
      nonCertified4Percent = parseProperty(nonCertified4Percent);
      organicFinished = parseProperty(organicFinished);
      organicLoss = parseProperty(organicLoss);
      accessoriesWt =
        name == "accessoriesWt"
          ? parseProperty(value)
          : parseProperty(accessoriesWt);
      grossWtKg = parseProperty(grossWtKg);
      netWtKgFinished =
        name == "netWtKgFinished"
          ? parseProperty(value)
          : parseProperty(netWtKgFinished);

      let tempWeight = netWtKgFinished - accessoriesWt;

      // let tempOrganicCheck = organicFinished * (100 - organicLoss);

      let tempOrganicCheck = (organicPercent * tempWeight) / 100;
      let tempBlend1Check = (blend1Percent * tempWeight) / 100;
      let tempBlend2Check = (blend2Percent * tempWeight) / 100;
      let tempBlend3Check = (blend3Percent * tempWeight) / 100;
      let tempNonCertified1Check = (nonCertified1Percent * tempWeight) / 100;
      let tempNonCertified2Check = (nonCertified2Percent * tempWeight) / 100;
      let tempNonCertified3Check = (nonCertified3Percent * tempWeight) / 100;
      let tempNonCertified4Check = (nonCertified4Percent * tempWeight) / 100;
      setDocumentData({
        ...documentData,
        organicCheck: tempOrganicCheck.toFixed(2),
        blend1Check: tempBlend1Check.toFixed(2),
        blend2Check: tempBlend2Check.toFixed(2),
        blend3Check: tempBlend3Check.toFixed(2),
        nonCertified1Check: tempNonCertified1Check.toFixed(2),
        nonCertified2Check: tempNonCertified2Check.toFixed(2),
        nonCertified3Check: tempNonCertified3Check.toFixed(2),
        nonCertified4Check: tempNonCertified4Check.toFixed(2),
      });
    }
  };

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
    debounceFetch(value);
    // console.log(value);
  };

  // useEffect(() => {
  //   console.log(documentData);
  // }, [documentData.customerAddress]);

  const handleChange = (event, val, ref) => {
    const name =
      event.target.name == null
        ? ref.current.getAttribute("name")
        : event.target.name;
    const value = event.target.name == null ? val : event.target.value;

    if (name === "rm1" || name === "rm2" || name === "rm3" || name === "rm4") {
      let {
        rm1,
        rm2,
        rm3,
        rm4,
        rm1_Percent,
        rm2_Percent,
        rm3_Percent,
        rm4_Percent,
      } = documentData;
      let composition = "";
      let composition1 = "";
      let composition2 = "";
      let composition3 = "";
      let composition4 = "";
      rm1_Percent = parseProperty(rm1_Percent);
      rm2_Percent = parseProperty(rm2_Percent);
      rm3_Percent = parseProperty(rm3_Percent);
      rm4_Percent = parseProperty(rm4_Percent);

      composition1 =
        rm1_Percent != 0
          ? rm1_Percent + "% " + (name === "rm1" ? value : rm1)
          : "";
      composition2 =
        rm2_Percent != 0
          ? +rm2_Percent + "% " + (name === "rm2" ? value : rm2)
          : "";
      composition3 =
        rm3_Percent != 0
          ? +rm3_Percent + "% " + (name === "rm3" ? value : rm3)
          : "";
      composition4 =
        rm4_Percent != 0
          ? +rm4_Percent + "% " + (name === "rm4" ? value : rm4)
          : "";

      let obj = [];
      composition1.length > 0
        ? obj.push({
            display: composition1,
            name: name === "rm1" ? value : rm1,
          })
        : obj.push();
      composition2.length > 0
        ? obj.push({
            display: composition2,
            name: name === "rm2" ? value : rm2,
          })
        : obj.push();
      composition3.length > 0
        ? obj.push({
            display: composition3,
            name: name === "rm3" ? value : rm3,
          })
        : obj.push();
      composition4.length > 0
        ? obj.push({
            display: composition4,
            name: name === "rm4" ? value : rm4,
          })
        : obj.push();
      obj.sort((a, b) => (a.name > b.name ? 1 : -1));
      let temp = obj.map((o) => o.display);
      composition = temp.join(" and ");

      setDocumentData({
        ...documentData,
        [name]: value,
        composition: composition,
      });
      return;
    }

    if (name.includes("yarn")) {
      setYarnStrength({
        ...yarnStrength,
        [name]: value,
      });
      return;
    }
    if (name === "customerName") {
      let tempAddr;
      let tempList = customers.map((customer) => {
        let temp = [];
        if (customer.customerName === value) {
          tempAddr = customer.customerAddress;
          if (customer.gots) temp.push("GOTS");
          if (customer.grs) temp.push("GRS");
          if (customer.ocs) temp.push("OCS");
          if (customer.rcs) temp.push("RCS");
          if (customer.rds) temp.push("RDS");
          if (customer.rws) temp.push("RWS");
        }
        setStandards(temp);
        return temp;
      });
      console.log(tempAddr);
      setDocumentData({
        ...documentData,
        [name]: value,
        customerAddress: tempAddr,
      });

      // setStandards(tempList[0]);
      return;
    }
    setDocumentData({
      ...documentData,
      [name]: value,
    });
  };

  // const handleAssignmentCheck = (event) => {
  //   setDocumentData({
  //     ...documentData,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  // const handleFileChange = (event) => {
  //   setDocumentData({
  //     ...documentData,
  //     [event.target.name]: event.target.files[0],
  //   });
  // };

  const handleRadioChange = (event) => {
    setDocumentData({
      ...documentData,
      customerType: event.target.value,
    });
  };

  // const showLog = () => {
  //   let sendTcNos = [];
  //   sendTcNos = tcNos.map((tcNo) => {
  //     return {
  //       tcNumber: tcNo.tcNumber,
  //       r_tc_bal: tcNo.r_tc_bal - tcNo.tcWeight,
  //     };
  //   });
  //   console.log(sendTcNos);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      status,
      customerName,
      customerAddress,
      standard,
      inwardDate,
      suppliersName,
      productDescription,
      rm1,
      rm1_Percent,
      rm2,
      rm2_Percent,
      rm3,
      rm3_Percent,
      rm4,
      rm4_Percent,
      composition,
      tcNumber,
      netWtKG,
      openingStock,
      lotPoNo,
      finishedProduct,
      organicName,
      blend1Name,
      blend2Name,
      blend3Name,
      nonCertified1Name,
      nonCertified2Name,
      nonCertified3Name,
      nonCertified4Name,
      organicPercent,
      recyclePre,
      recyclePost,
      blend1Percent,
      blend2Percent,
      blend3Percent,
      nonCertified1Percent,
      nonCertified2Percent,
      nonCertified3Percent,
      nonCertified4Percent,
      organicFinished,
      recyclePreFinished,
      recyclePostFinished,
      organicLoss,
      recyclePreLoss,
      recyclePostLoss,
      organicCheck,
      recyclePreCheck,
      recyclePostCheck,
      blend1Check,
      blend2Check,
      blend3Check,
      nonCertified1Check,
      nonCertified2Check,
      nonCertified3Check,
      nonCertified4Check,
      accessoriesWt,
      grossWtKg,
      netWtKgFinished,
      buyerName,
      invoiceNumber,
      invoiceDate,
      transportDocNumber,
      transportDocDate,
      qtySold,
      certifiedRawMaterialKg,
      finishedProductKG,
      FMStockOpening,
      finalTcNumber,
    } = documentData;
    console.log(documentData);

    let sendTcNos = [];
    sendTcNos = tcNos.map((tcNo) => {
      return {
        tcNumber: tcNo.tcNumber,
        r_tc_bal: tcNo.r_tc_bal - tcNo.tcWeight,
      };
    });
    console.log(sendTcNos);
    
    // const FMStockOpening = finishedProductKG;

    const receivedPendingData = {
      username,
      status,
      customerName,
      customerAddress,
      standard,
      inwardDate,
      suppliersName,
      productDescription,
      rm1,
      rm1_Percent,
      rm2,
      rm2_Percent,
      rm3,
      rm3_Percent,
      rm4,
      rm4_Percent,
      composition,
      tcNumber,
      netWtKG,
      openingStock,
      lotPoNo,
      finishedProduct,
      organicName,
      blend1Name,
      blend2Name,
      blend3Name,
      nonCertified1Name,
      nonCertified2Name,
      nonCertified3Name,
      nonCertified4Name,
      organicPercent,
      recyclePre,
      recyclePost,
      blend1Percent,
      blend2Percent,
      blend3Percent,
      nonCertified1Percent,
      nonCertified2Percent,
      nonCertified3Percent,
      nonCertified4Percent,
      organicFinished,
      recyclePreFinished,
      recyclePostFinished,
      organicLoss,
      recyclePreLoss,
      recyclePostLoss,
      organicCheck,
      recyclePreCheck,
      recyclePostCheck,
      blend1Check,
      blend2Check,
      blend3Check,
      nonCertified1Check,
      nonCertified2Check,
      nonCertified3Check,
      nonCertified4Check,
      accessoriesWt,
      grossWtKg,
      netWtKgFinished,
      buyerName,
      invoiceNumber,
      invoiceDate,
      transportDocNumber,
      transportDocDate,
      qtySold,
      certifiedRawMaterialKg,
      finishedProductKG,
      FMStockOpening,
      finalTcNumber,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(receivedPendingData));
    formData.append("tcData", JSON.stringify(sendTcNos));
    
    // let url = "http://192.168.1.41:8080/";
    let url = "http://localhost:8080/";

    if (status === "pending") {
      url += "savePendingData";
    } else if (status === "completed") {
      url += "saveCompletedData";
    }

    for (var value of formData.values()) {
      console.log(value);
    }

    axios
      .post(url, formData)
      .then((response) => {
        toast.success("Data submitted successfully");
        window.location = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _next = () => {
    let tempCurrentStep = currentStep;
    if (tempCurrentStep === 1) {
      DocumentDataService.fetchRmList()
        .then((response) => {
          let tempRaw = response.map((res) => {
            return res.rmName;
          });
          setRawMats(tempRaw);
        })
        .catch((error) => {
          toast.error("Unable to fetch RM list" + error);
        });
    } else if (tempCurrentStep === 2) {
      let {
        rm1,
        rm2,
        rm3,
        rm4,
        rm1_Percent,
        rm2_Percent,
        rm3_Percent,
        rm4_Percent,
      } = documentData;
      rm1_Percent = parseProperty(rm1_Percent);
      rm2_Percent = parseProperty(rm2_Percent);
      rm3_Percent = parseProperty(rm3_Percent);
      rm4_Percent = parseProperty(rm4_Percent);
      let sum = rm1_Percent + rm2_Percent + rm3_Percent + rm4_Percent;
      if (sum !== 100) {
        toast.error("RM percentages!=100, sum is " + sum);
        return;
      } else {
        setDocumentData({
          ...documentData,
          organicPercent: rm1_Percent,
          blend1Percent: rm2_Percent,
          blend2Percent: rm3_Percent,
          blend3Percent: rm4_Percent,
          organicName: rm1,
          blend1Name: rm2,
          blend2Name: rm3,
          blend3Name: rm4,
        });
      }
    } else if (tempCurrentStep === 3) {
      let { customerName, finishedProduct } = documentData;
      DocumentDataService.fetchFinishedMaterialStock(
        customerName,
        finishedProduct
      )
        .then((response) => {
          setDocumentData({
            ...documentData,
            FMStockOpening: response,
          });
        })
        .catch((error) => {
          toast.error(error);
        });
    } else if (tempCurrentStep === 4) {
      let {
        tcNumber,
        netWtKG,
        organicCheck,
        blend1Check,
        blend2Check,
        blend3Check,
        nonCertified1Check,
        nonCertified2Check,
        nonCertified3Check,
        nonCertified4Check,
        accessoriesWt,
        netWtKgFinished,
        organicFinished,
        organicLoss,
        openingStock,
      } = documentData;

      organicFinished = parseProperty(organicFinished);
      organicLoss = parseProperty(organicLoss);
      organicCheck = parseProperty(organicCheck);
      blend1Check = parseProperty(blend1Check);
      blend2Check = parseProperty(blend2Check);
      blend3Check = parseProperty(blend3Check);
      nonCertified1Check = parseProperty(nonCertified1Check);
      nonCertified2Check = parseProperty(nonCertified2Check);
      nonCertified3Check = parseProperty(nonCertified3Check);
      nonCertified4Check = parseProperty(nonCertified4Check);
      accessoriesWt = parseProperty(accessoriesWt);
      // grossWtKg = parseProperty(grossWtKg);
      netWtKgFinished = parseProperty(netWtKgFinished);
      // let netSum = netWtKgFinished - accessoriesWt;
      let orgSum = organicFinished * ((100 - organicLoss) / 100);
      let finSum =
        organicCheck +
        blend1Check +
        blend2Check +
        blend3Check ;
        //nonCertified1Check +
        //nonCertified2Check +
        //nonCertified3Check +
        //nonCertified4Check;
      // console.log(netSum - finSum);
      // console.log(organicCheck);
      // console.log(organicFinished);
      // console.log(organicLoss);
      // console.log((organicFinished * (100 - organicLoss)) / 100);
      if (organicFinished > netWtKG + openingStock) {
        toast.error("net small");
      }
      if (Math.abs(finSum - orgSum) > 0.5) {
        toast.error(
          "Weight mismatch!! Organic Weight:" +
            finSum +
            " not equal to finished weight: " +
            (organicFinished * (100 - organicLoss)) / 100
        );
        return;
      }
      DocumentDataService.fetchTcList(
        documentData.customerName,
        documentData.composition
      ).then((response) => {
        console.log(response);
        let tempTcNos = response.map((res) => ({
          ...res,
          tcWeight: 0,
        }));
        tempTcNos.push({
          tcNumber: tcNumber,
          r_tc_bal: netWtKG,
          tcWeight: 0,
        });
        console.log(tempTcNos);
        setTcNos(tempTcNos);
      });
    } else if (tempCurrentStep === 5) {
      let { organicFinished } = documentData;
      organicFinished = parseProperty(organicFinished);
      let weightSum = 0;
      let tcflag = false;
      tcNos.map((tcNo) => {
        if (tcNo.tcWeight > parseProperty(tcNo.r_tc_bal)) {
          toast.error("Please enter correct weight 1");
          tcflag = true;
          return;
        }
        weightSum += parseProperty(tcNo.tcWeight);
      });
      if (tcflag) {
        return;
      }
      console.log(weightSum);
      console.log(organicFinished);
      if (Math.abs(weightSum - organicFinished) > 0.5) {
        toast.error("Please enter correct weight 2");
        return;
      }
    } else if (tempCurrentStep === 6) {
      let {
        netWtKgFinished,
        netWtKG,
        qtySold,
        organicFinished,
        FMStockOpening,
        openingStock,
      } = documentData;
      netWtKgFinished = parseProperty(netWtKgFinished);
      netWtKG = parseProperty(netWtKG);
      qtySold = parseProperty(qtySold);
      organicFinished = parseProperty(organicFinished);
      openingStock = parseProperty(openingStock);
      // finishedOpeningStock = parseProperty(finishedOpeningStock);

      // let finishedOpeningStock = 0;

      FMStockOpening = parseProperty(FMStockOpening);

      let tempfinishedProductKG = (
        FMStockOpening +
        netWtKgFinished -
        qtySold
      ).toFixed(2);
      let tempcertifiedRawMaterialKg = (
        openingStock +
        netWtKG -
        organicFinished
      ).toFixed(2);
      if (tempfinishedProductKG < 0) {
        toast.error("Quantity sold is high!!");
        return;
      }
      if (tempcertifiedRawMaterialKg < 0) {
        toast.error("Raw material used is high!!");
        return;
      }
      setDocumentData({
        ...documentData,
        finishedProductKG: tempfinishedProductKG,
        certifiedRawMaterialKg: tempcertifiedRawMaterialKg,
        // FMStockOpening: tempfinishedProductKG,
      });
    }
    tempCurrentStep = tempCurrentStep >= 6 ? 7 : tempCurrentStep + 1;
    setCurrentStep(tempCurrentStep);
  };

  const _prev = () => {
    let tempCurrentStep = currentStep;
    tempCurrentStep = tempCurrentStep <= 1 ? 1 : tempCurrentStep - 1;
    setCurrentStep(tempCurrentStep);
  };

  /*
   * the functions for our button
   */
  const previousButton = () => {
    // let currentStep = currentStep;
    if (currentStep !== 1) {
      return (
        <Tooltip title="Previous">
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{
            borderRadius: 35,
            bottom: "50",
            left: "0",
          }}
          onClick={_prev}
        >
          <Icon.ArrowLeft/>
        </Button>
        </Tooltip>
      );
    }
    return null;
  };

  const nextButton = () => {
    // let currentStep = currentStep;
    if (currentStep < 7) {
      return (
        <Tooltip title="Next">
        <Button
          color="primary"
          size="large"
          variant="contained"
          style={{
            borderRadius: 35,
            bottom: "50",
            right: "0",
            float: "right",
          }}
          onClick={_next}
        >
          <Icon.ArrowRight/>
        </Button>
        </Tooltip>
      );
    }
    return null;
  };

  const submitButton = () => {
    // let currentStep = currentStep;
    if (currentStep === 7) {
      return (
        <div>
          <Button
            color="primary"
            size="large"
            variant="contained"
            style={{
              borderRadius: 35,
              bottom: "50",
              right: "0",
              float: "right",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {/* <Button
            color="secondary"
            size="large"
            variant="contained"
            style={{
              borderRadius: 35,
              bottom: "50",
              right: "0",
              float: "right",
            }}
            onClick={showLog}
          >
            LOG
          </Button> */}
        </div>
      );
    }
    return null;
  };

  
  return (
    <React.Fragment>
      {/* <h4>Step {currentStep}/7</h4> */}

      <Stepper activeStep={currentStep-1} alternativeLabel style={{ backgroundColor: "transparent" }}>
        {steps.map((label,index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
      <form onSubmit={handleSubmit} style={{ margin: "1em" }}>
        {/* 
        render the form steps and pass required props in
      */}
        <Step1
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          // email={documentData.email}
          status={documentData.status}
          customerName={documentData.customerName}
          customerAddress={documentData.customerAddress}
          standard={documentData.standard}
          customerSearch={customerSearch}
          handleRadioChange={handleRadioChange}
          customers={customers}
          standards={standards}
        />
        <Step2
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          // username={documentData.username}
          rawMats={rawMats}
          yarnStrength={yarnStrength}
          inwardDate={documentData.inwardDate}
          suppliersName={documentData.suppliersName}
          productDescription={documentData.productDescription}
          rm1={documentData.rm1}
          rm2={documentData.rm2}
          rm3={documentData.rm3}
          rm4={documentData.rm4}
          rm1_Percent={documentData.rm1_Percent}
          rm2_Percent={documentData.rm2_Percent}
          rm3_Percent={documentData.rm3_Percent}
          rm4_Percent={documentData.rm4_Percent}
          composition={documentData.composition}
          tcNumber={documentData.tcNumber}
          netWtKG={documentData.netWtKG}
          openingStock={documentData.openingStock}
        />
        <Step3
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          // username={documentData.username}
          lotPoNo={documentData.lotPoNo}
          finishedProduct={documentData.finishedProduct}
          organicName={documentData.organicName}
          blend1Name={documentData.blend1Name}
          blend2Name={documentData.blend2Name}
          blend3Name={documentData.blend3Name}
          nonCertified1Name={documentData.nonCertified1Name}
          nonCertified2Name={documentData.nonCertified2Name}
          nonCertified3Name={documentData.nonCertified3Name}
          nonCertified4Name={documentData.nonCertified4Name}
          organicPercent={documentData.organicPercent}
          recyclePre={documentData.recyclePre}
          recyclePost={documentData.recyclePost}
          blend1Percent={documentData.blend1Percent}
          blend2Percent={documentData.blend2Percent}
          blend3Percent={documentData.blend3Percent}
          nonCertified1Percent={documentData.nonCertified1Percent}
          nonCertified2Percent={documentData.nonCertified2Percent}
          nonCertified3Percent={documentData.nonCertified3Percent}
          nonCertified4Percent={documentData.nonCertified4Percent}
        />
        <Step4
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          organicFinished={documentData.organicFinished}
          recyclePreFinished={documentData.recyclePreFinished}
          recyclePostFinished={documentData.recyclePostFinished}
          organicLoss={documentData.organicLoss}
          recyclePreLoss={documentData.recyclePreLoss}
          recyclePostLoss={documentData.recyclePostLoss}
          organicCheck={documentData.organicCheck}
          recyclePreCheck={documentData.recyclePreCheck}
          recyclePostCheck={documentData.recyclePostCheck}
          blend1Check={documentData.blend1Check}
          blend2Check={documentData.blend2Check}
          blend3Check={documentData.blend3Check}
          nonCertified1Check={documentData.nonCertified1Check}
          nonCertified2Check={documentData.nonCertified2Check}
          nonCertified3Check={documentData.nonCertified3Check}
          nonCertified4Check={documentData.nonCertified4Check}
          accessoriesWt={documentData.accessoriesWt}
          netWtKgFinished={documentData.netWtKgFinished}
        />

        <Step5
          currentStep={currentStep}
          organicFinished={documentData.organicFinished}
          tcNos={tcNos}
          tcNumber={documentData.tcNumber}
          netWtKG={documentData.netWtKG}
          handleChange={handleChange}
          handleWeightChange={handleWeightChange}
          handleBlur={handleBlur}
        />

        <Step6
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          // email={documentData.email}
          grossWtKg={documentData.grossWtKg}
          buyerName={documentData.buyerName}
          invoiceNumber={documentData.invoiceNumber}
          invoiceDate={documentData.invoiceDate}
          transportDocNumber={documentData.transportDocNumber}
          transportDocDate={documentData.transportDocDate}
          qtySold={documentData.qtySold}
        />
        {/* <Step8
            currentStep={currentStep}
            handleChange={handleFileChange}
            handleBlur={handleBlur}
            // email={documentData.email}
            documentValidate1={documentData.documentValidate1}
            documentValidate2={documentData.documentValidate2}
            documentValidate3={documentData.documentValidate3}
            documentValidate4={documentData.documentValidate4}
            documentValidate5={documentData.documentValidate5}
            handleAssignmentCheck={handleAssignmentCheck}
          /> */}
        <Step7
          currentStep={currentStep}
          handleChange={handleChange}
          handleBlur={handleBlur}
          certifiedRawMaterialKg={documentData.certifiedRawMaterialKg}
          finishedProductKG={documentData.finishedProductKG}
          finalTcNumber={documentData.finalTcNumber}
          status={documentData.status}
        />
        <div
          style={{ position: "relative", width: "100%", paddingTop: "20px" }}
        >
          {previousButton()}
          {currentStep < 7 ? nextButton() : submitButton()}
        </div>
      </form>
    </React.Fragment>
  );
}

function Step1(props) {
  const {
    currentStep,
    standards,
    customers,
    status,
    customerName,
    customerAddress,
    standard,
    handleChange,
    customerSearch,
    handleBlur,
    handleRadioChange,
  } = props;
  if (currentStep !== 1) {
    return null;
  }
  

  return (
    <React.Fragment>
      <Paper elevation={20} style={{padding: "2% 0% 4% 35%", width: "100%", margin: "2% auto"}} >
      <h1> Customer Detail </h1>
      <br></br>
      
      <div className="form-group" style={{width:"50%",   alignItems:"center"}}>
        <DropDown
          fieldName={"status"}
          name={"Status"}
          newValue={false}
          multipleVal={false}

          dropDownValues={["pending", "completed"]}
          handleChange={handleChange}
          currentVal={status}

          
        />
         <AutoDropDown
              
              fieldName={"customerName"}
              name={"Customer Name"}
              newValue={false}
              multipleVal={false}
              dropDownValues={customers.map(
                (customers) => customers.customerName
              )}
              onInputChange={customerSearch}
              handleChange={handleChange}
              currentVal={customerName}
            /><br></br><br></br>
        <div style={{ display: "block" }}>
          
           
            <DropDown
              fieldName={"standard"}
              name={"Standard"}
              newValue={false}
              multipleVal={false}
              dropDownValues={standards}
              handleChange={handleChange}
              onBlur={handleBlur}
              currentVal={standard}
            />
             
          
          <StyledTextField
            // error={false}
            disabled
            className="form-control"
            id="customerAddress"
            name="customerAddress"
            type="text"
            variant="outlined"
            label="Customer Address"
            value={customerAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {/* </GridListTile> */}
          {/* <GridListTile cols={2}>
          </GridListTile> */}
        </div>
        
      </div>
    </Paper>
    </React.Fragment>
  );
}

function Step2(props) {
  const {
    currentStep,
    rawMats,
    yarnStrength,
    inwardDate,
    suppliersName,
    productDescription,
    rm1,
    rm2,
    rm3,
    rm4,
    rm1_Percent,
    rm2_Percent,
    rm3_Percent,
    rm4_Percent,
    composition,
    tcNumber,
    netWtKG,
    openingStock,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 2) {
    return null;
  }
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">
      <h1> Raw Material Purchase Detail </h1>
      <br></br>
      <Grid container spacing={5}>
        <Grid item md={4}>
          <TextField
            // error={false}
            style = {{width:"70%"}}
            className="form-control"
            id="inwardDate"
            name="inwardDate"
            type="text"
            variant="outlined"
            label="Inward Date"
            value={inwardDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item md={4}>
          <TextField
            // error={false}
            style = {{width:"70%"}}
            className="form-control"
            id="suppliersName"
            name="suppliersName"
            type="text"
            variant="outlined"
            label="Supplier Name"
            value={suppliersName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <br />
        <Grid item md={4}>
          <TextField
            // error={false}
            style = {{width:"70%"}}
            className="form-control"
            id="productDescription"
            name="productDescription"
            type="text"
            variant="outlined"
            label="Product Description"
            value={productDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          {/* <TextField
            // error={false}
            className="form-control"
            id="rm1"
            name="rm1"
            type="text"
            variant="outlined"
            label="Raw Material 1"
            value={rm1}
            onChange={handleChange}
            onBlur={handleBlur}
          /> */}
          <DropDown
            
            fieldName={"rm1"}
            name={"RM 1"}
            newValue={false}
            multipleVal={false}
            dropDownValues={rawMats}
            handleChange={handleChange}
            onBlur={handleBlur}
            currentVal={rm1}
            
          />
          {rm1 === "yarn" && (
            <TextField
              id="yarn1"
              name="yarn1"
              type="text"
              variant="outlined"
              label="Yarn Count"
              value={yarnStrength.yarn1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="rm1_Percent"
            name="rm1_Percent"
            type="text"
            variant="outlined"
            label="Raw Material 1 Percentage"
            value={rm1_Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <br />
        <Grid item md={3}>
          {/* <TextField
            // error={false}
            className="form-control"
            id="rm2"
            name="rm2"
            type="text"
            variant="outlined"
            label="Raw Material 2"
            value={rm2}
            onChange={handleChange}
            onBlur={handleBlur}
          /> */}
          <DropDown
            fieldName={"rm2"}
            name={"RM 2"}
            newValue={false}
            multipleVal={false}
            dropDownValues={rawMats}
            handleChange={handleChange}
            onBlur={handleBlur}
            currentVal={rm2}
          />
          {rm2 === "yarn" && (
            <TextField
              id="yarn2"
              name="yarn2"
              type="text"
              variant="outlined"
              label="Yarn Count"
              value={yarnStrength.yarn2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="rm2_Percent"
            name="rm2_Percent"
            type="text"
            variant="outlined"
            label="Raw Material 2 Percentage"
            value={rm2_Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <br />
        <Grid item md={3}>
          {/* <TextField
            // error={false}
            className="form-control"
            id="rm3"
            name="rm3"
            type="text"
            variant="outlined"
            label="Raw Material 3"
            value={rm3}
            onChange={handleChange}
            onBlur={handleBlur}
          /> */}
          <DropDown
            fieldName={"rm3"}
            name={"RM 3"}
            newValue={false}
            multipleVal={false}
            dropDownValues={rawMats}
            handleChange={handleChange}
            onBlur={handleBlur}
            currentVal={rm3}
          />
          {rm3 === "yarn" && (
            <TextField
              id="yarn3"
              name="yarn3"
              type="text"
              variant="outlined"
              label="Yarn Count"
              value={yarnStrength.yarn3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="rm3_Percent"
            name="rm3_Percent"
            type="text"
            variant="outlined"
            label="Raw Material 3 Percentage"
            value={rm3_Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <br />
        <br />
        <Grid item md={3}>
          {/* <TextField
            // error={false}
            className="form-control"
            id="rm4"
            name="rm4"
            type="text"
            variant="outlined"
            label="Raw Material 4"
            value={rm4}
            onChange={handleChange}
            onBlur={handleBlur}
          /> */}
          <DropDown
            fieldName={"rm4"}
            name={"RM 4"}
            newValue={false}
            multipleVal={false}
            dropDownValues={rawMats}
            handleChange={handleChange}
            onBlur={handleBlur}
            currentVal={rm4}
          />
          {rm4 === "yarn" && (
            <TextField
              id="yarn4"
              name="yarn4"
              type="text"
              variant="outlined"
              label="Yarn Count"
              value={yarnStrength.yarn4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="rm4_Percent"
            name="rm4_Percent"
            type="text"
            variant="outlined"
            label="Raw Material 4 Percentage"
            value={rm4_Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            style = {{width:"100%"}}
            id="tcNumber"
            name="tcNumber"
            type="text"
            variant="outlined"
            label="TC Number"
            value={tcNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="netWtKG"
            name="netWtKG"
            type="text"
            variant="outlined"
            label="Net Weight(Kg)"
            value={netWtKG}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            disabled
            id="composition"
            name="composition"
            type="text"
            variant="outlined"
            label="Composition"
            value={composition}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {{width:"100%"}}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="openingStock"
            name="openingStock"
            type="text"
            variant="outlined"
            label="Opening Stock Weight(Kg)"
            value={openingStock}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
      </Grid>
    </div>
    </Paper>
  );
}
function Step3(props) {
  const {
    currentStep,
    lotPoNo,
    finishedProduct,
    organicName,
    blend1Name,
    blend2Name,
    blend3Name,
    nonCertified1Name,
    nonCertified2Name,
    nonCertified3Name,
    nonCertified4Name,
    organicPercent,
    recyclePre,
    recyclePost,
    blend1Percent,
    blend2Percent,
    blend3Percent,
    nonCertified1Percent,
    nonCertified2Percent,
    nonCertified3Percent,
    nonCertified4Percent,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 3) {
    return null;
  }
  const fieldStyle = {width: "70%"}
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">

      <h1> Finished Material Composition Details</h1>
      <br></br><br></br>
      <Grid container spacing={5}>
        <Grid item md={6}>
          <TextField
            // error={false}
            className="form-control"
            id="lotPoNo"
            name="lotPoNo"
            type="text"
            variant="outlined"
            label="LOT/PO/No"
            value={lotPoNo}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {{width:"60%"}}
          />
        </Grid>
        <br />
        <Grid item md={6}>
          <TextField
            // error={false}
            className="form-control"
            id="finishedProduct"
            name="finishedProduct"
            type="text"
            variant="outlined"
            label="finished Product"
            value={finishedProduct}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {{width:"60%"}}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            disabled
            className="form-control"
            id="organicName"
            name="organicName"
            type="text"
            variant="outlined"
            label="Organic Material"
            value={organicName}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            disabled
            id="organicPercent"
            name="organicPercent"
            type="text"
            variant="outlined"
            label="Organic Material Percent"
            value={organicPercent}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            disabled
            id="recyclePre"
            name="recyclePre"
            type="text"
            variant="outlined"
            label="Recycle Pre Percentage"
            value={recyclePre}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            disabled
            id="recyclePost"
            name="recyclePost"
            type="text"
            variant="outlined"
            label="Recycle Post Percentage"
            value={recyclePost}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            disabled
            className="form-control"
            id="blend1Name"
            name="blend1Name"
            type="text"
            variant="outlined"
            label="Blend 1 Material"
            value={blend1Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            disabled
            id="blend1Percent"
            name="blend1Percent"
            type="text"
            variant="outlined"
            label="Blend 1 Percentage"
            value={blend1Percent}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            // error={false}
            disabled
            className="form-control"
            id="blend2Name"
            name="blend2Name"
            type="text"
            variant="outlined"
            label="Blend 2 Material"
            value={blend2Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="blend2Percent"
            name="blend2Percent"
            type="text"
            variant="outlined"
            label="Blend 2 Percentage"
            value={blend2Percent}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            disabled
            className="form-control"
            id="blend3Name"
            name="blend3Name"
            type="text"
            variant="outlined"
            label="Blend 3 Material"
            value={blend3Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="blend3Percent"
            name="blend3Percent"
            type="text"
            variant="outlined"
            label="Blend 3 Percentage"
            value={blend3Percent}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="nonCertified1Name"
            name="nonCertified1Name"
            type="text"
            variant="outlined"
            label="Non-Certified 1 Material"
            value={nonCertified1Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
          <br />
        </Grid>

        <Grid item md={3}>
          <TextField
            className="form-control"
            id="nonCertified1Percent"
            name="nonCertified1Percent"
            type="text"
            variant="outlined"
            label="Non-Certified 1 Percentage"
            value={nonCertified1Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="nonCertified2Name"
            name="nonCertified2Name"
            type="text"
            variant="outlined"
            label="Non-Certified 2 Material"
            value={nonCertified2Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            className="form-control"
            id="nonCertified2Percent"
            name="nonCertified2Percent"
            type="text"
            variant="outlined"
            label="Non-Certified 2 Percentage"
            value={nonCertified2Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="nonCertified3Name"
            name="nonCertified3Name"
            type="text"
            variant="outlined"
            label="Non-Certified 3 Name"
            value={nonCertified3Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            className="form-control"
            id="nonCertified3Percent"
            name="nonCertified3Percent"
            type="text"
            variant="outlined"
            label="Non-Certified 3 Percentage"
            value={nonCertified3Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>

        <br />
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="nonCertified4Name"
            name="nonCertified4Name"
            type="text"
            variant="outlined"
            label="Non-Certified 4 Name"
            value={nonCertified4Name}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>

        <br />
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="nonCertified4Percent"
            name="nonCertified4Percent"
            type="text"
            variant="outlined"
            label="Non-Certified 4 Percentage"
            value={nonCertified4Percent}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
      </Grid>
    </div>
    </Paper>
  );
}
function Step4(props) {
  const {
    currentStep,
    organicFinished,
    recyclePreFinished,
    recyclePostFinished,
    organicLoss,
    recyclePreLoss,
    recyclePostLoss,
    organicCheck,
    recyclePreCheck,
    recyclePostCheck,
    blend1Check,
    blend2Check,
    blend3Check,
    nonCertified1Check,
    nonCertified2Check,
    nonCertified3Check,
    nonCertified4Check,
    accessoriesWt,
    netWtKgFinished,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 4) {
    return null;
  }
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">
      <h1>Finished Material Weight</h1>
      <br></br>
      <Grid container spacing={5}>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="organicFinished"
            name="organicFinished"
            type="text"
            variant="outlined"
            label="Certified Organic Material Weight(Kg)"
            value={organicFinished}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="recyclePreFinished"
            name="recyclePreFinished"
            type="text"
            variant="outlined"
            label="Recycle Organic Pre Finished Weight(Kg)"
            value={recyclePreFinished}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="recyclePostFinished"
            name="Recycle Organic Post Finished Weight(Kg)"
            type="text"
            variant="outlined"
            label="Enter recyclePostFinished"
            value={recyclePostFinished}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="organicLoss"
            name="organicLoss"
            type="text"
            variant="outlined"
            label="Organic Loss Percentage"
            value={organicLoss}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="recyclePreLoss"
            name="recyclePreLoss"
            type="text"
            variant="outlined"
            label="Recycle Pre Organic Loss Percentage"
            value={recyclePreLoss}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="recyclePostLoss"
            name="recyclePostLoss"
            type="text"
            variant="outlined"
            label="Recycle Organic Post Loss Percentage"
            value={recyclePostLoss}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            id="accessoriesWt"
            name="accessoriesWt"
            type="text"
            variant="outlined"
            label="Accessory Weight(Kg)"
            value={accessoriesWt}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Grid>

        <Grid item md={3}>
          <TextField
            className="form-control"
            id="netWtKgFinished"
            name="netWtKgFinished"
            type="text"
            variant="outlined"
            label="Net Weight(Kg)"
            value={netWtKgFinished}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="organicCheck"
            name="organicCheck"
            type="text"
            variant="outlined"
            label="Certified Organic Weight(Kg)"
            value={organicCheck}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="recyclePreCheck"
            name="recyclePreCheck"
            type="text"
            variant="outlined"
            label="Certified Recycle Organic Pre Weight(Kg)"
            value={recyclePreCheck}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="recyclePostCheck"
            name="recyclePostCheck"
            type="text"
            variant="outlined"
            label="Certified Recycle Organic Post Weight(Kg)"
            value={recyclePostCheck}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="blend1Check"
            name="blend1Check"
            type="text"
            variant="outlined"
            label="Blend 1 Weight(Kg)"
            value={blend1Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="blend2Check"
            name="blend2Check"
            type="text"
            variant="outlined"
            label="Blend 2 Weight(Kg)"
            value={blend2Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="blend3Check"
            name="blend3Check"
            type="text"
            variant="outlined"
            label="Blend 3 Weight(Kg)"
            value={blend3Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="nonCertified1Check"
            name="nonCertified1Check"
            type="text"
            variant="outlined"
            label="Non-Certified 1 Material Weight(Kg)"
            value={nonCertified1Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="nonCertified2Check"
            name="nonCertified2Check"
            type="text"
            variant="outlined"
            label="Non-Certified 2 Material Weight(Kg)"
            value={nonCertified2Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="nonCertified3Check"
            name="nonCertified3Check"
            type="text"
            variant="outlined"
            label="Non-Certified 3 Material Weight(Kg)"
            value={nonCertified3Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            className="form-control"
            disabled
            id="nonCertified4Check"
            name="nonCertified4Check"
            type="text"
            variant="outlined"
            label="Non-Certified 4 Material Weight(Kg)"
            value={nonCertified4Check}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
    </div>
    </Paper>
  );
}

function Step5(props) {
  const {
    currentStep,
    organicFinished,
    tcNos,
    handleChange,
    handleWeightChange,
    handleBlur,
  } = props;
  if (currentStep !== 5) {
    return null;
  }
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">
      <h1> Raw Material TC Number </h1>
      <br></br>
      <TextField
        disabled
        className="form-control"
        id="organicFinished"
        name="organicFinished"
        type="text"
        variant="outlined"
        label="Certified Organic Material Weight(Kg)"
        value={organicFinished}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div><br></br></div>
      <Table>
      
        <TableHead>
          <TableCell>TC Number</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Enter value</TableCell>
        </TableHead>
        
        <TableBody>
          {tcNos.map((tcNo, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{tcNo.tcNumber}</TableCell>
                <TableCell>{tcNo.r_tc_bal}</TableCell>
                <TableCell>
                  <TextField
                    // error={false}
                    className="form-control"
                    id="tcWeight"
                    name="tcWeight"
                    type="text"
                    variant="outlined"
                    label="Weight"
                    value={tcNo.tcWeight}
                    onChange={(e) => handleWeightChange(e, tcNo)}
                    required
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    </Paper>
  );
}

function Step6(props) {
  const {
    currentStep,
    buyerName,
    grossWtKg,
    invoiceNumber,
    invoiceDate,
    transportDocNumber,
    transportDocDate,
    qtySold,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 6) {
    return null;
  }
  const fieldStyle = {width: "70%"}
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">
      <h1> Buyer Details </h1>

      <Grid container spacing={5}>
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="buyerName"
            name="buyerName"
            type="text"
            variant="outlined"
            label="Buyer's Name"
            value={buyerName}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <br />
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="invoiceNumber"
            name="invoiceNumber"
            type="text"
            variant="outlined"
            label="Invoice Number"
            value={invoiceNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <br />
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="invoiceDate"
            name="invoiceDate"
            type="text"
            variant="outlined"
            label="Invoice Date"
            value={invoiceDate}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <br />
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="transportDocNumber"
            name="transportDocNumber"
            type="text"
            variant="outlined"
            label="Transport Doc Number"
            value={transportDocNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="transportDocDate"
            name="transportDocDate"
            type="text"
            variant="outlined"
            label="Transport Doc Date"
            value={transportDocDate}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
          />
        </Grid>
        <div><br/></div>
        <Grid item md={4}>
          <TextField
            className="form-control"
            id="grossWtKg"
            name="grossWtKg"
            type="text"
            variant="outlined"
            label="Gross Weight(Kg)"
            value={grossWtKg}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
            required
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            // error={false}
            className="form-control"
            id="qtySold"
            name="qtySold"
            type="text"
            variant="outlined"
            label="Quantity Sold Weight(Kg)"
            value={qtySold}
            onChange={handleChange}
            onBlur={handleBlur}
            style = {fieldStyle}
            required
          />
        </Grid>
      </Grid>
    </div>
    </Paper>
  );
}

function Step8(props) {
  const {
    currentStep,
    documentValidate1,
    documentValidate2,
    documentValidate3,
    documentValidate4,
    documentValidate5,
    handleChange,
    handleAssignmentCheck,
    handleBlur,
  } = props;
  if (currentStep !== 7) {
    return null;
  }
  return (
    <Paper elevation={20} style={paperStyle}>
    <div className="form-group">
      <label htmlFor="documentUpload1">Select documentUpload1:</label>
      <input
        type="file"
        id="documentUpload1"
        name="documentUpload1"
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={documentValidate1}
            onChange={(event) => handleAssignmentCheck(event)}
            name="documentValidate1"
            color="primary"
          />
        }
        label="Verified?"
      />
      <br />
      <br />
      <label htmlFor="documentUpload2">Select documentUpload2:</label>
      <input
        type="file"
        id="documentUpload2"
        name="documentUpload2"
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={documentValidate2}
            onChange={(event) => handleAssignmentCheck(event)}
            name="documentValidate2"
            color="primary"
          />
        }
        label="Verified?"
      />
      <br />
      <br />
      <label htmlFor="documentUpload3">Select documentUpload3:</label>
      <input
        type="file"
        id="documentUpload3"
        name="documentUpload3"
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={documentValidate3}
            onChange={(event) => handleAssignmentCheck(event)}
            name="documentValidate3"
            color="primary"
          />
        }
        label="Verified?"
      />
      <br />
      <br />
      <label htmlFor="documentUpload4">Select documentUpload4:</label>
      <input
        type="file"
        id="documentUpload4"
        name="documentUpload4"
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={documentValidate4}
            onChange={(event) => handleAssignmentCheck(event)}
            name="documentValidate4"
            color="primary"
          />
        }
        label="Verified?"
      />
      <br />
      <br />
      <label htmlFor="documentUpload5">Select documentUpload5:</label>
      <input
        type="file"
        id="documentUpload5"
        name="documentUpload5"
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={documentValidate5}
            onChange={(event) => handleAssignmentCheck(event)}
            name="documentValidate5"
            color="primary"
          />
        }
        label="Verified?"
      />
      <br />
      <br />
    </div>
    </Paper>
  );
}

function Step7(props) {
  const {
    currentStep,
    handleChange,
    handleBlur,
    certifiedRawMaterialKg,
    finishedProductKG,
    finalTcNumber,
    status,
  } = props;
  if (currentStep !== 7) {
    return null;
  }
  return (
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
      <div className="form-group">
        <h1> Balance Inventory</h1>
        <br></br>
        <Grid container spacing={5}>
          <Grid item md={4}>
            <TextField
              // error={false}
              className="form-control"
              disabled
              id="certifiedRawMaterialKg"
              name="certifiedRawMaterialKg"
              type="text"
              variant="outlined"
              label="Certified RawMaterial Weight(Kg)"
              value={certifiedRawMaterialKg}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <br />

          <Grid item md={4}>
            <TextField
              // error={false}
              className="form-control"
              disabled
              id="finishedProductKG"
              name="finishedProductKG"
              type="text"
              variant="outlined"
              label="Finished Product Weight(Kg)"
              value={finishedProductKG}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <br />

          <Grid item md={4}>
            {status === "completed" ? (
              <TextField
                // error={false}
                className="form-control"
                id="finalTcNumber"
                name="finalTcNumber"
                type="text"
                variant="outlined"
                label="Enter finalTcNumber"
                value={finalTcNumber}
                onChange={handleChange}
              />
            ) : null}
          </Grid>
        </Grid>
      </div>
      {/* <div style={{ position: "relative", width: "100%", paddingTop: "20px" }}>
        <Button
          type="submit"
          style={{
            borderRadius: 35,
            bottom: "50",
            right: "0",
            float: "right",
            backgroundColor: "green",
          }}
        >
          Submit
        </Button>
      </div> */}
    </React.Fragment>
    </Paper>
  );
}

export default MasterForm;
