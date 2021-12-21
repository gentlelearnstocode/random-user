import React, { useState, useEffect } from 'react';
import {IonApp, IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from '@ionic/react'
import { call as callIcon, person as personIcon, 
          mail as mailIcon, calendar as calendarIcon, map as mapIcon, key as keyIcon} from "ionicons/icons";



const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');


  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const { age } = person.dob;
    const { number, name } = person.location.street;


    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle('name');
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Random user</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            className='user-img'
            src={(person && person.image) || defaultImage}
            alt='random user'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button className='icon' data-label='name' onClick={handleValue}>
              <IonIcon icon={personIcon}/>
            </button>
            <button className='icon' data-label='email' onClick={handleValue}>
              <IonIcon icon={mailIcon}/>
            </button>
            <button className='icon' data-label='age' onClick={handleValue}>
              <IonIcon icon={calendarIcon}/>
            </button>
            <button className='icon' data-label='street' onClick={handleValue}>
              <IonIcon icon={mapIcon}/>
            </button>
            <button className='icon' data-label='phone' onClick={handleValue}>
              <IonIcon icon={callIcon}/>
            </button>
            <button className='icon' data-label='password' onClick={handleValue}>
              <IonIcon icon={keyIcon}/>
            </button>
          </div>
          <IonButton  color='primary' onClick={getPerson}>
            {loading ? 'loading...' : 'Random User'}
          </IonButton>
        </div>
      </div>
      </IonContent>
    </IonApp>
  );
}

export default App;
