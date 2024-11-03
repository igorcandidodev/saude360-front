import { IonContent, IonPage, IonInput, IonButton, IonImg } from "@ionic/react"; 
import { useEffect, useState } from "react";
import ToastService from "../core/services/ToastService";
import { AuthenticationService } from "../core/services/AuthenticationService";
import Logo from "../Images/Logo Saude360.svg";
import { cpfMask } from "../utils/cpfMask";
import { Form } from "../components/FormRegister";
import { Link, useHistory  } from "react-router-dom";


const ForgotPassword: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authenticationService = new AuthenticationService();
  const history = useHistory();
  

  const handleSendCode = () => {
    if (!cpf) {
      return ToastService.showError("Por favor, insira seu CPF");
    }
    
    setLoading(true);
    authenticationService.sendPasswordResetCode(cpf)
      .then(() => {
        setLoading(false);
        setIsCodeSent(true);
        ToastService.showSuccess("Instruções enviadas para o seu e-mail");
      })
      .catch(() => {
        setLoading(false);
        ToastService.showError("Erro ao enviar instruções. Tente novamente");
      });
  };

  const handlePasswordReset = () => { 
    const code = verificationCode.join("");
    
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!newPassword || !confirmPassword) {
      return ToastService.showError("Por favor, preencha a nova senha e a confirmação");
    }
    if (newPassword !== confirmPassword) {
      return ToastService.showError("As senhas não coincidem");
    }
    if (!passwordRegex.test(newPassword)) {
      return ToastService.showError("A senha deve ter pelo menos 8 caracteres e incluir uma letra maiúscula");
    }
    
    authenticationService.resetPassword(code, newPassword)
      .then(() => {
        ToastService.showSuccess("Senha redefinida com sucesso");
        history.push("/login");
      })
      .catch(() => {
        ToastService.showError("Erro ao redefinir a senha. Tente novamente");
      });
  };


  const handleCpfChange = (event: any) => {
    setCpf(cpfMask(event.target.value));
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[a-zA-Z0-9]*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value 
      setVerificationCode(newCode);
  
      if (value && index < 4) {
        (document.getElementById(`code-${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };
  
  const handleCodePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text');
    
    const newCode = [...verificationCode];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^[a-zA-Z0-9]*$/.test(pastedData[i])) { 
        newCode[i + index] = pastedData[i];
      }
    }
  
    setVerificationCode(newCode);
    
    const nextInputIndex = Math.min(index + pastedData.length, 5); 
    (document.getElementById(`code-${nextInputIndex}`) as HTMLInputElement)?.focus();
  };

  useEffect(() => {
    setCpf("");
    setVerificationCode(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
  }, [isCodeSent]);

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col justify-center items-center h-screen">
          <IonImg className="mt-10 w-80" src={Logo} alt="Logo"></IonImg>
          {isCodeSent ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Confira seu e-mail</h2>
              <p className="mb-6 text-gray-600 text-center">
                Insira o código de 6 dígitos que foi enviado para o e-mail.
              </p>
              <form className="flex justify-center space-x-2 mb-6">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onPaste={(e) => handleCodePaste(index, e)}
                    className="w-12 h-12 border border-zinc-400 text-center text-lg rounded"
                  />
                ))}
              </form>

              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Escolha uma nova senha</h2>
              <p className="mb-6 text-gray-600 text-center">
                Deve ter 8 dígitos, com pelo menos 1 letra maiúscula.
              </p>


              <div className="mb-4">
                <label className="pb-2 block" htmlFor="newPassword">
                  Nova senha*
                </label>
                <input
                  className="w-full border border-zinc-400 p-3 rounded placeholder-gray-400"
                  type="password"
                  id="newPassword"
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="pb-2 block" htmlFor="confirmPassword">
                  Confirmar nova senha*
                </label>
                <input
                  className="w-full border border-zinc-400 p-3 rounded placeholder-gray-400"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>


              <div className="flex gap-4 mt-4 items-baseline">
              <Form.ActionButtonOutline 
                    text="Voltar" 
                    className="w-36" 
                    onClick={() => setIsCodeSent(false)} 
                  />
                <Form.ActionButton
                  text="Redefinir senha"
                  onClick={handlePasswordReset}
                  disabled={loading}
                  className="w-36"
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Solicitar redefinição de senha</h2>
              <p className="mb-6 text-gray-600 text-center">
                Insira seu CPF abaixo para receber o código de autenticação por e-mail.
              </p>
              <form className="flex flex-col w-80">
                <div className="mb-4">
                  <label className="pb-2 block" htmlFor="cpf">
                    CPF*
                  </label>
                  <input
                    className="w-full border border-zinc-400 p-3 rounded placeholder-gray-400"
                    type="text"
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleCpfChange}
                  />
                </div>
              </form>
              <div className="flex gap-4 mt-4 items-baseline">
                <Link to="/login">
                  <Form.ActionButtonOutline text="Voltar" className="w-36" />
                </Link>
                <Form.ActionButton
                  id="sendCodeButton"
                  text="Receber código"
                  onClick={handleSendCode}
                  disabled={loading}
                  className="w-36"
                />
              </div>
            </>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
