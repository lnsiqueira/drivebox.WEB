// function Home(){
//     return <div>HOME 2</div>
// }

// export default Home
// pages/formulario.js

import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Select from 'react-select';


function Formulario() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [query, setQuery] = useState('');
  const [endereco, setEndereco] = useState('');

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

      
       let queryRef  =   db.collection('users') ;

       // Aplicar a query conforme necessário
      if (query) {
        console.log('query:', query);
        if(query == 'Awaiting for Approval'){
          queryRef = queryRef.where('instructorIsVerified', '==', false);
        }
        if(query == 'Verified Instructs'){
          queryRef = queryRef.where('instructorIsVerified', '==', true);
        }
       

      }

      const snapshot = await queryRef.get();
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

     
 
      //const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

 
      setData(newData);
    };

    fetchData();
  }, [query]);


  const handleSelectChange = (selectedOption) => {
    setSelectedItem(selectedOption);
  };

  const handleUpdateUserName = async () => {
    if (selectedUser && newUserName) {
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(selectedUser.id).update({ userName: newUserName });
        console.log('Nome de usuário atualizado com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar o nome de usuário:', error);
      }
    } else {
      console.error('Usuário ou nome de usuário inválido.');
    }
  };


  const handleUpdateIsVerified = async () => {
    if (selectedUser) {
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(selectedUser.id).update({ instructorIsVerified: true });
        console.log('Save instructorIsVerified');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Usuário ou nome de usuário inválido.');
    }
  };


  const handleCheckboxChange = (e) => {
    const selectedQuery = e.target.value;
    //setSelectedUser(null);
   
    setQuery(selectedQuery);
    setEndereco('');
    // setNewUserName('');
    // setSelectedItem(null);
    // setEndereco('');
  };

  return (
    <div>
      <h1>Formulário</h1>
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
      <br></br>
      <div className="container mx-auto mt-8">
        <div className="w-64">
          <label htmlFor="dados" className="block text-sm font-medium text-gray-700">Instruct:</label>
          <select id="dados" defaultValue="" onChange={e => setSelectedUser(JSON.parse(e.target.value))}>
            <option value="" disabled hidden>Selecione um dado</option>
            {data.map(item => (
              <option key={item.id} value={JSON.stringify(item)}>{item.userName}</option>
            ))}
          </select>
        </div>
        {selectedUser && (
          <div className="mt-4">
            
           
           
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço:</label>
            <input
            disabled
              id="endereco"
              type="text"
              value={selectedUser.userEmail}
              onChange={e => setEndereco(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />

          

 
            {/* <label htmlFor="newUserName" className="block text-sm font-medium text-gray-700">Novo Nome de Usuário:</label>
            <input
              id="newUserName"
              type="text"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            /> */}
             <br></br>
            <button onClick={handleUpdateIsVerified} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

 

export default Formulario;
