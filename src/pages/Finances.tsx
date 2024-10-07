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
import FormActionButton from '../components/FormRegister/FormActionButton'; // Importa o botão de ação
import TransactionService from '../core/services/TransactionService';



const Finances: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const formRef = useRef<any>(null); // Criar a ref

  const [showModal, setShowModal] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    transactionType: 'Entrada',
    date: '',
    paymentMethod: 'Pix',
    paymentStatus: 'Pendente'
  });

  const transactionService = new TransactionService();

  const fetchTransactions = async () => {
    try {
      const data = await transactionService.getAllTransactions();
      setTransactions(data); 
    } catch (error) {
      console.error('Erro ao obter transações:', error);
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
      await transactionService.createTransaction(formData); 
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
              <div className='flex justify-between mx-5 lg:mx-0 h-14 '>
              <h1 className='text-3xl'>Financeiro</h1>
                <Link onClick={() => setShowModal(true)} className="flex items-center justify-center bg-blue1 text-white px-4 rounded-md w-48 my-1" to={'#'}>
                  Adicionar novo
                </Link>

                {/* <IonButton onClick={() => setShowModal(true)} className="bg-blue1 text-white px-4 rounded-md w-48 my-1">
                  Adicionar novo
                </IonButton> */}
              </div>
              <div className='flex justify-center'>
              <FinanceBalance transactions={transactions}/>
              </div>

            </div>


          </div>
          <div className='flex justify-center'>
            <div className='w-full lg:w-3/4'>
              <FinanceTable transactions={transactions}  />
            </div>

          </div>
        </div>
      </div>
      

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Nova Transação</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col justify-center items-center p-8">
            <Form.Finance ref={formRef} onSubmit={handleAddTransaction} />
          </div>
          <div className="flex justify-center">
            <FormActionButton
              text="Salvar"
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
