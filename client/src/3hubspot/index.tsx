import { Routes, Route, Navigate } from "react-router";

import Contacts from "./Contacts";

const HubspotRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="contacts" />} />
      <Route path="contacts" element={<Contacts />} />
    </Routes>
  );
};

export default HubspotRoutes;
