import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import NotFound from "./components/UI/NotFound/NotFound";
import Transactions from "./containers/Transactions/Transactions";
import TransactionsForm from "./components/TransactionsForm/TransactionsForm";
import Categories from "./containers/Categories/Categories";
import CategoryForm from "./components/CategoryForm/CategoryForm";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Transactions />}>
        <Route path="add-transaction" element={<TransactionsForm />} />
        <Route path="edit/:id" element={<TransactionsForm />} />
      </Route>

      <Route path="/categories" element={<Categories />}>
        <Route path="add-category" element={<CategoryForm />} />
        <Route path="edit/:id" element={<CategoryForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
