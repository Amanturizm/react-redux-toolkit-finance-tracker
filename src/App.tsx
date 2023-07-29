import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import NotFound from "./components/UI/NotFound/NotFound";
import Transactions from "./containers/Transactions/Transactions";
import TransactionsForm from "./components/TransactionsForm/TransactionsForm";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Transactions />}>
        <Route path="add-transaction" element={<TransactionsForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
