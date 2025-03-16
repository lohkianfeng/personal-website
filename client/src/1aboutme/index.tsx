import { Routes, Route } from "react-router";

const AboutMeRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <p>Loh Kian Feng</p>
            <p>lohkianfeng@gmail.com</p>
            <p>+6013-3232 233</p>
          </>
        }
      />
    </Routes>
  );
};

export default AboutMeRoutes;
