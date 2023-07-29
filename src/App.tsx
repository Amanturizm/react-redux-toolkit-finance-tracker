import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Transactions from "./containers/Transactions/Transactions";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Transactions />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
