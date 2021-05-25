import { Paper, Tab, Tabs, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { REQUEST_TYPE } from "../../utils";
import {MedicalRequestsTable, MonetaryRequestsTable} from "../RequestsTable"
const RequestsTypeTab = ({filters}) => {
    const theme = useTheme();

    const requestType = [REQUEST_TYPE.MEDICAL, REQUEST_TYPE.MONETARY];
    const [type, setType] = useState(requestType[0]);
    const handleChange = (e, val) => {
        setType(requestType[val]);
    };
    return (
        <Paper
            style={{
                padding: theme.spacing(3, 2),
            }}
        >
            <div style={{ marginBottom: 8 }}>
                <Tabs
                    value={requestType.findIndex((t) => t === type)}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="standard"
                    centered={true}
                >
                    <Tab label="Medical" />
                    <Tab label="Monetary" />
                </Tabs>
            </div>
            {type === REQUEST_TYPE.MEDICAL ? (
                <MedicalRequestsTable filters={filters}></MedicalRequestsTable>
            ) : (
                <MonetaryRequestsTable
                    filters={filters}
                ></MonetaryRequestsTable>
            )}
        </Paper>
    );
};

export default RequestsTypeTab;
