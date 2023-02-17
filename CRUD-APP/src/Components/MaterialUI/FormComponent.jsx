import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Base_URL from "../../Base_URL";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phoneNumber: "",
  departmentTypeId: "",
};

const FormComponent = () => {
  const [departmentTypeId, setdepartmentTypeId] = useState("");
  const [departmentData, setdepartmentData] = useState([]);

  const [formValues, setFormValues] = useState(defaultValues);

  const getAllDepartmentData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/api/departments`);
      if (response.data) {
        setdepartmentData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDepartmentData();
  }, []);

  const handleChange = (event) => {
    setdepartmentTypeId(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormValues({
      ...formValues,
      ["departmentTypeId"]: departmentTypeId,
    });

    try {
      const response = await axios.post(`${Base_URL}/api/employees`, {
        ...formValues,
      });
      if (response.data) {
        setdepartmentData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className=" text-center text-3xl font-bold mt-10">Create New Form</h1>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="col">
          <div className="mt-10 flex flex-row justify-between">
            <div className="ml-32">
              <TextField
                sx={{ width: "200%" }}
                id="name-input"
                name="firstName"
                label="First Name"
                type="text"
                required
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className=" ml-64">
              <TextField
                sx={{ width: "200%" }}
                id="name-input"
                name="lastName"
                label="Last Name"
                type="text"
                required
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className=" mt-10 flex flex-row justify-between">
            <div className="ml-32">
              <TextField
                sx={{ width: "200%" }}
                id="name-input"
                name="email"
                label="Email"
                type="text"
                required
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>

            <div className=" ml-64">
              <TextField
                sx={{ width: "200%" }}
                id="name-input"
                name="phoneNumber"
                label="Phone Number"
                type="text"
                required
                // value={formValues.phoneNumber}
                // onChange={handleInputChange}
              />
            </div>
          </div>

          <div className=" mt-10 flex flex-row justify-between">
            <div className="ml-32">
              <TextField
                sx={{ width: "200%" }}
                id="name-input"
                name="address"
                label="Address"
                type="text"
                required
                // value={formValues.address}
                // onChange={handleInputChange}
              />
            </div>

            <div className="ml-64">
              <FormControl sx={{ minWidth: 200, width: 445 }}>
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Department"
                  onChange={handleChange}
                >
                  {departmentData.map((data, key) => {
                    return (
                      <MenuItem key={key} value={data?.id}>
                        {data?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormHelperText>Required</FormHelperText>
            </div>
          </div>
        </Grid>
        <div className="flex float-right mr-[190px] mt-10">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default FormComponent;
