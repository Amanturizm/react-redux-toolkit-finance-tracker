import React from 'react';
import { CATEGORIES_TYPES } from "../../constants";

interface Props {
  id?: string;
  name: string;
  categories: ICategory[];
  formValues: ITransactionForm;
  onChange: React.ChangeEventHandler;
}

const TransactionFormSelect: React.FC<Props> = ({ categories, name, formValues, onChange, id }) => {
  return (
    <select
      className="form-select mb-2"
      id={id}
      name={name}
      value={name === 'type' ? formValues.type : formValues.category}
      onChange={onChange}
    >
      <option value="" disabled hidden>Select {name}</option>
      {
        name === 'type' && categories.length ?
          CATEGORIES_TYPES.map((type, index) => {
            return (
              <option
                key={'category-' + categories[index].id}
                className="text-black"
                value={type}
              >
                {type[0].toUpperCase() + type.slice(1)}
              </option>
            );
          })
        :
          categories.map(category => {
            if (formValues.type.length && formValues.type !== category.type) return null;

            return (
              <option
                key={'category-' + category.id}
                className="text-black"
                value={category.id}
              >
                {category.name}
              </option>
            );
          })
      }
    </select>
  );
};

export default TransactionFormSelect;