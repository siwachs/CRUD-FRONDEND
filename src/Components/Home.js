import React, { useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import EmployeesList from "./EmployeesList";
import Axios from "axios";

const useStyles = makeStyles({
  headerColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addEmployeeColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

function Home() {
  const classes = useStyles(); //OBJ
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

  const [status, setStatus] = useState();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await Axios.post(`http://localhost:5000/api/v1/create`, employee);
      setStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (status) {
    //Re-render
    return <Home></Home>;
  }

  return (
    <React.Fragment>
      <Box
        textAlign="center"
        className={classes.headerColor}
        p={2}
        marginBottom="1rem"
      >
        <Typography variant="h4">
          REACT CRUD WITH MONGO BD AND REST API
        </Typography>
      </Box>

      {/* Employee Add */}
      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box
            textAlign="center"
            p={2}
            className={classes.addEmployeeColor}
            mb={2}
          >
            <Typography variant="h4">Add Employee</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="employee_name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_salary"
                  variant="outlined"
                  required
                  fullWidth
                  id="employee_salary"
                  label="Salary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="employee_age"
                  variant="outlined"
                  required
                  fullWidth
                  id="employee_age"
                  label="Age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="profile_image"
                  variant="outlined"
                  required
                  fullWidth
                  id="profile_image"
                  label="Image URL"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(event) => onTextInputChange(event)}
                  name="details"
                  variant="outlined"
                  required
                  fullWidth
                  id="details"
                  label="Details"
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(event) => onFormSubmit(event)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        {/* Employees List */}
        <Grid item md={6} xs={12}>
          <EmployeesList></EmployeesList>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
