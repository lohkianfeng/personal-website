import { Routes, Route, Navigate } from "react-router";

import PublicApp from "./PublicApp";
import PrivateApp from "./PrivateApp";

const HubspotRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="publicapp" />} />
      <Route path="publicapp" element={<PublicApp />} />
      <Route path="privateapp" element={<PrivateApp />} />
    </Routes>
  );
};

export default HubspotRoutes;
