import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Select from 'react-select';
import utilStyles from '../styles/utils.module.css';

function Formulario() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');

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
      let queryRef = db.collection('users');

      if (query === 'Awaiting for Approval') {
        queryRef = queryRef.where('instructorIsVerified', '==', false);
      } else if (query === 'Verified Instructs') {
        queryRef = queryRef.where('instructorIsVerified', '==', true);
      } else if (query === 'Close to Expire') {
        queryRef = queryRef.where('instructorIsVerified', '==', 1);
      }

      const snapshot = await queryRef.get();
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), email: doc.data().userEmail }));
      setData(newData);
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    setEmail('');
  }, [selectedUser, query]); // Limpar o campo de e-mail sempre que o usuário selecionado ou a consulta for alterada

  const handleCheckboxChange = (e) => {
    setQuery(e.target.value);
    setEmail(''); // Limpar o campo de e-mail quando um checkbox é clicado

    setSelectedUser(null);
  };

  const handleChange = (e) => {
    setSelectedUser(JSON.parse(e.target.value));
  };


  const handleUpdateIsVerified = async () => {
    if (selectedUser) {
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(selectedUser.id).update({ instructorIsVerified: true });
        console.log('Save instructorIsVerified');
         handleRefresh();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Usuário ou nome de usuário inválido.');
    }
  };


  function handleRefresh() {
    window.location.reload();
  }
  


  return (
    <div className={utilStyles.news}>
      <h1>DRIVEBOX</h1>
      <div>
        <input type="checkbox" id="awaitingApproval" value="Awaiting for Approval" checked={query === "Awaiting for Approval"} onChange={handleCheckboxChange} />
        <label htmlFor="awaitingApproval">Awaiting for Approval</label>
      </div>
      <div>
        <input type="checkbox" id="verifiedInstructs" value="Verified Instructs" checked={query === "Verified Instructs"} onChange={handleCheckboxChange} />
        <label htmlFor="verifiedInstructs">Verified Instructs</label>
      </div>
      <div>
        <input type="checkbox" id="closeToExpire" value="Close to Expire" checked={query === "Close to Expire"} onChange={handleCheckboxChange} />
        <label htmlFor="closeToExpire">Close to Expire</label>
      </div>
      <div className="container mx-auto mt-8">
        <div className="w-64">
          <label htmlFor="dados" className="block text-sm font-medium text-gray-700">Instruct:</label>
          <select id="dados" defaultValue="" onChange={handleChange}>
            <option value="" disabled hidden>Select Instruct</option>
            {data.map(item => (
              <option key={item.id} value={JSON.stringify(item)}>{item.userName}</option>
            ))}
          </select>
        </div>

 
   

        {selectedUser && (
          <div className="mt-4">
            <label htmlFor="email" className="labelWidth">E-mail:</label>
            <input
              disabled
              id="email"
              type="text"
              value={selectedUser.email}
              className={utilStyles.email}
            />
            <br></br>
            <label htmlFor="email" className="labelWidth">adiNumber:</label>
            <input
              disabled
              id="email"
              type="text"
              value={selectedUser.adiNumber}
              className={utilStyles.email}
            />
           <div>
          <ul>
            {selectedUser.adiImages.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" >{url}</a>
              </li>
            ))}
          </ul>
        </div>


            <br></br>
            <br></br>

            <br></br>
            <button  onClick={handleUpdateIsVerified} className={utilStyles.backToHome}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Formulario;
