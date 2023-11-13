import { Routes, Route } from "react-router-dom";
import HomeScreen from "./../screens/Home/HomeScreen";
import StreamsScreen from "./../screens/Streams/StreamsScreen";
import PartyScreen from "./../screens/Party/PartyScreen";
import PremiumScreen from "./../screens/Premium/PremiumScreen";
import Signin from "../screens/Auth/Signin";
import Signup from "../screens/Auth/Signup";
import NotFoundScreen from "../screens/NotFound/NotFoundScreen";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/streams" element={<StreamsScreen />} />
      <Route path="/party" element={<PartyScreen />} />
      <Route path="/premium" element={<PremiumScreen />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}
