import styles from "./Footer.module.scss";
import { useThemeContext } from "../../hooks/useThemeContext";

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
