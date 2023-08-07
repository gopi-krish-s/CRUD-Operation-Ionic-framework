import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonNavLink,
  IonNav,
  IonGrid,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonAlert,
  IonLabel,
  IonFab, IonFabButton,
  IonCard,
  IonThumbnail,
} from "@ionic/react";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { add, trashSharp } from "ionicons/icons";
import Create from "./Create";
import Edit from "./Edit";
import { useHistory } from "react-router-dom";
import image from '../components/th.jpeg'

interface User {
  id: number;
  Name: string;
  Price: number;
  Oldprice: number;
  Description: string;
  // Add other properties as needed
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data: User[]) => {
        console.log(data); // Print data to console
        setUsers(data);
      })
      .catch((error: Error) => console.error("Error:", error));
  }, []);

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete"))
      fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setUsers(users.filter((user) => user.id !== id)); // updating local state
        })
        .catch((error: Error) => console.error("Error:", error));
  };
  const navigateToOtherPage = () => {
    history.push("/create");
  };
  const handleToOtherPage2 = (id: number) => {
    history.push(`/Edit/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Product List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList class="ion-padding">
          {users.map((user) => (
            <IonCard>
              <IonItem
                button
                key={user.id}
                onClick={() => handleToOtherPage2(user.id)}
              >
                <IonThumbnail slot="start">
                  <img alt="Silhouette of mountains" src={image} />
                </IonThumbnail>

                <IonLabel>
                  <IonGrid>
                    <IonRow>
                      <IonCol>{user.Name}</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>{user.Price}</IonCol>
                      <IonCol>{user.Oldprice}</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>{user.Description}</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
                <IonButton
                  slot="end"
                  onClick={(event) => handleDelete(event, user.id)}
                  color="danger"
                 
                >
                  <IonIcon icon={trashSharp}></IonIcon>
                </IonButton>
              </IonItem>
            </IonCard>
          ))}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={navigateToOtherPage}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
