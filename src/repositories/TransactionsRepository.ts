import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .reduce(function(sum, record: TransactionDTO) {
        return (record.type !== 'income') ? sum : sum + record.value;
      }, 0);

    const outcome = this.transactions
      .reduce(function(sum, record: TransactionDTO) {
        return (record.type !== 'outcome') ? sum : sum + record.value;
      }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
