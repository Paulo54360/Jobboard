import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import LoginPage from "./LoginPage";
import SignupField from "../components/signup";

export default function ConnectionPages() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box sx={{ minwidth: 100, width: 900, typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="REGISTER" value="1" />
              <Tab label="LOGIN" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignupField />
          </TabPanel>
          <TabPanel value="2">
            <LoginPage />{" "}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
