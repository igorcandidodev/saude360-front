import { render, screen, waitFor, within, fireEvent  } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; 
import FinanceBalance from "../components/FinanceBalance";
import TransactionService from '../core/services/TransactionService';
import { FinanceTable } from '../components/FinanceTable';

describe('FinanceBalance Component', () => {
  it('calcula e exibe corretamente o balanço total', () => {
    const transactions = [
      { id: 1, name: 'Entrada 1', value: 100, transactionType: 'INCOME', paymentStatus: 'Pago' },
      { id: 2, name: 'Saída 1', value: 50, transactionType: 'EXPENSE', paymentStatus: 'Pago' },
    ];

    render(<FinanceBalance transactions={transactions} loading={false} />);

    const entradasDiv = screen.getByTestId('entradas');
    expect(entradasDiv).toBeInTheDocument();
    const entradasValue = within(entradasDiv).getByText('R$ 100,00');
    expect(entradasValue).toBeInTheDocument();


    const saidasDiv = screen.getByTestId('saidas');
    expect(saidasDiv).toBeInTheDocument();
    const saidasValue = within(saidasDiv).getByText('R$ 50,00');
    expect(saidasValue).toBeInTheDocument();

    const balancoDiv = screen.getByTestId('balanço');
    expect(balancoDiv).toBeInTheDocument();
    const balançoValue = within(balancoDiv).getByText('R$ 50,00');
    expect(balançoValue).toBeInTheDocument();
 
  });
  it('exibe animação de carregamento quando loading é true', () => {
    render(<FinanceBalance transactions={[]} loading={true} />);
    
    const loader = screen.getByTestId('moon-loader');
    expect(loader).toBeInTheDocument();
    
  });
});


describe('TransactionService', () => {
  it('deve criar uma transação corretamente', async () => {
    const mock = new MockAdapter(axios);
    const mockResponse = { success: true };
    mock.onPost(`${import.meta.env.VITE_API_URL}/transaction/`).reply(200, mockResponse); 

    const transactionData = {
      date: "2024-12-01T00:00:00Z",
      name: "Consulta João",
      paymentMethod: "PIX",
      paymentStatus: "CONCLUDED",
      transactionType: "INCOME",
      value: 200,
    };

    const transactionService = new TransactionService();

    const result = await transactionService.createTransaction(transactionData);

    expect(result).toEqual(mockResponse);

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1); 
      expect(mock.history.post[0].url).toBe(`${import.meta.env.VITE_API_URL}/transaction/`); 
      expect(mock.history.post[0].data).toBe(JSON.stringify(transactionData)); 
    });
  });

  it('deve retornar erro 403 ao tentar cadastrar uma transação com campos vazios', async () => {
    const mock = new MockAdapter(axios);
    const mockErrorResponse = { message: 'Forbidden: Campos obrigatórios não fornecidos' }; 
    mock.onPost(`${import.meta.env.VITE_API_URL}/transaction/`).reply(403, mockErrorResponse); 

    const transactionData = {
      date: "",
      name: "",
      paymentMethod: "",
      paymentStatus: "",
      transactionType: "",
      value: 0,
    };

    const transactionService = new TransactionService();

    try {
      await transactionService.createTransaction(transactionData);
    } catch (error) {
      expect(error.response.status).toBe(403);
      expect(error.response.data).toEqual(mockErrorResponse);
    }
  });

  it('deve atualizar uma transação com sucesso e retornar a resposta', async () => {
    const transactionData = {
      date: "2024-12-01T00:00:00Z",
      name: "Consulta João",
      paymentMethod: "PIX",
      paymentStatus: "CONCLUDED",
      transactionType: "INCOME",
      value: 200,
    };

    const updatedTransactionData = {
      ...transactionData,
      value: 250,  
    };

    const mockResponse = { success: true, transaction: updatedTransactionData }; 

    const mock = new MockAdapter(axios);
    mock.onPut(new RegExp(`${import.meta.env.VITE_API_URL}/transaction/`)).reply(200, mockResponse); 

    const transactionService = new TransactionService();
    const id = '123'; 

    const response = await transactionService.updateTransaction(updatedTransactionData, id);

    expect(response.success).toBe(true);
    expect(response.transaction.value).toBe(250);  
    expect(response.transaction.name).toBe("Consulta João");  
  });

  it('deve retornar erro 400 se houver um problema na atualização da transação', async () => {
    const transactionData = {
      date: "2024-12-01T00:00:00Z",
      name: "Consulta João",
      paymentMethod: "PIX",
      paymentStatus: "CONCLUDED",
      transactionType: "INCOME",
      value: 200,
    };

    const mockErrorResponse = { message: 'Erro na atualização da transação' };

    const mock = new MockAdapter(axios);
    mock.onPut(new RegExp(`${import.meta.env.VITE_API_URL}/transaction/`)).reply(400, mockErrorResponse); 

    const transactionService = new TransactionService();
    const id = '123'; 

    try {
      await transactionService.updateTransaction(transactionData, id);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual(mockErrorResponse);
    }
  });
});


describe('FinanceTable Component', () => {
  it('exibe as transações corretamente', () => {
    const mockTransactions = [
      {
        name: 'Salário',
        transactionType: 'INCOME',
        value: 5000,
        date: '2024-12-01',
        paymentMethod: 'PIX',
        paymentStatus: 'CONCLUDED',
      },
      {
        name: 'Compra Mercado',
        transactionType: 'EXPENSE',
        value: 300,
        date: '2024-11-28',
        paymentMethod: 'CREDIT_CARD',
        paymentStatus: 'PENDING',
      },
    ];

    render(<FinanceTable transactions={mockTransactions} loading={false} onEdit={vi.fn()} />);

    const firstRow = screen.getAllByRole('row')[1]; 
    expect(within(firstRow).getByText('Salário')).toBeInTheDocument();
    expect(within(firstRow).getByText('Entrada')).toBeInTheDocument();
    expect(within(firstRow).getByText('5000.00')).toBeInTheDocument();
    expect(within(firstRow).getByText('2024-12-01')).toBeInTheDocument();
    expect(within(firstRow).getByText('PIX')).toBeInTheDocument();
    expect(within(firstRow).getByText('Concluído')).toBeInTheDocument();

    const secondRow = screen.getAllByRole('row')[2];
    expect(within(secondRow).getByText('Compra Mercado')).toBeInTheDocument();
    expect(within(secondRow).getByText('Saída')).toBeInTheDocument();
    expect(within(secondRow).getByText('300.00')).toBeInTheDocument();
    expect(within(secondRow).getByText('2024-11-28')).toBeInTheDocument();
    expect(within(secondRow).getByText('Cartão de Crédito')).toBeInTheDocument();
    expect(within(secondRow).getByText('Pendente')).toBeInTheDocument();
  });

  it('exibe mensagem apropriada quando não há transações', () => {
    render(<FinanceTable transactions={[]} loading={false} onEdit={vi.fn()} />);

    expect(screen.getByText('Nenhuma transação encontrada.')).toBeInTheDocument();
  });

  it('exibe loader quando loading é true', () => {
    render(<FinanceTable transactions={[]} loading={true} onEdit={vi.fn()} />);

    const loader = screen.getByTestId('moon-loader');
    expect(loader).toBeInTheDocument();
  });

  it('chama onEdit com a transação correta ao clicar no botão de edição', () => {
    const mockTransactions = [
      {
        name: 'Salário',
        transactionType: 'INCOME',
        value: 5000,
        date: '2024-12-01',
        paymentMethod: 'PIX',
        paymentStatus: 'CONCLUDED',
      },
    ];
    const mockOnEdit = vi.fn();
    render(<FinanceTable transactions={mockTransactions} loading={false} onEdit={mockOnEdit} />);

    const editButton = screen.getByAltText('Editar');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockTransactions[0]);
  });
});