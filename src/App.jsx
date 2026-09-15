import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import ItemCategory from "./Components/ItemCategory";
import ItemCard from "./Components/ItemCard";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import AddCart from "./Pages/AddCart";
import CustomerInfo from "./Pages/customerInfo";




function App() {
  return (
    <div>
      

     <Routes>
     
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <SearchBar />
            <ItemCategory />
            <ItemCard />
            <Footer />
          </>
        }
      />
      <Route path="/card" element={<AddCart />} />
      <Route path="/card/orderSucces/customerInfo" element={<CustomerInfo/>}/>
    </Routes>
    </div>
  );
}

export default App;
