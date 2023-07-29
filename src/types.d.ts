interface ITransaction {
  id: string;
  category: string;
  amount: number;
  datetime: string;
}

interface ITransactionApi {
  [id: string]: Omit<ITransaction, 'id'>;
}

interface ICategory {
  id: string;
  type: string;
  name: string;
}

interface ICategoryApi {
  [id: string]: Omit<ICategory, 'id'>;
}