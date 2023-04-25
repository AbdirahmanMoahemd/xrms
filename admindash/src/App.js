import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import Users from "./pages/Users/Users";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import Register from "./pages/Register";
import AddTasks from "./pages/Tasks/addTasks";
import UpdateTask from "./pages/Tasks/updateTask";
import BinTasks from "./pages/Tasks/bin_tasks";
import StoreItems from "./pages/store/store_items";
import AddStoreItem from "./pages/store/add_store_item";
import UpdateStoreItem from "./pages/store/update_store_item";
import Tasks from "./pages/Tasks/Tasks";
import Ecommerce from "./pages/Ecommerce";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
   

   
      const currentThemeColor = localStorage.getItem("colorMode");
      const currentThemeMode = localStorage.getItem("themeMode");
      if (currentThemeColor && currentThemeMode) {
        setCurrentColor(currentThemeColor);
        setCurrentMode(currentThemeMode);
      
    }
   
  
  }, [userInfo, navigate, setCurrentColor, setCurrentMode]);

 

  

  return (
    
    <div className={currentMode === "Dark" ? "dark" : ""}>
     {userInfo ?
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
             <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={<Ecommerce />} />
                  <Route path="/Dhashboard" element={<Ecommerce />} />

                  {/* pages  */}
                  <Route path="/update-store-item/:id" element={<UpdateStoreItem />} />
                  <Route path="/add-store-item" element={<AddStoreItem />} />
                  <Route path="/store" element={<StoreItems />} />

                  {/* apps  */}

                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/add-tasks" element={<AddTasks />} />
                  <Route path="/update-tasks/:id" element={<UpdateTask />} />
                  <Route path="/recycle-bin" element={<BinTasks />} />



                  <Route path="/users" element={<Users />} />


                  {/* Settings  */}
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/Logout" element={<Logout />} />
                  <Route path="/register" element={<Register />} />
             
                  <Route path="/login" element={<Login />} />
                </Routes>
                
            </div>
            <Footer />
          </div>
        </div>
     : <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     </Routes>
     }
    </div>
  );
};

export default App;
