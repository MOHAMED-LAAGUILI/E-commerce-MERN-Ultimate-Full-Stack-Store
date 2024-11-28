import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A utility function to set the document meta tags dynamically
const setMetaTags = () => {
  document.title = "I-Shop | E-commerce Store";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", "Welcome to Company Name. Create an account to access exclusive features.");
  } else {
    const newMeta = document.createElement("meta");
    newMeta.setAttribute("name", "description");
    newMeta.setAttribute("content", "Welcome to Company Name. Create an account to access exclusive features.");
    document.head.appendChild(newMeta);
  }

  const metaImage = document.querySelector('meta[property="og:image"]');
  if (metaImage) {
    metaImage.setAttribute("content", "URL_TO_IMAGE"); // Replace with your social media image link
  } else {
    const newMetaImage = document.createElement("meta");
    newMetaImage.setAttribute("property", "og:image");
    newMetaImage.setAttribute("content", "URL_TO_IMAGE"); // Replace with your social media image link
    document.head.appendChild(newMetaImage);
  }
};

function App() {
  // Set the meta tags whenever the App component is loaded
  setMetaTags();

  return (
    <div className="font-mono ">
   
      <Header />
      <main className="min-h-[56vh] ">
        <Outlet />
      </main>
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
       // theme="colored"
      />
    </div>
  );
}

export default App;
