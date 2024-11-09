import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

import React, { useEffect, useRef, useState } from 'react';
import FinanceBalance from '../components/FinanceBalance';
import { FinanceTable } from '../components/FinanceTable';
import { Form } from '../components/FormRegister';
import FormActionButton from '../components/FormRegister/FormActionButton';
import TransactionService from '../core/services/TransactionService';
import ActionButton from '../components/ButtonComponent/ActionButton';



const Finances: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const formRef = useRef<any>(null); 

  const [showModal, setShowModal] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    transactionType: 'Entrada',
    date: '',
    paymentMethod: 'Pix',
    paymentStatus: 'Pendente'
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null); 

  const [loading, setLoading] = useState(true); 

  const transactionService = new TransactionService();


  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData(transaction); 
    setShowModal(true);
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true); 
      const data = await transactionService.getAllTransactions();
      setTransactions(data); 
    } catch (error) {
      console.error('Erro ao obter transações:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

   const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  const handleAddTransaction = async (formData: any) => {
    try {
      if (selectedTransaction) {
        await transactionService.updateTransaction(formData, selectedTransaction.id); 
      } else {
        await transactionService.createTransaction(formData); 
      }
      fetchTransactions(); 
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };


  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <IonPage className='justify-start px-5 bg-gray3'>
      <Menu />
      <div className='h-screen flex items-start mt-20 lg:mt-10 '>
        
        <div className=' flex flex-col w-full lg:justify-center'>
          <div className='flex justify-center '>
            <div className='flex-col  lg:w-3/4 '>
              <div className='flex justify-between mx-5 lg:mx-0 '>
              <h1 className='text-3xl'>Financeiro</h1>
              <ActionButton
                text="ADICIONAR NOVO"
                onClick={() => setShowModal(true)}
                />

                {/* <IonButton onClick={() => setShowModal(true)} className="bg-blue1 text-white px-4 rounded-md w-48 my-1">
                  Adicionar novo
                </IonButton> */}
              </div>
              <div className='flex justify-center'>
              <FinanceBalance transactions={transactions} loading={loading} />
              </div>

            </div>


          </div>
          <div className='flex justify-center'>
            <div className='w-full lg:w-3/4'>
              <FinanceTable transactions={transactions} loading={loading} onEdit={handleEditTransaction} />
            </div>

          </div>
        </div>
      </div>
      

      <IonModal isOpen={showModal} onDidDismiss={() => { setShowModal(false); setSelectedTransaction(null); }}> {/* Resetar no fechamento */}
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedTransaction ? 'Editar Transação' : 'Nova Transação'}</IonTitle>

          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col justify-center items-center p-8">
            <Form.Finance ref={formRef} onSubmit={handleAddTransaction} formData={selectedTransaction} />
          </div>
          <div className="flex justify-center">
            <FormActionButton
              text="SALVAR"
              type="submit"
              onClick={handleSubmit} 
            />
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Finances;