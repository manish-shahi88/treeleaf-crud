import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudForm from "./components/CrudForm";
import CrudTable from "./components/CrudTable";
import Profiles from "./Profiles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to get items from localStorage
const getLocalItems = () => {
  const list = localStorage.getItem("items");
  return list ? JSON.parse(list) : [];
};

const App = () => {
  const [items, setItems] = useState(getLocalItems);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    // Update localStorage whenever `items` changes
    localStorage.setItem("items", JSON.stringify(items));
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
    setIsUpdate(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCancel = () => {
    setCurrentIndex(null);
    setIsUpdate(false);
  };

  return (
    <Router>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mt-2 font-bold tracking-wider">
          User Details Form
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CrudForm
                  setIsUpdate={setIsUpdate}
                  onSubmit={addItem}
                  currentData={
                    currentIndex !== null ? items[currentIndex] : null
                  }
                  onCancel={handleCancel}
                  isUpdate={isUpdate} // Pass isUpdate flag
                />
                <CrudTable
                  setIsUpdate={setIsUpdate}
                  data={items}
                  onEdit={editItem}
                  onDelete={deleteItem}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </>
            }
          />
          <Route path="/profiles" element={<Profiles />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
