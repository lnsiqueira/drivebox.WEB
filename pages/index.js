// function Home(){
//     return <div>HOME 2</div>
// }

// export default Home
// pages/formulario.js

import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Formulario() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyCziqYV9b-8j7AofQvhGjeSRS8LQxzJvVk",
            authDomain: "drivebox-app-37c3d.firebaseapp.com",
            databaseURL: "https://drivebox-app-37c3d-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "drivebox-app-37c3d",
            storageBucket: "drivebox-app-37c3d.appspot.com",
            messagingSenderId: "843428830779",
            appId: "1:843428830779:web:5c5de4b6ebfc6aa082861e",
            measurementId: "G-HS6J1SX7R0"
          };
          firebase.initializeApp(firebaseConfig);
          const db = firebase.firestore();

      //const db = firebaseAdmin.firestore();
      const snapshot = await db.collection('users').get();
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Formulário</h1>
      <form>
        <label htmlFor="dados">Dados:</label>
        <select id="dados" defaultValue="">
          <option value="" disabled hidden>Selecione um dado</option>
          {data.map(item => (
            <option key={item.id} value={item.id}>{item.userEmail}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Formulario;
