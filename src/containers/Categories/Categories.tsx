import React, { useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { deleteOne } from "../../store/CategoriesSlice/CategoriesThunk";
import { fetchCategories } from "../../store/Transactions/TransactionsThunk";
import Category from "../../components/Category/Category";
import Preloader from "../../components/UI/Preloader/Preloader";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { categories, categoriesLoading } = useAppSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteCategory = async (id: string) => {
    const entry = window.confirm('Delete?');
    if (entry) {
      await dispatch(deleteOne(id));
      await dispatch(fetchCategories());
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Categories:</h1>
        <Link to="add-category" className="btn btn-primary me-3">Add</Link>
      </div>

      <div className="d-flex flex-column gap-4">
        {
          categories.map(category => (
            <Category
              category={category}
              deleteClick={() => deleteCategory(category.id)}
              key={category.id}
            />
          ))
        }
      </div>

      {categoriesLoading && <Preloader />}
      <Outlet />
    </div>
  );
};

export default Categories;
