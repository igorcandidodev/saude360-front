import React from 'react';

const Form : React.FC = () => {
    return (
            <form className="">
                <div className="flex flex-col">
                    <label htmlFor="fullName">NOME COMPLETO</label>
                    <input className="border p-4 rounded" type="text" id="fullName" name="fullName"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="cpf">CPF</label>
                    <input className="border p-4 rounded" type="text" id="cpf" name="cpf" placeholder="000.000.000-00"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dateBirthday">DATA DE NASCIMENTO</label>
                    <input className="border p-4 rounded" type="date" id="dateBirthday" name="dateBirthday"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">E-MAIL</label>
                    <input className="border p-4 rounded" type="email" id="fullName" name="fullName"></input>
                </div>
               
                <div className="flex flex-col">
                    <label htmlFor="cellphone">NÚMERO DE CELULAR</label>
                    <input className="border p-4 rounded" type="text" id="cellphone" name="cellphone" placeholder="(00) 90000-0000"></input>
                </div>
              
                <div className="flex flex-col">
                    <label htmlFor="helthSector">ÁREA DE TRABALHO</label>
                    <input className="border p-4 rounded" type="text" id="helthSector" name="helthSector"></input>
                </div>
               <div className="flex flex-col">
                    <label htmlFor="cns">NÚMERO CNS</label>
                    <input className="border p-4 rounded" type="text" id="cns" name="cns"></input>
               </div>
            </form>
    );
};

export default Form;