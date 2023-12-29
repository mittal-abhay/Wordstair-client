import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import CandyButton from '../../components/buttons/candybutton/CandyButton';
import { useNavigate } from 'react-router-dom';
import HowToPlayDialogBox from '../../components/how-to-play-dialogbox/HowToPlayDialogBox';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from "../../assets/images/img1.jpeg";
import img2 from "../../assets/images/img2.jpeg";
import img3 from "../../assets/images/img3.jpeg";
import img4 from "../../assets/images/img4.jpeg";
import img5 from "../../assets/images/img5.jpeg";
import img6 from "../../assets/images/img6.jpeg";
import img7 from "../../assets/images/img7.jpeg";



const LandingPage = () => {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = React.useState(false);
  
  const handleSubmit = async (e) => {
    navigate('/home');
  };

  return (
    <div>
    <div className={styles.bg}>

      <div className={styles.logo}>
        <div className={styles.letter}>W</div>
        <div className={styles.letter}>O</div>
        <div className={styles.letter}>R</div>
        <div className={styles.letter}>D</div>
        <div className={styles.letter}>S</div>
        <div className={styles.letter}>T</div>
        <div className={styles.letter}>A</div>
        <div className={styles.letter}>I</div>
        <div className={styles.letter}>R</div>
      </div>

      <div className={styles.playbtn}>
        <CandyButton
          color="white"
          colorLight="#9c73eb"
          colorDark="#9c73eb"
          onClick={() => setShowHowToPlay(true)}
        >
          <div style={{ margin: '0 1rem' }}>How to Play ?</div>
        </CandyButton>
        <CandyButton
          color="white"
          colorLight="#00c486"
          colorDark="#00c486"
          onClick={handleSubmit}
        >
          <div style={{ margin: '0 1.25rem' }}>Play</div>
        </CandyButton>
      </div>

      {showHowToPlay && <HowToPlayDialogBox onClose={() => setShowHowToPlay(false)} />}
    </div>

   </div>
  );
};

export default LandingPage;
