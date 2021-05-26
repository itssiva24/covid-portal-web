import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    id: "requirement",
    label: "Requirement",
  },
  {
    id: "state",
    label: "State",
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

const MedicalRequestsTable = ({ filters }) => {
  const classes = useStyles();

  const history = useHistory();
  const { docs, loading, handleScroll, error, hasMore } = useGetRequests(
    filters.concat([["type", "==", REQUEST_TYPE.Medical]])
  );
  // console.log({ docs, hasMore });
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
                  history.push(`/request/${doc.id}`);
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
                <TableCell className={classes.mediumBox}>
                  <Button variant="outlined" className={classes.button}>
                    {doc.requirement}
                  </Button>
                </TableCell>
                {/* <TableCell className={classes.mediumBox}>
                  {`${doc.description.slice(0, 42)}...`}
                </TableCell> */}
                <TableCell className={classes.largeBox}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                  >
                    {doc.state ? "N/A" : doc.state}
                  </Button>
                </TableCell>
                <TableCell className={classes.veryLargeBox}>
                  <Button
                    variant="outlined"
                    color={doc.assignedTo ? "primary" : "secondary"}
                    size="small"
                    className={classes.button}
                  >
                    {doc.assignedTo ? doc.assignedToVolunteer : "Not assigned"}
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

export default MedicalRequestsTable;
