import * as React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminUser from "./pages/admin/adminUser";
import ConnectionPages from "./pages/connectionPages";
import AdminAdvertisements from "./pages/admin/adminAdvertisements";
import AdminCompagnies from "./pages/admin/adminCompanies";
import ApplyAdverisements from "./pages/applyAdvertisements";
import Navbar from "./components/nav";
import UpdateUserForm from "./components/updateUserForm";
import RecruiterHome from "./pages/recruiter/recruiterHome";

function App() {
  //pq ca charge pas des le debuts ???
  let user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("userAPP", user);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            {user && user.role === 3 ? (
              <RecruiterHome />
            ) : (
              <Dashboard appProps={user} />
            )}
          </Route>
          <Route path="/connect" exact>
            <ConnectionPages />
          </Route>
          <Route path="/admin/users">
            <AdminUser appProps={user} />
          </Route>
          <Route path="/admin/advertisements">
            <AdminAdvertisements appProps={user} />
          </Route>
          <Route path="/admin/compagnies">
            <AdminCompagnies appProps={user} />
          </Route>
          <Route path="/admin/applyAdvertisements">
            <ApplyAdverisements appProps={user} />
          </Route>
          <Route path="/userUpdate">
            <UpdateUserForm />
          </Route>
          <Route path="/recruiter/advertisements">
            <RecruiterHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
