import React, {useEffect, useState} from 'react';
import Modal from "../UI/Modal/Modal";
import CloseButton from "../UI/CloseButton/CloseButton";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCategories} from "../../store/Transactions/TransactionsThunk";
import {createOne, editOne, fetchOne} from "../../store/CategoriesSlice/CategoriesThunk";

const initialState: ICategoryForm = {
  type: '',
  name: ''
};

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.transactions);
  const { currentCategory } = useAppSelector(state => state.categories);

  const [formValues, setFormValues] = useState<ICategoryForm>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(fetchOne(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentCategory) {
      setFormValues(currentCategory);
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

    await dispatch(fetchCategories());
    navigate('/categories');
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
            {
              categories.map(category => (
                <option
                  key={'category-' + category.id}
                  className="text-black"
                  value={category.type}
                >
                  {category.type}
                </option>
              ))
            }
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
          className={`disabled-button btn btn-${id ? 'success' : 'primary' }`}
          disabled={isValid}
        >
          {id ? 'Edit': 'Create'}
        </button>
      </form>
    </Modal>
  );
};

export default CategoryForm;