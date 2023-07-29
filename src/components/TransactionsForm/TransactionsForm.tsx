import React, {useEffect, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import TransactionFormSelect from "../TransactionFormSelect/TransactionFormSelect";
import {
  createOne,
  editOne,
  fetchCategories,
  fetchOne,
  fetchTransactions
} from "../../store/Transactions/TransactionsThunk";
import {useNavigate, useParams} from "react-router-dom";

const initialState: ITransactionForm = {
  type: '',
  category: '',
  amount: ''
};

const TransactionsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();

  const { transactions, categories, currentTransaction } = useAppSelector(state => state.transactions);

  const [formValues, setFormValues] = useState<ITransactionForm>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(fetchOne(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const categoryIndex = transactions
      .map(transaction => transaction.category)
      .findIndex((id, index) => id === categories.map(category => category.id)[index]);

    if (currentTransaction && categoryIndex > -1) {
      setFormValues({ ...currentTransaction, type: categories[categoryIndex].type });
    }
  }, [currentTransaction, categories, transactions]);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await dispatch(editOne({ newTransaction: formValues, id }));
    } else {
      await dispatch(createOne(formValues));
    }

    await dispatch(fetchTransactions());
    navigate('/');
  };

  const isValid: boolean =
    formValues.type.length < 1 ||
    formValues.category.length < 1 ||
    formValues.amount === '';

  return (
    <Modal>
      <h1 className="mb-4">Add Expense/Income</h1>

      <form onSubmit={sendData} className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <label
            htmlFor="transaction-type"
            className="form-label"
            style={{ width: 100 }}
          >
            Type: </label>
          <TransactionFormSelect
            id="transaction-type"
            name="type"
            categories={categories}
            formValues={formValues}
            onChange={changeValue}
          />
        </div>

        <div className="d-flex align-items-center">
          <label
            htmlFor="transaction-category"
            className="form-label"
            style={{ width: 100 }}
          >
            Category:
          </label>
          <TransactionFormSelect
            id="transaction-type"
            name="category"
            categories={categories}
            formValues={formValues}
            onChange={changeValue}
          />
        </div>

        <div className="d-flex align-items-center mb-2">
          <label
            htmlFor="transaction-amount"
            className="form-label"
            style={{ width: 100 }}
          >
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            id="transaction-amount"
            className="form-control"
            value={formValues.amount}
            onChange={changeValue}
          />
        </div>

        <button
          className={`disabled-button btn btn-${id ? 'success' : 'primary'}`}
          disabled={isValid}
        >
          {id ? 'Edit': 'Create'}
        </button>
      </form>
    </Modal>
  );
};

export default TransactionsForm;