import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles({
  headerColor: {
    backgroundColor: deepPurple[600],
    color: "white",
  },
  addEmpColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

function EditEmployee() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([
    {
      employee_name: "",
      employee_salary: "",
      employee_age: "",
      profile_image: "",
      details: "",
    },
  ]);

  const onTextInputChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const eid = useParams().eid;

  useEffect(() => {
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
    getSingleEmployeeById();
  }, [eid]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.patch(`http://localhost:5000/api/v1/update/${eid}`, employee);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Box textAlign="center" p={2} className={classes.headerColor} mb={2}>
        <Typography variant="h4">
          REACT CRUD WITH MONGO BD AND REST API
        </Typography>
      </Box>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addEmpColor} mb={2}>
            <Typography variant="h4">Edit Employee</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  required
                  fullWidth
                  id="id"
                  disabled
                  value={employee?._id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_name"
                  required
                  autoFocus
                  fullWidth
                  id="employee_name"
                  label="Name"
                  value={employee?.employee_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_salary"
                  required
                  fullWidth
                  id="employee_salary"
                  label="Salary"
                  value={employee?.employee_salary}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_age"
                  required
                  fullWidth
                  id="employee_age"
                  label="Age"
                  value={employee?.employee_age}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="profile_image"
                  required
                  fullWidth
                  id="profile_image"
                  label="Image URL"
                  value={employee?.profile_image}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="details"
                  required
                  fullWidth
                  id="details"
                  label="Details"
                  value={employee?.details}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                onClick={(event) => onFormSubmit(event)}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SAVE EDIT
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EditEmployee;
