import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthenticationService from "./services/AuthenticationService";
import DocumentDataService from "./services/DocumentDataService";
import CustomTableRow from "./util/customTableRow";

function ViewDocument(props) {
  const [documentData, setDocumentData] = React.useState({
    username: AuthenticationService.getLoggedInUserName(),
    serialNumber: "",
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
  const location = useLocation();
  
  const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
  
  const handleMarkAsComplete = () => {
    DocumentDataService.MarkAsComplete(documentData.serialNumber)
      .then((response) => {
        setDocumentData(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleGenerateCertificate = () => {
    DocumentDataService.generateCertificate(documentData.serialNumber);
  };

  useEffect(() => {
    if (location.data) {
      console.log(location.data);
      setDocumentData(location.data);
    }
  }, [location]);

  return (
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <CustomTableRow head="Status" data={documentData.status} />
              <CustomTableRow
                head="Customer Name"
                data={documentData.customerName}
              />
              <CustomTableRow
                head="Customer Address"
                data={documentData.customerAddress}
              />
              <CustomTableRow head="Standard" data={documentData.standard} />
            </TableBody>
          </Table>

          <Table style={{ marginTop: "15px" }}>
            <TableBody>
              <CustomTableRow
                head="Inward date"
                data={documentData.inwardDate}
              />
              <CustomTableRow
                head="Suppliers Name"
                data={documentData.suppliersName}
              />
              <CustomTableRow
                head="Product Description"
                data={documentData.productDescription}
              />
              {documentData.rm1.length > 0 && (
                <div>
                  <CustomTableRow head="RM1" data={documentData.rm1} />
                  <CustomTableRow
                    head="RM1 percentage"
                    data={documentData.rm1_Percent}
                  />
                </div>
              )}
              {documentData.rm2.length > 0 && (
                <div>
                  <CustomTableRow head="RM2" data={documentData.rm2} />
                  <CustomTableRow
                    head="RM2 percentage"
                    data={documentData.rm2_Percent}
                  />
                </div>
              )}
              {documentData.rm3.length > 0 && (
                <div>
                  <CustomTableRow head="RM3" data={documentData.rm3} />
                  <CustomTableRow
                    head="RM3 percentage"
                    data={documentData.rm3_Percent}
                  />
                </div>
              )}
              {documentData.rm4.length > 0 && (
                <div>
                  <CustomTableRow head="RM4" data={documentData.rm4} />
                  <CustomTableRow
                    head="RM4 percentage"
                    data={documentData.rm4_Percent}
                  />
                </div>
              )}
              <CustomTableRow
                head="Composition"
                data={documentData.composition}
              />
              <CustomTableRow head="TC Number" data={documentData.tcNumber} />
              <CustomTableRow
                head="Net Weight KG"
                data={documentData.netWtKG}
              />
              <CustomTableRow
                head="openingStock"
                data={documentData.openingStock}
              />
            </TableBody>
          </Table>
          <Table style={{ marginTop: "15px" }}>
            <TableBody>
              <CustomTableRow head="lotPoNo" data={documentData.lotPoNo} />
              <CustomTableRow
                head="finishedProduct"
                data={documentData.finishedProduct}
              />
              <CustomTableRow
                head="organicName"
                data={documentData.organicName}
              />
              {documentData.blend1Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend1Name"
                    data={documentData.blend1Name}
                  />
                </div>
              )}
              {documentData.blend1Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend1Percent"
                    data={documentData.blend1Percent}
                  />
                </div>
              )}
              {documentData.blend2Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend2Name"
                    data={documentData.blend2Name}
                  />
                </div>
              )}
              {documentData.blend2Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend2Percent"
                    data={documentData.blend2Percent}
                  />
                </div>
              )}
              {documentData.blend3Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend3Name"
                    data={documentData.blend3Name}
                  />
                </div>
              )}
              {documentData.blend3Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="blend3Percent"
                    data={documentData.blend3Percent}
                  />
                </div>
              )}
              {documentData.nonCertified1Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified1Name"
                    data={documentData.nonCertified1Name}
                  />
                </div>
              )}
              {documentData.nonCertified1Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified1Percent"
                    data={documentData.nonCertified1Percent}
                  />
                </div>
              )}
              {documentData.nonCertified2Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified2Name"
                    data={documentData.nonCertified2Name}
                  />
                </div>
              )}
              {documentData.nonCertified2Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified2Percent"
                    data={documentData.nonCertified2Percent}
                  />
                </div>
              )}
              {documentData.nonCertified3Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified3Name"
                    data={documentData.nonCertified3Name}
                  />
                </div>
              )}
              {documentData.nonCertified3Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified3Percent"
                    data={documentData.nonCertified3Percent}
                  />
                </div>
              )}
              {documentData.nonCertified4Name.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified4Name"
                    data={documentData.nonCertified4Name}
                  />
                </div>
              )}
              {documentData.nonCertified4Percent.length > 0 && (
                <div>
                  <CustomTableRow
                    head="nonCertified4Percent"
                    data={documentData.nonCertified4Percent}
                  />
                </div>
              )}

              <CustomTableRow
                head="organicPercent"
                data={documentData.organicPercent}
              />
              <CustomTableRow
                head="recyclePre"
                data={documentData.recyclePre}
              />
              <CustomTableRow
                head="recyclePost"
                data={documentData.recyclePost}
              />
            </TableBody>
          </Table>
          <Table style={{ marginTop: "15px" }}>
            <TableBody>
              <CustomTableRow
                head="organicFinished"
                data={documentData.organicFinished}
              />
              <CustomTableRow
                head="recyclePreFinished"
                data={documentData.recyclePreFinished}
              />
              <CustomTableRow
                head="recyclePostFinished"
                data={documentData.recyclePostFinished}
              />
              <CustomTableRow
                head="organicLoss"
                data={documentData.organicLoss}
              />
              <CustomTableRow
                head="recyclePreLoss"
                data={documentData.recyclePreLoss}
              />
              <CustomTableRow
                head="recyclePostLoss"
                data={documentData.recyclePostLoss}
              />
              <CustomTableRow
                head="organicCheck"
                data={documentData.organicCheck}
              />
              <CustomTableRow
                head="recyclePreCheck"
                data={documentData.recyclePreCheck}
              />
              <CustomTableRow
                head="recyclePostCheck"
                data={documentData.recyclePostCheck}
              />
              <CustomTableRow
                head="blend1Check"
                data={documentData.blend1Check}
              />
              <CustomTableRow
                head="blend2Check"
                data={documentData.blend2Check}
              />
              <CustomTableRow
                head="blend3Check"
                data={documentData.blend3Check}
              />
              <CustomTableRow
                head="nonCertified1Check"
                data={documentData.nonCertified1Check}
              />
              <CustomTableRow
                head="nonCertified2Check"
                data={documentData.nonCertified2Check}
              />
              <CustomTableRow
                head="nonCertified3Check"
                data={documentData.nonCertified3Check}
              />
              <CustomTableRow
                head="nonCertified4Check"
                data={documentData.nonCertified4Check}
              />
              <CustomTableRow
                head="accessoriesWt"
                data={documentData.accessoriesWt}
              />
              <CustomTableRow head="grossWtKg" data={documentData.grossWtKg} />
              <CustomTableRow
                head="netWtKgFinished"
                data={documentData.netWtKgFinished}
              />
            </TableBody>
          </Table>
          <Table style={{ marginTop: "15px" }}>
            <TableBody>
              <CustomTableRow head="buyerName" data={documentData.buyerName} />
              <CustomTableRow
                head="invoiceNumber"
                data={documentData.invoiceNumber}
              />
              <CustomTableRow
                head="invoiceDate"
                data={documentData.invoiceDate}
              />
              <CustomTableRow
                head="transportDocNumber"
                data={documentData.transportDocNumber}
              />
              <CustomTableRow
                head="transportDocDate"
                data={documentData.transportDocDate}
              />
              <CustomTableRow head="qtySold" data={documentData.qtySold} />
            </TableBody>
          </Table>
          <Table style={{ marginTop: "15px" }}>
            <TableBody>
              <CustomTableRow
                head="certifiedRawMaterialKg"
                data={documentData.certifiedRawMaterialKg}
              />
              <CustomTableRow
                head="finishedProductKG"
                data={documentData.finishedProductKG}
              />
              {documentData.status === "completed" && (
                <CustomTableRow
                  head="finalTcNumber"
                  data={documentData.finalTcNumber}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {documentData.status === "pending" ? (
          
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              marginTop: "20px",
              color: "white",
              float: "right",
            }}
            onClick={handleMarkAsComplete}
          >
            Mark as Complete
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              marginTop: "20px",
              color: "white",
            }}
            onClick={handleGenerateCertificate}
          >
            Generate Certificate
          </Button>
        )}
      </div>
    </React.Fragment>
    </Paper>
  );
}

export default ViewDocument;
