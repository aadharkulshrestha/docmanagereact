import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState,Fragment } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Icon from "react-feather";
import { Grid, Card, CardContent,Avatar,IconButton,Box,Checkbox,ListItem,ListItemIcon, } from '@material-ui/core';
import CustomizedTable from "./customizedTable";
import DocumentDataService from "./services/DocumentDataService";
import { Tooltip } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    deck: {
      display: "flex",
      justifyContent: "space-around",
      paddingBottom: theme.spacing(5),
    },
}));



export default function ViewPendingDoc(props) {
    const stylesCss = useStyles();

    const [docsData, setDocsData] = useState([]);
    const [completeDocsData, setCompleteDocsData] = useState([]);
    const history = useHistory();
    const [pending, setPending] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleViewPendingDocuments = () => {
        setPending(true)
        setComplete(false)
        DocumentDataService.fetchPendingDocuments().then((resp) => {
          setDocsData(resp);
        });
    };
    const handleCompleteClick = (row) => {
        DocumentDataService.markAsComplete(row.serialNumber)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            toast.error(error);
          });
      };
    
      const handleTableClick = (row) => {
        history.push({
          pathname: "/viewDocument/" + row.serialNumber,
          data: row,
        });
      };

    const handleCertificateClick = (row) => {
        DocumentDataService.regenerateCertificate(row.finalTcNumber)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            toast.error(error);
          });
    };
    
    const handleUpdateCustomer = (row) => {
        history.push({
          pathname: "/addDocument/" + row.serialNumber,
          data: row,
        });
    };
    const headData = [
      "Sl No",
      "User",
      "Customer",
      "Raw Material",
      "Product",
      "RM Inventory",
      "Product Inventory",
      "Status",
      "Action",
  ];
    
/*<IconButton
              size="small"
              color="primary"
              className="text-primary"
              title="View details">
              <FontAwesomeIcon
                icon={['far', 'keyboard']}
                className="font-size-lg"
              />
            </IconButton>*/
    return (
       <Fragment>
         <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Pending Documents
              </h4>
        <Box className="card-header--actions" align="right">
          <IconButton>
          <ListItemIcon align="right">
                <Icon.RefreshCcw/>
              </ListItemIcon>
          </IconButton>    
          </Box>
          
          </div>
          </div>
        <div className="card-body px-0 pt-2 pb-3">
        <div className="table-responsive">
          <table className="table table-striped table-hover text-nowrap mb-0">
            <thead className="thead-light">
              <tr>
                <th >Sl No.</th>
                <th className="text-center">User</th>
                <th className="text-center">Customer</th>
                <th className="text-center">Raw Material</th>
                <th className="text-center">Product</th>
                <th className="text-center">RM Inventory</th>
                <th className="text-center">Product Inventory</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex">
                    <div>
                      <span>1.</span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aadhar</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aa</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">200</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">100</span>
                </td>
                <td className="text-center">
                  <span className="btn-pill m-1 badge badge-danger">REJECTED</span>
                </td>
                <td className="text-center">
                <Box><Tooltip title="View">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Eye/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Trash/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Edit">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Edit/>
                   </IconButton></Tooltip>
                 </Box>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex">
                    <div>
                      <span>2.</span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aadhar</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aa</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">400</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">100</span>
                </td>
                <td className="text-center">
                <span className="btn-pill m-1 badge badge-warning">PENDING</span>
                </td>
                <td className="text-center">
                <Box><Tooltip title="View">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Eye/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Trash/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Edit">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Edit/>
                   </IconButton></Tooltip>
                 </Box>
                </td>
              </tr><tr>
                <td>
                  <div className="d-flex">
                    <div>
                      <span>3.</span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aadhar</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aa</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">200</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">500</span>
                </td>
                <td className="text-center">
                  <span className="btn-pill m-1 badge badge-success">COMPLETE</span>
                </td>
                <td className="text-center">
                <Box><Tooltip title="View">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Eye/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Trash/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Edit">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Edit/>
                   </IconButton></Tooltip>
                 </Box>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex">
                    <div>
                      <span>4.</span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aadhar</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">aa</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">cotton</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">200</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">500</span>
                </td>
                <td className="text-center">
                  <span className="btn-pill m-1 badge badge-dark">DELETE</span>
                </td>
                <td className="text-center">
                <Box><Tooltip title="View">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Eye/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Trash/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Edit">
                   <IconButton color="primary" size="small" spacing="5px">
                   <Icon.Edit/>
                   </IconButton></Tooltip>
                 </Box>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </Card>
       </Fragment>
        
    )

}
/*<React.Fragment>
<div>
<CustomizedTable
isCompleted={false}
headings={headData}
rows={docsData}
handleTableClick={handleTableClick}
handleUpdateCustomer={handleUpdateCustomer}
handleCompleteClick={handleCompleteClick}
handleCertificateClick={handleCertificateClick}
></CustomizedTable>
</div>
</React.Fragment>*/