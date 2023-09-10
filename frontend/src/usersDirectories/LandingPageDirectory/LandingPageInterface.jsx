import { Routes, Route } from "react-router-dom";
import HowItWorks from "./Pages/HowItWorks";
import LandingFinichedPage from "./Pages/LandingFinichedPage";
import LandingHomePage from "./Pages/LandingHomePage";
import LandingOngoingPage from "./Pages/LandingOngoingPage";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/SignupPage";
import Navbar from "./Components/Navbar.jsx";
import ActivationPage from "./Pages/Activationpage";
import EmailConfirmaed from "./Pages/EmailConfirmed";
import LandingPagePrivateRouter from "./LandingPagePrivateRouter";
function LandingPageInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<LandingPagePrivateRouter />}>
          <Route path="/" index={true} element={<LandingHomePage />} />
          <Route path="/email/Confirmation" element={<EmailConfirmaed />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onGoing" element={<LandingOngoingPage />} />
          <Route path="/finiched" element={<LandingFinichedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/howItWorks" element={<HowItWorks />} />
        </Route>
      </Routes>
    </>
  );
}
export default LandingPageInterface;
