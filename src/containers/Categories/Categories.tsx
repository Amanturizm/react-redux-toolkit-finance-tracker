import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchCategories} from "../../store/Transactions/TransactionsThunk";
import category from "../../components/Category/Category";
import Category from "../../components/Category/Category";
import {Link, Outlet} from "react-router-dom";
import {deleteOne} from "../../store/CategoriesSlice/CategoriesThunk";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.transactions);

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

      <Outlet />
    </div>
  );
};

export default Categories;
