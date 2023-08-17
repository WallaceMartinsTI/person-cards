import styles from "./Header.module.scss";
import Logo from "../../assets/logo192.png";

import { useThemeContext } from "../../hooks/useThemeContext";
import { useEffect, useRef } from "react";

import Moon from "../../assets/moon-stars.svg";
import Sun from "../../assets/sun.svg";

const Header = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMode = () => {
    setDarkTheme!(!darkTheme);
    console.log("Chamou");
  };

  useEffect(() => {
    if (darkTheme) {
      themeButtonRef.current!.style.backgroundImage = `url(${Moon})`;
      console.log(themeButtonRef);
    } else {
      themeButtonRef.current!.style.backgroundImage = `url(${Sun})`;
    }
  }, [darkTheme]);

  return (
    <div className={`${styles.header} ${darkTheme ? styles.dark : ""}`}>
      <div className={styles.logo_container}>
        <p>Gerador de Cards</p>
        <img className={styles.logo} src={Logo} alt="Gerador de Cards Logo" />
      </div>

      <div onClick={toggleMode} className={styles.theme_container}>
        <button ref={themeButtonRef}></button>
        <span></span>
      </div>

      <div className={styles.language_container}>Selecione a linguagem</div>
    </div>
  );
};

export default Header;
