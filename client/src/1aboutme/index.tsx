import { Routes, Route } from "react-router";

const AboutMeRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <h1>About Me</h1>
          </>
        }
      />
    </Routes>
  );
};

export default AboutMeRoutes;
