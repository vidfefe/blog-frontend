import { RouterProvider } from "react-router";
import { Suspense } from "react";

import { Loading } from "../shared/components/ui/Loading";
import { router } from "./router";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
