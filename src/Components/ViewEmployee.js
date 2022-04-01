import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles({
  empListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

function ViewEmployee() {
  const classes = useStyles();
  const eid = useParams().eid;
  const [employee, setEmployee] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleEmployeeById();
  }, [eid]);

  async function getSingleEmployeeById() {
    try {
      const employee = await Axios.get(
        `http://localhost:5000/api/v1/employees/${eid}`
      );
      setEmployee(employee.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Box
        marginBottom="1rem"
        textAlign="center"
        p={2}
        className={classes.empListColor}
      >
        <Typography variant="h4">Employee Details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Age
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Salary
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Profile URL
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{employee?._id}</TableCell>
              <TableCell align="center">{employee?.employee_name}</TableCell>
              <TableCell align="center">{employee?.employee_age}</TableCell>
              <TableCell align="center">{employee?.employee_salary}</TableCell>
              <TableCell align="center">{employee?.profile_image}</TableCell>
              <TableCell align="center">{employee?.details}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default ViewEmployee;
