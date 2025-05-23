import { Routes, Route } from "react-router";

import Ocr from "./Ocr";

const OcrRoutes = () => {
  return (
    <Routes>
      <Route index element={<Ocr />} />
    </Routes>
  );
};

export default OcrRoutes;
