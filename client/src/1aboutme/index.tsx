import { Routes, Route } from "react-router";

const AboutMeRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <div className="p-4">
            <p>Loh Kian Feng</p>
            <p>lohkianfeng@gmail.com</p>
            <p>+6013-3232 233</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AboutMeRoutes;
