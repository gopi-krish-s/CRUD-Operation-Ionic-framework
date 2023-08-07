import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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
  IonCard,
  IonApp,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

interface User {
  id: number;
  Name: string;
  Price: number;
  Oldprice: number;
  Description: string;
  // Add other properties as needed
}



const Edit: React.FC = () => {
  const [Name, setName] = useState<string>("");
  const [Price, setPrice] = useState<string>("");
  const [Oldprice, setOldprice] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((response) => response.json())
      .then((data: User) => {
        setName(data.Name);
        setPrice(data.Price);
        setOldprice(data.Oldprice);
        setDescription(data.Description);
      })
      .catch((error: Error) => console.error("Error:", error));
  }, [id]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const updatedUser = { Name, Price, Oldprice, Description };

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        history.push("/"); // Redirect to the homepage/table page
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem className="item-padding-top">
            <IonInput
              type="text"
              value={Name}
              label="Product Name"
              labelPlacement="floating"
              placeholder="Enter text"
              onIonChange={(e) => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="item-padding">
            <IonInput
              type="number"
              value={Price}
              label="Price"
              labelPlacement="floating"
              placeholder="Enter text"
              onIonChange={(e) => setPrice(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="item-padding">
            <IonInput
              type="number"
              value={Oldprice}
              label="Old Price"
              labelPlacement="floating"
              placeholder="Enter text"
              onIonChange={(e) => setOldprice(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="item-padding">
            <IonLabel position="floating"></IonLabel>
            <IonTextarea
              label="Description"
              labelPlacement="floating"
              value={Description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              placeholder="Enter text"
            ></IonTextarea>
          </IonItem>

          <IonButton expand="full" type="submit">
            Save
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Edit; 