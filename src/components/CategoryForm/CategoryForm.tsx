import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchCategories } from "../../store/Transactions/TransactionsThunk";
import { createOne, editOne, fetchOne } from "../../store/CategoriesSlice/CategoriesThunk";
import Modal from "../UI/Modal/Modal";
import Preloader from "../UI/Preloader/Preloader";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner";
import {clearCurrentCategory} from "../../store/CategoriesSlice/CategoriesSlice";

const initialState: ICategoryForm = {
  type: '',
  name: ''
};

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.transactions);
  const { currentCategory, currentCategoryLoading } = useAppSelector(state => state.categories);
  const { submitLoading, deleteLoading } = useAppSelector(state => state.categories);

  const [formValues, setFormValues] = useState<ICategoryForm>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(fetchOne(id));
    }

    return () => {
      dispatch(clearCurrentCategory());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentCategory) {
      setFormValues(currentCategory);
    }

    return () => {
      setFormValues(initialState);
    }
  }, [currentCategory]);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await dispatch(editOne({ newCategory: formValues, id }));
    } else {
      await dispatch(createOne(formValues));
    }

    navigate('/categories');
    await dispatch(fetchCategories());
  };

  const isValid: boolean =
    formValues.type.length < 1 ||
    formValues.name.length < 1;

  return (
    <Modal closeBtnTo="/categories">
      <h1>Create category: </h1>

      <form onSubmit={sendData} className="d-flex flex-column">
        <div className="d-flex align-items-center mb-2">
          <label
            htmlFor="category-type-select"
            style={{ width: 100 }}
          >
            Type:
          </label>
          <select
            className="form-select mb-2"
            id="category-type-select"
            name="type"
            value={formValues.type}
            onChange={changeValue}
          >
            <option value="" disabled hidden>Select type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="d-flex align-items-center mb-2">
          <label
            htmlFor="category-name"
            className="form-label"
            style={{ width: 100 }}
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="category-name"
            className="form-control"
            value={formValues.name}
            onChange={changeValue}
          />
        </div>

        <button
          className={`disabled-button
          btn btn-${id ? 'success' : 'primary'}
          d-flex justify-content-center align-items-center gap-3`}
          disabled={submitLoading || isValid}
        >
          {id ? 'Edit': 'Create'}{submitLoading && <ButtonSpinner />}
        </button>
      </form>

      {currentCategoryLoading && <Preloader />}
    </Modal>
  );
};

export default CategoryForm;