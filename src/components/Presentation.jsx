import "../styles/presentation.css";
import { Networks } from "./Networks";

export const Presentation = () => {
  return (
    <div className="content">
      <video autoPlay muted loop>
        <source src="../../public/videos/Tierra-girando.mp4" type="video/mp4" />
      </video>
      <img src="../../public/images/Logo_RedssApp.png" alt="" />
      <div className="transparent"></div>
      <Networks />
    </div>
  );
};
