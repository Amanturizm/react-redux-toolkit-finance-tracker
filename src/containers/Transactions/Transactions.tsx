import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { INITIAL_CATEGORY } from "../../constants";
import { deleteOne, fetchCategories, fetchTransactions } from "../../store/Transactions/TransactionsThunk";
import Transaction from "../../components/Transaction/Transaction";
import Preloader from "../../components/UI/Preloader/Preloader";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const { transactions, categories } = useAppSelector(state => state.transactions);
  const { transactionsLoading } = useAppSelector(state => state.transactions);

  useEffect(() => {
    (async () => {
      await dispatch(fetchTransactions());
      await dispatch(fetchCategories());
    })();
  }, [dispatch]);

  const formattedCategories = transactions.map(transaction => {
    return categories.find(category => category.id === transaction.category) || INITIAL_CATEGORY;
  });

  const total: number = transactions.length && categories.length ?
    transactions.reduce((acc, transaction, currentIndex) => {
      return acc +=
        formattedCategories[currentIndex].type === 'expense' ? -transaction.amount : transaction.amount;
  }, 0) : 0;

  const setDeleteConfirm = async (id: string) => {
    const entry: boolean = window.confirm('Delete?');

    if (entry) {
      await dispatch(deleteOne(id));
      await dispatch(fetchTransactions());
    }
  };

  return (
    <div>
      {
        transactions.length && categories.length ?
          <>
            <div
              className="
              d-flex justify-content-center align-items-center gap-2
              border border-2 border-black mx-auto mt-4
              "
              style={{ width: 350, height: 80 }}
            >
              <h3>Total: </h3><h3>{total} KGS</h3>
            </div>


            <div className="d-flex flex-column my-4 gap-3">
              {
                transactions.map((transaction, index) => {
                  return (
                    <Transaction
                      id={transaction.id}
                      datetime={transaction.datetime}
                      category={formattedCategories[index]}
                      amount={transaction.amount}
                      deleteClick={() => setDeleteConfirm(transaction.id)}
                      key={transaction.id}
                    />
                  )
                })
              }
            </div>
          </>
          : null
      }

      {transactionsLoading && <Preloader />}
      <Outlet />
    </div>
  );
};

export default Transactions;