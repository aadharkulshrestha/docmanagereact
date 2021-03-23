import {
  Button,
  Checkbox,
  colors,
  FormControlLabel,
  Grid,
  GridList,
  GridListTile,
  makeStyles,
  TextField,
  withStyles,
  Card, CardContent,Avatar,IconButton,Box,Checkbox,ListItem,ListItemIcon,
} from "@material-ui/core";
import axios from "axios";
import * as Icon from "react-feather";
import FormData from "form-data";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import AuthenticationService from "./services/AuthenticationService";
import AutoDropDown from "./util/autoDropDown";
import DropDown from "./util/dropDown";

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

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
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
    };
  }

  parseProperty = (param) => {
    if (typeof param === "number") {
      return param;
    } else {
      return param.length > 0 ? parseFloat(param) : 0;
    }
  };

  handleBlur = (event) => {
    const { name, value } = event.target;
    if (
      name == "rm1_Percent" ||
      name == "rm2_Percent" ||
      name == "rm3_Percent" ||
      name == "rm4_Percent"
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
      } = this.state;
      let composition = "";
      rm1_Percent = this.parseProperty(rm1_Percent);
      rm2_Percent = this.parseProperty(rm2_Percent);
      rm3_Percent = this.parseProperty(rm3_Percent);
      rm4_Percent = this.parseProperty(rm4_Percent);
      composition = rm1_Percent != 0 ? rm1_Percent + "% " + rm1 : "";
      composition += rm2_Percent != 0 ? " and " + rm2_Percent + "% " + rm2 : "";
      composition += rm3_Percent != 0 ? " and " + rm3_Percent + "% " + rm3 : "";
      composition += rm4_Percent != 0 ? " and " + rm4_Percent + "% " + rm4 : "";
      this.setState({
        composition: composition,
      });
    } else if (name == "tcNumber") {
      let { customerName, composition } = this.state;
      axios
        // .post("http://192.168.1.41:8080/getOpeningStock/", {
          .post("http://localhost:8080/getOpeningStock/", {

        customerName: customerName,
          composition: composition,
        })
        .then((response) => {
          console.log(response.data);
          this.setState({
            openingStock: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      name == "nonCertified1Percent" ||
      name == "nonCertified2Percent" ||
      name == "nonCertified3Percent" ||
      name == "nonCertified4Percent"
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
      } = this.state;
      nonCertified1Percent = this.parseProperty(nonCertified1Percent);
      nonCertified2Percent = this.parseProperty(nonCertified2Percent);
      nonCertified3Percent = this.parseProperty(nonCertified3Percent);
      nonCertified4Percent = this.parseProperty(nonCertified4Percent);
      let sum =
        nonCertified1Percent +
        nonCertified2Percent +
        nonCertified3Percent +
        nonCertified4Percent;

      const rm1calc = (this.parseProperty(rm1_Percent) * (100 - sum)) / 100;
      const rm2calc = (this.parseProperty(rm2_Percent) * (100 - sum)) / 100;
      const rm3calc = (this.parseProperty(rm3_Percent) * (100 - sum)) / 100;
      const rm4calc = (this.parseProperty(rm4_Percent) * (100 - sum)) / 100;

      this.setState({
        organicPercent: rm1calc,
        blend1Percent: rm2calc,
        blend2Percent: rm3calc,
        blend3Percent: rm4calc,
      });
    } else if (name == "netWtKgFinished" || name == "accessoriesWt") {
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
      } = this.state;

      nonCertified1Percent = this.parseProperty(nonCertified1Percent);
      nonCertified2Percent = this.parseProperty(nonCertified2Percent);
      nonCertified3Percent = this.parseProperty(nonCertified3Percent);
      nonCertified4Percent = this.parseProperty(nonCertified4Percent);
      organicFinished = this.parseProperty(organicFinished);
      organicLoss = this.parseProperty(organicLoss);
      accessoriesWt =
        name == "accessoriesWt"
          ? this.parseProperty(value)
          : this.parseProperty(accessoriesWt);
      grossWtKg = this.parseProperty(grossWtKg);
      netWtKgFinished =
        name == "netWtKgFinished"
          ? this.parseProperty(value)
          : this.parseProperty(netWtKgFinished);

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
      this.setState({
        organicCheck: tempOrganicCheck,
        blend1Check: tempBlend1Check,
        blend2Check: tempBlend2Check,
        blend3Check: tempBlend3Check,
        nonCertified1Check: tempNonCertified1Check,
        nonCertified2Check: tempNonCertified2Check,
        nonCertified3Check: tempNonCertified3Check,
        nonCertified4Check: tempNonCertified4Check,
      });
    }
  };

  // fetchResult = async (searchquery) => {
  //   await DocumentDataService.fetchCustomerList(searchquery).then((res) => {
  //     if (res) {
  //       setCustomers(res);
  //     } else {
  //       toast.error("Unable to fetch building list");
  //     }
  //   });
  // };

  // debounceFetch = useCallback(
  //   _.debounce((q) => fetchResult(q), 500),
  //   []
  // );

  customerSearch = (event, value) => {
    // debounceFetch(value);
    console.log(value);
  };

  handleChange = (event, val, ref) => {
    const name =
      event.target.name == null
        ? ref.current.getAttribute("name")
        : event.target.name;
    const value = event.target.name == null ? val : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleAssignmentCheck = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleFileChange = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
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
      documentUpload1,
      documentUpload2,
      documentUpload3,
      documentUpload4,
      documentUpload5,
      documentValidate1,
      documentValidate2,
      documentValidate3,
      documentValidate4,
      documentValidate5,
      certifiedRawMaterialKg,
      finishedProductKG,
      finalTcNumber,
    } = this.state;
    console.log(this.state);
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
      documentValidate1,
      documentValidate2,
      documentValidate3,
      documentValidate4,
      documentValidate5,
      certifiedRawMaterialKg,
      finishedProductKG,
      finalTcNumber,
    };
    const formData = new FormData();
    formData.append("image1", documentUpload1);
    formData.append("image2", documentUpload2);
    formData.append("image3", documentUpload3);
    formData.append("image4", documentUpload4);
    formData.append("image5", documentUpload5);
    formData.append("data", JSON.stringify(receivedPendingData));

    // let url = "http://192.168.1.41:8080/";
    let url = "http://localhost:8080/";

    if (status === "pending") {
      url += "savePendingData";
    } else {
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

  _next = () => {
    let currentStep = this.state.currentStep;
    if (currentStep == 2) {
      let { rm1_Percent, rm2_Percent, rm3_Percent, rm4_Percent } = this.state;
      rm1_Percent = this.parseProperty(rm1_Percent);
      rm2_Percent = this.parseProperty(rm2_Percent);
      rm3_Percent = this.parseProperty(rm3_Percent);
      rm4_Percent = this.parseProperty(rm4_Percent);
      let sum = rm1_Percent + rm2_Percent + rm3_Percent + rm4_Percent;
      if (sum != 100) {
        toast.error("RM percentages!=100, sum is " + sum);
        return;
      } else {
        this.setState({
          organicPercent: rm1_Percent,
          blend1Percent: rm2_Percent,
          blend2Percent: rm3_Percent,
          blend3Percent: rm4_Percent,
        });
      }
    } else if (currentStep == 4) {
      let {
        organicCheck,
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
        organicFinished,
        organicLoss,
      } = this.state;

      organicFinished = this.parseProperty(organicFinished);
      organicLoss = this.parseProperty(organicLoss);
      organicCheck = this.parseProperty(organicCheck);
      blend1Check = this.parseProperty(blend1Check);
      blend2Check = this.parseProperty(blend2Check);
      blend3Check = this.parseProperty(blend3Check);
      nonCertified1Check = this.parseProperty(nonCertified1Check);
      nonCertified2Check = this.parseProperty(nonCertified2Check);
      nonCertified3Check = this.parseProperty(nonCertified3Check);
      nonCertified4Check = this.parseProperty(nonCertified4Check);
      accessoriesWt = this.parseProperty(accessoriesWt);
      grossWtKg = this.parseProperty(grossWtKg);
      netWtKgFinished = this.parseProperty(netWtKgFinished);
      let netSum = netWtKgFinished - accessoriesWt;
      let finSum =
        organicCheck +
        blend1Check +
        blend2Check +
        blend3Check +
        nonCertified1Check +
        nonCertified2Check +
        nonCertified3Check +
        nonCertified4Check;
      console.log(netSum - finSum);
      console.log(organicCheck);
      console.log(organicFinished);
      console.log(organicLoss);
      console.log((organicFinished * (100 - organicLoss)) / 100);
      if (
        Math.abs(netSum - finSum) > 0.05 ||
        organicCheck !== (organicFinished * (100 - organicLoss)) / 100
      ) {
        toast.error(
          "Weight mismatch!! Organic Weight:" +
            organicFinished +
            " not equal to finished weight: " +
            (organicFinished * (100 - organicLoss)) / 100
        );
        return;
      }
    } else if (currentStep == 5) {
      let {
        netWtKgFinished,
        netWtKG,
        qtySold,
        organicFinished,
        openingStock,
      } = this.state;
      netWtKgFinished = this.parseProperty(netWtKgFinished);
      netWtKG = this.parseProperty(netWtKG);
      qtySold = this.parseProperty(qtySold);
      organicFinished = this.parseProperty(organicFinished);
      openingStock = this.parseProperty(openingStock);
      // finishedOpeningStock = this.parseProperty(finishedOpeningStock);
      let finishedOpeningStock = 0;
      let tempfinishedProductKG =
        finishedOpeningStock + netWtKgFinished - qtySold;
      let tempcertifiedRawMaterialKg = openingStock + netWtKG - organicFinished;
      this.setState({
        finishedProductKG: tempfinishedProductKG,
        certifiedRawMaterialKg: tempcertifiedRawMaterialKg,
      });
    }
    currentStep = currentStep >= 5 ? 6 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{
            borderRadius: 35,
            bottom: "50",
            left: "0",
          }}
          onClick={this._prev}
        >
          <Icon.ArrowLeft/>
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <IconButton
          onClick={this._next}
        >
          <Icon.ArrowRight/>
        </IconButton>
        
      );
    }
    return null;
  }

  submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep == 6) {
      return (
        <Button
          color="primary"
          size="small"
          variant="contained"
          style={{
            borderRadius: 35,
            bottom: "50",
            right: "0",
            float: "right",
          }}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <h4>Step {this.state.currentStep}/6</h4>

        <form onSubmit={this.handleSubmit} style={{ margin: "1em" }}>
          {/* 
        render the form steps and pass required props in
      */}
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            // email={this.state.email}
            status={this.state.status}
            customerName={this.state.customerName}
            customerAddress={this.state.customerAddress}
            standard={this.state.standard}
            customerSearch={this.customerSearch}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            // username={this.state.username}
            inwardDate={this.state.inwardDate}
            suppliersName={this.state.suppliersName}
            productDescription={this.state.productDescription}
            rm1={this.state.rm1}
            rm2={this.state.rm2}
            rm3={this.state.rm3}
            rm4={this.state.rm4}
            rm1_Percent={this.state.rm1_Percent}
            rm2_Percent={this.state.rm2_Percent}
            rm3_Percent={this.state.rm3_Percent}
            rm4_Percent={this.state.rm4_Percent}
            composition={this.state.composition}
            tcNumber={this.state.tcNumber}
            netWtKG={this.state.netWtKG}
            openingStock={this.state.openingStock}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            // username={this.state.username}
            lotPoNo={this.state.lotPoNo}
            finishedProduct={this.state.finishedProduct}
            organicName={this.state.organicName}
            blend1Name={this.state.blend1Name}
            blend2Name={this.state.blend2Name}
            blend3Name={this.state.blend3Name}
            nonCertified1Name={this.state.nonCertified1Name}
            nonCertified2Name={this.state.nonCertified2Name}
            nonCertified3Name={this.state.nonCertified3Name}
            nonCertified4Name={this.state.nonCertified4Name}
            organicPercent={this.state.organicPercent}
            recyclePre={this.state.recyclePre}
            recyclePost={this.state.recyclePost}
            blend1Percent={this.state.blend1Percent}
            blend2Percent={this.state.blend2Percent}
            blend3Percent={this.state.blend3Percent}
            nonCertified1Percent={this.state.nonCertified1Percent}
            nonCertified2Percent={this.state.nonCertified2Percent}
            nonCertified3Percent={this.state.nonCertified3Percent}
            nonCertified4Percent={this.state.nonCertified4Percent}
          />
          <Step4
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            organicFinished={this.state.organicFinished}
            recyclePreFinished={this.state.recyclePreFinished}
            recyclePostFinished={this.state.recyclePostFinished}
            organicLoss={this.state.organicLoss}
            recyclePreLoss={this.state.recyclePreLoss}
            recyclePostLoss={this.state.recyclePostLoss}
            organicCheck={this.state.organicCheck}
            recyclePreCheck={this.state.recyclePreCheck}
            recyclePostCheck={this.state.recyclePostCheck}
            blend1Check={this.state.blend1Check}
            blend2Check={this.state.blend2Check}
            blend3Check={this.state.blend3Check}
            nonCertified1Check={this.state.nonCertified1Check}
            nonCertified2Check={this.state.nonCertified2Check}
            nonCertified3Check={this.state.nonCertified3Check}
            nonCertified4Check={this.state.nonCertified4Check}
            accessoriesWt={this.state.accessoriesWt}
            grossWtKg={this.state.grossWtKg}
            netWtKgFinished={this.state.netWtKgFinished}
          />
          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            // email={this.state.email}
            buyerName={this.state.buyerName}
            invoiceNumber={this.state.invoiceNumber}
            invoiceDate={this.state.invoiceDate}
            transportDocNumber={this.state.transportDocNumber}
            transportDocDate={this.state.transportDocDate}
            qtySold={this.state.qtySold}
          />
          {/* <Step7
            currentStep={this.state.currentStep}
            handleChange={this.handleFileChange}
            handleBlur={this.handleBlur}
            // email={this.state.email}
            documentValidate1={this.state.documentValidate1}
            documentValidate2={this.state.documentValidate2}
            documentValidate3={this.state.documentValidate3}
            documentValidate4={this.state.documentValidate4}
            documentValidate5={this.state.documentValidate5}
            handleAssignmentCheck={this.handleAssignmentCheck}
          /> */}
          <Step6
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            certifiedRawMaterialKg={this.state.certifiedRawMaterialKg}
            finishedProductKG={this.state.finishedProductKG}
            finalTcNumber={this.state.finalTcNumber}
            status={this.state.status}
          />
          <div
            style={{ position: "relative", width: "100%", paddingTop: "20px" }}
          >
            {this.previousButton()}
            {this.state.currentStep < 6
              ? this.nextButton()
              : this.submitButton()}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  const {
    currentStep,
    status,
    customerName,
    customerAddress,
    standard,
    handleChange,
    customerSearch,
    handleBlur,
  } = props;
  if (currentStep !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      <h1> Customer Detail </h1>
      <div className="form-group">
        <DropDown
          fieldName={"status"}
          name={"Status"}
          newValue={false}
          multipleVal={false}
          dropDownValues={["pending", "completed"]}
          handleChange={handleChange}
          currentVal={status}
        />
        <GridList cellHeight={80} spacing={20} cols={5}>
          {/* <GridListTile cols={3}> */}
          {/* </GridListTile> */}
          <GridListTile cols={2}>
            <StyledTextField
              // error={false}
              className="form-control"
              id="customerName"
              name="customerName"
              type="text"
              variant="outlined"
              label="Customer Name"
              value={customerName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* <AutoDropDown
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
            /> */}
          </GridListTile>
          <GridListTile cols={3}>
            <StyledTextField
              // error={false}
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
          </GridListTile>
          <GridListTile cols={2}>
            <StyledTextField
              // error={false}
              className="form-control"
              id="standard"
              name="standard"
              type="text"
              variant="outlined"
              label="Standard"
              value={standard}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </GridListTile>
        </GridList>
      </div>
    </React.Fragment>
  );
}

function Step2(props) {
  const {
    currentStep,
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
    <div className="form-group">
      <h1> Raw Material Purchase Detail </h1>
      <Grid container spacing={5}>
        <Grid item md={4}>
          <TextField
            // error={false}
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
          <TextField
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
          />
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
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
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
          />
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
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
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
          />
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
          />
        </Grid>
        <br />
        <br />
        <Grid item md={3}>
          <TextField
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
          />
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
          />{" "}
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
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
          />
        </Grid>
      </Grid>
    </div>
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
  return (
    <div className="form-group">
      <h1> Finished Material Composition Details</h1>
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
          />
        </Grid>
        <br />
        <Grid item md={3}>
          <TextField
            // error={false}
            className="form-control"
            id="organicName"
            name="organicName"
            type="text"
            variant="outlined"
            label="Organic Material"
            value={organicName}
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
            className="form-control"
            id="blend1Name"
            name="blend1Name"
            type="text"
            variant="outlined"
            label="Blend 1 Material"
            value={blend1Name}
            onChange={handleChange}
            onBlur={handleBlur}
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
            className="form-control"
            id="blend2Name"
            name="blend2Name"
            type="text"
            variant="outlined"
            label="Blend 2 Material"
            value={blend2Name}
            onChange={handleChange}
            onBlur={handleBlur}
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
            className="form-control"
            id="blend3Name"
            name="blend3Name"
            type="text"
            variant="outlined"
            label="Blend 3 Material"
            value={blend3Name}
            onChange={handleChange}
            onBlur={handleBlur}
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
          />
        </Grid>
      </Grid>
    </div>
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
    grossWtKg,
    netWtKgFinished,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 4) {
    return null;
  }
  return (
    <div className="form-group">
      <h1>Finished Material Weight</h1>
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
          />
        </Grid>
        <Grid item md={3}>
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
  );
}

function Step5(props) {
  const {
    currentStep,
    buyerName,
    invoiceNumber,
    invoiceDate,
    transportDocNumber,
    transportDocDate,
    qtySold,
    handleChange,
    handleBlur,
  } = props;
  if (currentStep !== 5) {
    return null;
  }
  return (
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
          />
        </Grid>
      </Grid>
    </div>
  );
}

function Step7(props) {
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
  );
}

function Step6(props) {
  const {
    currentStep,
    handleChange,
    handleBlur,
    certifiedRawMaterialKg,
    finishedProductKG,
    finalTcNumber,
    status,
  } = props;
  if (currentStep !== 6) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <h1> Balance Inventory</h1>
        <Grid container spacing={5}>
          <Grid item md={6}>
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

          <Grid item md={6}>
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
  );
}

export default MasterForm;
