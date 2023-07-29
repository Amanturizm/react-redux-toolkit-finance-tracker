import React, { useState } from 'react'
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import ButtonSpinner from "../UI/ButtonSpinner/ButtonSpinner";

interface Props {
  id: string;
  category: ICategory;
  datetime: string;
  amount: number;
  deleteClick: React.MouseEventHandler;
}

const Transaction: React.FC<Props> = ({ category, datetime, amount, deleteClick, id }) => {
  const { deleteLoading } = useAppSelector(state => state.transactions);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="border border-2 border-black p-4 d-flex justify-content-between align-items-center gap-5">
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center gap-5">
          <h3>{dayjs(datetime).format('DD/MM/YYYY HH:mm:ss')}</h3>
          <h2>{category.name}</h2>
        </div>

        <h2
          className={category.type === 'expense' ? 'text-danger' : 'text-success'}
        >
          {category.type === 'expense' ? '-' : '+'}{amount} KGZ
        </h2>
      </div>

      <div className="d-flex gap-3">
        <Link to={`/edit/${id}`} className="btn btn-success">edit</Link>
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

export default Transaction;