import { PaintOnlinePage } from "@/pages/PaintOnlinePage";
import { Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path=":id" element={<PaintOnlinePage />} />
      <Route
        path="*"
        element={<Navigate to={`/f${(+new Date()).toString(16)}`} replace />}
      />
    </Routes>
  );
};
