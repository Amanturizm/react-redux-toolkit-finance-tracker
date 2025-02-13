import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner";

interface Props {
  category: ICategory;
  deleteClick: React.MouseEventHandler;
}

const Category: React.FC<Props> = ({ category, deleteClick }) => {
  const { deleteLoading } = useAppSelector(state => state.categories);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="
    d-flex align-items-center justify-content-between gap-5
    border border-2 border-black rounded-4 p-3
    ">
      <div className={`
      d-flex align-items-center justify-content-between w-100
      `}>
        <h2>{category.name}</h2>
        <h2 className={category.type === 'expense' ? 'text-danger' : 'text-success'}>
          {
            category.type[0].toUpperCase() + category.type.slice(1)
          }
        </h2>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Link to={`edit/${category.id}`} className="btn btn-success">edit</Link>
        <button
          className={`disabled-button
          btn btn-danger
          d-flex justify-content-center align-items-center gap-3`}
          disabled={deleteLoading && isLoading}
          onClick={(e) => (() => {
            deleteClick(e);
            setIsLoading(true);
          })()}
        >
          delete{deleteLoading && isLoading && <ButtonSpinner />}
        </button>
      </div>
    </div>
  );
};

export default Category;