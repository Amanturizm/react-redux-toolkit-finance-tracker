import React, {useState} from 'react';
import Modal from "../UI/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import TransactionFormSelect from "../TransactionFormSelect/TransactionFormSelect";
import {createOne} from "../../store/Transactions/TransactionsThunk";

const initialState: ITransactionForm = {
  type: '',
  category: '',
  amount: ''
};

const TransactionsForm = () => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.transactions);

  const [formValues, setFormValues] = useState<ITransactionForm>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(createOne(formValues));
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
          className="disabled-button btn btn-primary"
          disabled={isValid}
        >
          Create
        </button>
      </form>
    </Modal>
  );
};

export default TransactionsForm;