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
     
     
      //const newData = snapshot.docs.map(doc => ({ id: doc.userId, ...doc.data() }));
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


     //const newData = snapshot.docs.map(doc => ({ value: doc.id, label: doc.data().userEmail, ...doc.data() }));

      setData(newData);
    };

    fetchData();
  }, []);


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

  return (
    <div>
      <h1>Formulário</h1>
      <div className="container mx-auto mt-8">
        <div className="w-64">
          <label htmlFor="dados" className="block text-sm font-medium text-gray-700">Dados:</label>
          <select id="dados" defaultValue="" onChange={e => setSelectedUser(JSON.parse(e.target.value))}>
            <option value="" disabled hidden>Selecione um dado</option>
            {data.map(item => (
              <option key={item.id} value={JSON.stringify(item)}>{item.userName}</option>
            ))}
          </select>
        </div>
        {selectedUser && (
          <div className="mt-4">
            <label htmlFor="newUserName" className="block text-sm font-medium text-gray-700">Novo Nome de Usuário:</label>
            <input
              id="newUserName"
              type="text"
              value={newUserName}
              onChange={e => setNewUserName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button onClick={handleUpdateUserName} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">Formulário</h1>
//       <div className="w-64">
//         <label htmlFor="dados" className="block text-sm font-medium text-gray-700">Dados:</label>
//         <Select
//           id="dados"
//           options={data}
//           placeholder="Selecione um dado"
//           onChange={handleSelectChange}
//         />
//         {selectedItem && (
//           <div>
//             <p>Nome: {selectedItem.userName}</p>
//             <p>Email: {selectedItem.userEmail}</p>
//             {/* Adicione outros campos conforme necessário */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//   return (
   
//      <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">Formulário</h1>
//       <form>
//       <div className="w-64">
//         <label htmlFor="dados"  className="block text-sm font-medium text-gray-700">Dados:</label>
//         <select id="dados" defaultValue="">
//           <option value="" disabled hidden>Selecione um dado</option>
//           {data.map(item => (
//             <option key={item.iuserEmaild} value={item.userEmail}>{item.userName}</option>
//           ))}
//         </select>
//         </div>
//       </form>
//     </div>
//   );
// }

export default Formulario;
