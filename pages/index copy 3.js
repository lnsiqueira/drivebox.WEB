// function Home(){
//     return <div>HOME 2</div>
// }

// export default Home
// pages/formulario.js

 
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Select from 'react-select';
import utilStyles from '../styles/utils.module.css';



function Formulario() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [query, setQuery] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [clearForm, setClearForm] = useState(false);



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
          queryRef = queryRef.where('instructorIsVerified', '==', true);
        }
        if(query == 'Verified Instructs'){
      
          queryRef = queryRef.where('instructorIsVerified', '==', false);
          
        }
        if(query == 'Close to Expire'){
          queryRef = queryRef.where('instructorIsVerified', '==', 1);
        }

      }

      const snapshot = await queryRef.get();
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(),
        email: doc.data().userEmail
      }));

 
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
    setQuery(selectedQuery);
   //  setEmail('');
   //setSelectedUser(null);
   //console.log(selectedUser);
   //handleRefresh();
   //setClearForm(true);
   
  };

  function handleRefresh() {
    window.location.reload();
  }
  
  const handleChange = (e) => {
    setSelectedUser(JSON.parse(e.target.value));
  };

  const renderOptions = () => {
    
    return data.map((item) => (
      <option key={item.id} value={JSON.stringify(item)}>
        {item.userName}
      </option>
    ));
   
  };

  useEffect(() => {
    if (clearForm) {
      setEmail('');
      setSelectedUser(null);
      setClearForm(false);
    }
  }, [clearForm]);


  return (
    <div className={utilStyles.news}>
      <h1>DRIVEBOX</h1>
      <style jsx>{`
		  h1 {
		    font-size: 3rem;
		  }
		`}</style>
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
            <option value="" disabled hidden>Select Instruct</option>
            {data.map(item => (
              <option key={item.id} value={JSON.stringify(item)}>{item.userName}</option>
            ))}
          </select>
        </div>
 
{/* <select id="dados" defaultValue="" onChange={handleChange}>
  {renderOptions()}
</select> */}

        {/* <button onClick={handleRefresh}>Atualizar Página</button> */}

       
        
        {selectedUser &&  ( 

          <div className="mt-4">
            <label htmlFor="email" className="labelWidth">E-mail:</label>
              <input
                    disabled
                    id="email"
                    type="text"
                    value={selectedUser.email}
                    onChange={e => setEmail(e.target.value)}
                    
                    className={utilStyles.email}
            />
             <br></br>
             <br></br>
            <button onClick={handleUpdateIsVerified}  className={utilStyles.backToHome}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

 

export default Formulario;
