import MapboxComponent from "../components/MapComponent";
import { NavBar } from "../components/NavBar";
import { Presentation } from "../components/Presentation";

export const Home = () => {
  return (
    <>
      <Presentation />
      <NavBar />
      <MapboxComponent />
    </>
  );
};
