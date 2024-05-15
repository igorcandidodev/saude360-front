import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Menu from '../components/Menu';

const Home: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen className="relative">
        <Menu/>
        
        <div className="text-center absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
          <h1>home</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
