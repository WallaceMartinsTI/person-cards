// Hooks
import { useThemeContext } from "../../hooks/useThemeContext";

// CSS
import styles from "./Footer.module.scss";

const Footer = () => {
  const { darkTheme } = useThemeContext();
  return (
    <div className={`${styles.footer} ${darkTheme ? styles.dark : ""}`}>
      <a
        href="https://github.com/WallaceMartinsTI/person-cards"
        target="_blank"
      >
        Gerador de Cards &copy; WCSM
      </a>
    </div>
  );
};

export default Footer;
