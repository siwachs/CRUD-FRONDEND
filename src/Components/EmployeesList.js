import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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

export default function EmployeesList() {
  const classes = useStyles(); //OBJ
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getAllEmployees() {
      try {
        const employees = await Axios.get(
          "http://localhost:5000/api/v1/employees"
        );
        setEmployees(employees.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllEmployees();
  }, []);

  const deleteDocument = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/api/v1/delete/${id}`);

      //Update State
      const newEmployee = employees?.filter((employee) => {
        return employee._id !== id;
      });
      setEmployees(newEmployee);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Box textAlign="center" p={2} className={classes.empListColor} mb={2}>
        <Typography variant="h4">Employees List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow style={{ backgroundColor: "#616161" }}>
            <TableCell align="center" className={classes.tableHeadCell}>
              Id.
            </TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>
              NAME
            </TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>
              AGE
            </TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee, index) => {
            return (
              <TableRow key={employee._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{employee.employee_name}</TableCell>
                <TableCell align="center">{employee.employee_age}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton>
                      <Link to={`/view/${employee._id}`}>
                        <VisibilityIcon color="primary" />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton>
                      <Link to={`/edit/${employee._id}`}>
                        <EditIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteDocument(employee._id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </React.Fragment>
  );
}
