import axios from "axios";
import AuthenticationService from "./AuthenticationService";
import http from "./httpService";
// import * as downloader from "js-file-download";
// import { saveAs } from "file-saver";

// const apiEndpoint = "http://192.168.1.41:8080";
const apiEndpoint = "http://localhost:8080";

function getPendingDocumentsAddress() {
  return apiEndpoint + "/findAll";
}

function getCustomerListAddress() {
  return apiEndpoint + "/findAllCustomerMaster";
}

function getFilteredCustomerListAddress() {
  return apiEndpoint + "/findCustomerMaster";
}

function getTcListAddress() {
  return apiEndpoint + "/getTcBalance";
}

function getFilteredDocumentListAddress() {
  return apiEndpoint + "/findAllbyfilter";
}

function getCompletedFilteredDocumentListAddress() {
  return apiEndpoint + "/findCompletedAllbyfilter";
}

function getCompletedDocumentListAddress() {
  return apiEndpoint + "/completedFindAll";
}

function getVolumeVerificationAddress() {
  return apiEndpoint + "/verify";
}

function getSaveAddress() {
  return apiEndpoint + "/save";
}

function getFinishedMaterialStockAddress() {
  return apiEndpoint + "/getFinishedMaterialStock";
}

function getMarkAsCompleteAddress(serialNumber) {
  return apiEndpoint + "/updateStatus/" + serialNumber;
}

function getGenerateCertificateAddress(serialNumber) {
  return apiEndpoint + "/updateStatus/" + serialNumber;
}

function getRegenerateCertificateAddress(finalTcNumber) {
  return apiEndpoint + "/regenerateCertificate/" + finalTcNumber;
}

function getDownloadAllAddress() {
  return apiEndpoint + "/PendingExcel";
}

function getDownloadPeriodicAddress() {
  return apiEndpoint + "/PendingExcelByDate";
}

function getRmListAddress() {
  return apiEndpoint + "/findAllRmMaster";
}

function getAddNewCustomerAddress() {
  return apiEndpoint + "/saveCustomerMaster";
}

function getDeleteCustomerAddress(customer) {
  return apiEndpoint + "/DeleteCustomerMaster/" + customer;
}

function getProductListAddress() {
  return apiEndpoint + "/getByrm";
}

function getAddNewProductAddress() {
  return apiEndpoint + "/saveProductMaster";
}

function getAddNewRmAddress() {
  return apiEndpoint + "/saveRmMaster";
}

function getDeleteRmAddress(rm) {
  return apiEndpoint + "/admin/DeleteRmMaster/" + rm;
}

function getCheckTcNumberAddress(tcNumber) {
  return apiEndpoint + "/checkFinalTcNumber/" + tcNumber;
}

function getCertificateAdditionAddress() {
  return apiEndpoint + "/updatestatus";
}

export async function fetchPendingDocuments() {
  const { data: docsData } = await axios.get(getPendingDocumentsAddress());
  return docsData;
}

export async function fetchFilteredCustomerList(customerName) {
  const { data: customerList } = await axios.get(
    getFilteredCustomerListAddress() + "/" + customerName
  );
  return customerList;
}

export async function fetchCustomerList() {
  const { data: customerList } = await axios.get(getCustomerListAddress());
  return customerList;
}

export async function fetchRmList() {
  const { data: customerList } = await axios.get(getRmListAddress());
  return customerList;
}

export async function fetchTcList(customerName, composition) {
  const { data: tcList } = await axios.post(getTcListAddress(), {
    customerName: customerName,
    composition: composition,
  });
  return tcList;
}

export async function fetchFinishedMaterialStock(
  customerName,
  finishedProduct
) {
  const { data: stock } = await axios.post(getFinishedMaterialStockAddress(), {
    customerName: customerName,
    finishedProduct: finishedProduct,
  });
  return stock;
}

export async function fetchFilteredDocumentList(filterObj) {
  const { data: documentList } = await axios.post(
    getFilteredDocumentListAddress(),
    filterObj
  );
  return documentList;
}

export async function fetchCompletedFilteredDocumentList(filterObj) {
  const { data: documentList } = await axios.post(
    getCompletedFilteredDocumentListAddress(),
    filterObj
  );
  return documentList;
}

export async function verifyVolume(documentObj) {
  const { data: volumeVerificationInfo } = await axios.post(
    getVolumeVerificationAddress(),
    documentObj
  );
  return volumeVerificationInfo;
}

export async function saveDocData(documentObj) {
  const { data: submitStatus } = await axios.post(
    getSaveAddress(),
    documentObj
  );
  return submitStatus;
}

export async function markAsComplete(serialNumber) {
  const { data: completionStatus } = await axios.put(
    getMarkAsCompleteAddress(serialNumber)
  );
  return completionStatus;
}

export async function generateCertificate(serialNumber) {
  const { data: completionStatus } = await axios.post(
    getGenerateCertificateAddress(serialNumber)
  );
  return completionStatus;
}

export async function regenerateCertificate(finalTcNumber) {
  await axios
    .get(getRegenerateCertificateAddress(finalTcNumber), {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalTcNumber + ".docx");
      document.body.appendChild(link);
      link.click();
    });
}

export async function downloadPeriodic(schedule) {
  await axios
    .post(getDownloadPeriodicAddress(), schedule, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exportdata.xlsx");
      document.body.appendChild(link);
      link.click();

      // console.log(response);
      // var blob = new Blob()
      // const type = response.headers["content-type"];
      // const blob = new Blob([response.data], {
      //   type: "application/xls",
      //   encoding: "UTF-8",
      // });
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "file.xlsx";
      // link.click();
      // link.remove();
      // let filename = response.headers["content-disposition"]
      //   .split(";")
      //   .find((n) => n.includes("filename="))
      //   .replace("filename=", "")
      //   .trim();
      // let url = window.URL.createObjectURL(new Blob([response.data]));
      // saveAs(url, "test.xlsx");
      // var url = URL.createObjectURL(blob);
      // window.open(url);
      // downloader.default(response.data, "Analysis.xlsx");
    });
}

export async function downloadAll() {
  await axios
    .get(getDownloadAllAddress(), {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exportdata.xlsx");
      document.body.appendChild(link);
      link.click();
    });
}

export async function addNewCustomer(customerObj) {
  const { data: customerData } = await axios.post(
    getAddNewCustomerAddress(),
    customerObj
  );
  return customerData;
}
export async function deleteCustomer(customer) {
  const { data: customerData } = await axios.post(
    getDeleteCustomerAddress(customer)
  );
  return customerData;
}

export async function getProductList(customerName) {
  const { data: productList } = await axios.get(
    getProductListAddress() + "/" + customerName
  );
  return productList;
}
export async function addNewProduct(productObj) {
  const { data: productData } = await axios.post(
    getAddNewProductAddress(),
    productObj
  );
  return productData;
}

export async function addNewRm(rmObj) {
  const { data: rmData } = await axios.post(getAddNewRmAddress(), rmObj);
  return rmData;
}
export async function deleteRm(rm) {
  const { data: customerData } = await axios.post(getDeleteRmAddress(rm));
  return customerData;
}

export async function checkTcNumber(tcNumber) {
  const { data: tcExist } = await axios.post(getCheckTcNumberAddress(tcNumber));
  return tcExist;
}

export async function fetchCompleteDocuments() {
  const { data: docList } = await axios.get(getCompletedDocumentListAddress());
  return docList;
}

export async function sendFinalTcData(finalTc, formData) {
  // const { data: tcExist } = await axios.post(
  //   getCertificateAdditionAddress(),
  //   formData
  // );

  await axios
    .post(getCertificateAdditionAddress(), formData, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", finalTc + ".docx");
      document.body.appendChild(link);
      link.click();
    });
}

export default {
  fetchPendingDocuments,
  verifyVolume,
  saveDocData,
  fetchFilteredCustomerList,
  fetchRmList,
  fetchCustomerList,
  markAsComplete,
  generateCertificate,
  regenerateCertificate,
  downloadAll,
  downloadPeriodic,
  fetchFilteredDocumentList,
  fetchTcList,
  addNewCustomer,
  addNewProduct,
  getProductList,
  addNewRm,
  deleteCustomer,
  deleteRm,
  fetchFinishedMaterialStock,
  checkTcNumber,
  sendFinalTcData,
  fetchCompletedFilteredDocumentList,
  fetchCompleteDocuments,
};
