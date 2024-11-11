import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import { Form } from ".";
import FormHeader from "./FormHeader"; // Importe o FormHeader
import FormItem from "./FormItem"; // Importe o FormItem
import FormTextArea from "./FormTextArea"; // Importe o FormTextArea
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useParams } from 'react-router-dom';
import { ConsultationService } from '../../core/services/ConsultationService';

const FormEvolutionHistoryForm = forwardRef((props: any, ref) => {
  const { id } = useParams<{ id: string }>();
  const consultationService = new ConsultationService();
  const [date, setDate] = useState("");
  const [sessionResume, setSessionResume] = useState("");
  const [nextSteps, setNextSteps] = useState("");

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const newEvolutionHistory = {
          date: date,
          sessionResume: sessionResume,
          nextSteps: nextSteps
        };

        await consultationService.addEvolutionHistory(Number(id), newEvolutionHistory);

        // Limpa os campos do formulário após o envio
        setDate("");
        setSessionResume("");
        setNextSteps("");

        console.log("Histórico de evolução adicionado com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar histórico de evolução:", error);
      }
    }
  }));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/patient/${id}`} />
          </IonButtons>
          <IonTitle>Adicionar Histórico de Evolução</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col justify-center items-center p-8">
          <Form.Root>
            <FormHeader text="Adicionar Histórico de Evolução" />
            <div className="grid grid-cols-1 gap-6">
              <FormItem label="Data">
                <input
                  className="w-full border border-zinc-400 p-2 rounded h-11"
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </FormItem>
              <FormItem label="Resumo da Sessão">
                <FormTextArea
                  name="sessionResume"
                  rows={5}
                  value={sessionResume}
                  onChange={(e) => setSessionResume(e.target.value)}
                />
              </FormItem>
              <FormItem label="Próximos Passos">
                <FormTextArea
                  name="nextSteps"
                  rows={5}
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                />
              </FormItem>
            </div>
          </Form.Root>
        </div>
      </IonContent>
    </IonPage>
  );
});

export default FormEvolutionHistoryForm;