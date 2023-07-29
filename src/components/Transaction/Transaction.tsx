import React from 'react'
import dayjs from "dayjs";

interface Props {
  category: ICategory;
  datetime: string;
  amount: number;
}

const Transaction: React.FC<Props> = ({ category, datetime, amount }) => {
  return (
    <div className="border border-2 border-black p-4 d-flex justify-content-between align-items-center gap-5">
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex gap-5">
          <h2>{dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}</h2>
          <h2>{category.name}</h2>
        </div>

        <h2
          className={category.type === 'expense' ? 'text-danger' : 'text-success'}
        >
          {category.type === 'expense' ? '-' : '+'}{amount} KGZ
        </h2>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success">edit</button>
        <button className="btn btn-danger">delete</button>
      </div>
    </div>
  );
};

export default Transaction;