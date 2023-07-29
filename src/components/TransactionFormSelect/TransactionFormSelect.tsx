import React from 'react';

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
        categories.map(category => {
          if ((name === 'category' && formValues.type.length) && formValues.type !== category.type) return null;

          return (
            <option
              key={'category-' + category.id}
              className="text-black"
              value={name === 'category' ? category.id : category.type}
            >
              {name === 'type' ? category.type : category.name}
            </option>
          );
        })
      }
    </select>
  );
};

export default TransactionFormSelect;