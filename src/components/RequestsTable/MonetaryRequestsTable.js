import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router";
import { REQUEST_TYPE } from "../../utils";
import getDate from "../../utils/getDate";
import useGetRequests from "../../hooks/useGetRequests";
import useStyles from "./styles";

const columns = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "amountCollected",
    label: "Amount Collected",
  },
  {
    id: "volunteer",
    label: "Volunteer",
  },
  {
    id: "date",
    label: "Date",
  },
];

const MonetaryRequestsTable = ({ filters }) => {
  const classes = useStyles();

  const history = useHistory();
  const { docs, loading, handleScroll, error, hasMore } = useGetRequests(
    filters.concat([["type", "==", REQUEST_TYPE.MONETARY]])
  );

  return (
    <TableContainer>
      <InfiniteScroll
        dataLength={docs.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <h3 style={{ textAlign: "center" }}>
            <b>No More Requests!!</b>
          </h3>
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((headCell) => (
                <TableCell>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {docs.map((doc, idx) => (
              <TableRow
                hover
                onClick={() => {
                  history.push(`/requests/${doc.id}`);
                }}
                role="checkbox"
                tabIndex={-1}
                key={doc.id}
                className={classes.row}
              >
                <TableCell
                  component="th"
                  id={`enhanced-table-checkbox-${idx}`}
                  className={classes.title}
                >
                  {doc.title.length > 24
                    ? `${doc.title.slice(0, 24)}..`
                    : doc.title}
                </TableCell>
                {/* <TableCell className={classes.mediumBox}>
                  {`${doc.description.slice(0, 42)}...`}
                </TableCell> */}
                <TableCell>
                  <LinearProgress
                    value={
                      doc.amountNeeded
                        ? (doc.amountCollected / doc.amountNeeded) * 100
                        : 0
                    }
                    variant="determinate"
                    style={{
                      height: 6,
                      borderRadius: 2,
                    }}
                  />
                  <Typography align="right" style={{ fontSize: 14 }}>
                    &#x20B9;
                    {doc.amountNeeded &&
                      `${doc.amountCollected.toLocaleString(
                        "en-IN"
                      )}/${doc.amountNeeded.toLocaleString("en-IN")}`}
                  </Typography>
                </TableCell>
                <TableCell className={classes.veryLargeBox}>
                  <Button
                    variant="outlined"
                    color={doc.assignedTo ? "primary" : "secondary"}
                    size="small"
                    className={classes.button}
                  >
                    {doc.assignedTo ? doc.assignedTo : "Not assigned"}
                  </Button>
                </TableCell>
                <TableCell>{getDate(doc.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default MonetaryRequestsTable;
