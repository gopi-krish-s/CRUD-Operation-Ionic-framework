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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonAlert,
  useIonToast,
  IonCheckbox,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Home.css"

const Create: React.FC = () => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Oldprice, setOldprice] = useState("");
  const [Description, setDescription] = useState("");
    const [Category, setCategory] = useState("");
const [presentToast] = useIonToast();

  const history = useHistory();

  const handleSubmit = (event: any) => {
    
    event.preventDefault();

    const newUser = { Name , Price, Oldprice , Description ,Category };

    fetch("http://localhost:3000/posts", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        presentToast({
          message: "Product created successfully",
          duration: 2000,
          position: "top",
          color: "success",
        });
        

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
              value={Price.toString()}
              label="Price"
              labelPlacement="floating"
              placeholder="Enter text"
              onIonChange={(e) => setPrice(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="item-padding">
            <IonInput
              type="number"
              value={Oldprice.toString()}
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

          <IonItem>
            <IonLabel>Category:</IonLabel>
            <IonSelect
              value={Category}
              placeholder="Select Category"
              interface="action-sheet"
              onIonChange={(e) => setCategory(e.detail.value)}
            >
              <IonSelectOption value="vegetables">Vegetables</IonSelectOption>
              <IonSelectOption value="fruits_nuts">
                Fruits & Nuts
              </IonSelectOption>
              <IonSelectOption value="dairy_creams">
                Dairy & Creams
              </IonSelectOption>
              <IonSelectOption value="packaged_food">
                Packaged Food
              </IonSelectOption>
              <IonSelectOption value="staples">Staples</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonCheckbox>Is Active</IonCheckbox>
          </IonItem>

          <IonButton expand="full" type="submit">
            Save
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Create;
