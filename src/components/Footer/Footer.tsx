import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
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
