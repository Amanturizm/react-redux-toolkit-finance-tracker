import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories, fetchTransactions } from "../../store/Transactions/TransactionsThunk";
import Transaction from "../../components/Transaction/Transaction";
import { INITIAL_CATEGORY } from "../../constants";
import {Outlet} from "react-router-dom";

const Transactions = () => {
  const dispatch = useAppDispatch();

  const { transactions, categories } = useAppSelector(state => state.transactions);

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
      return acc += formattedCategories[currentIndex].type === 'expense' ? -transaction.amount : transaction.amount;
  }, 0) : 0;

  return (
    <div>
      {
        transactions.length && categories.length ?
          <>
            <div
              className="border border-2 border-black d-flex justify-content-center align-items-center gap-2"
              style={{ width: 220, height: 80 }}
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
                      key={transaction.id}
                    />
                  )
                })
              }
            </div>
          </>
          : null
      }

      <Outlet />
    </div>
  );
};

export default Transactions;