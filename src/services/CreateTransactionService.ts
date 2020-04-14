import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type, id }: Transaction): Transaction {
    const getTotal = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > getTotal.total) {
      throw Error('Insufficient Funds');
    }

    const transaction = this.transactionsRepository.create({
      id,
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
