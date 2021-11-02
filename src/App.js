import React from "react";

import CommonLayout from "./components/CommonLayout";

const Change = React.lazy(() => import("./pages/Change"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <CommonLayout>
          <Change />
        </CommonLayout>
      </React.Suspense>
    </div>
  );
}

export default App;
