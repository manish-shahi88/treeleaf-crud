
// // src/App.js
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CrudForm from './components/CrudForm';
// import CrudTable from './components/CrudTable';
// import Profiles from './Profiles';

// // const getLocalItems = () => {
// //   let list = localStorage.getItem("items")
// //   console.log(list)
// //   if(list){
// //     return JSON.parse(localStorage.getItem("items"))
// //   }
// //   else{
// //     return []
// //   }
// // }
// const App = () => {
//   // const [items, setItems] = useState(getLocalItems());
//   const [items, setItems] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('items')) || [];
//     setItems(storedItems);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('items', JSON.stringify(items));
//   }, [items]);

//   const addItem = (newItem) => {
//     const updatedItems = [...items];
//     if (currentIndex !== null) {
//       updatedItems[currentIndex] = newItem;
//     } else {
//       updatedItems.push(newItem);
//     }
//     setItems(updatedItems);
//     setCurrentIndex(null);
//   };

//   const editItem = (index) => {
//     setCurrentIndex(index);
//   };

//   const deleteItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleCancel = () => {
//     setCurrentIndex(null);
//   };

//   return (
//     <Router>
//       <div>
//         <h1>CRUD Application</h1>
//         <Routes>
//           <Route path="/" element={
//             <>
//               <CrudForm 
//                 onSubmit={addItem}
//                 currentData={currentIndex !== null ? items[currentIndex] : null}
//                 onCancel={handleCancel}
//               />
//               <CrudTable 
//                 data={items}
//                 onEdit={editItem}
//                 onDelete={deleteItem}
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//               />
//               <Link to="/profiles">View Profiles</Link>
//             </>
//           } />
//           <Route path="/profiles" element={<Profiles />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CrudForm from './components/CrudForm';
import CrudTable from './components/CrudTable';
import Profiles from './Profiles';

// Function to get items from localStorage
const getLocalItems = () => {
  const list = localStorage.getItem("items");
  return list ? JSON.parse(list) : [];
};

const App = () => {
  const [items, setItems] = useState(getLocalItems);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Update localStorage whenever `items` changes
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    const updatedItems = [...items];
    if (currentIndex !== null) {
      updatedItems[currentIndex] = newItem;
    } else {
      updatedItems.push(newItem);
    }
    setItems(updatedItems);
    setCurrentIndex(null);
  };

  const editItem = (index) => {
    setCurrentIndex(index);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCancel = () => {
    setCurrentIndex(null);
  };

  return (
    <Router>
      <div>
        <h1>CRUD Application</h1>
        <Routes>
          <Route path="/" element={
            <>
              <CrudForm 
                onSubmit={addItem}
                currentData={currentIndex !== null ? items[currentIndex] : null}
                onCancel={handleCancel}
              />
              <CrudTable 
                data={items}
                onEdit={editItem}
                onDelete={deleteItem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Link to="/profiles">View Profiles</Link>
            </>
          } />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
