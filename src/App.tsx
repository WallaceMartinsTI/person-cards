import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import { useThemeContext } from "./hooks/useThemeContext";

const App = () => {
  const { darkTheme } = useThemeContext();

  return (
    <div className={`${styles.App} ${darkTheme ? styles.dark : ""}`}>
      <Header />
      <h1>Gerador de Cards Pessoais</h1>
      <button className={styles.generate_card_button}>Gerar Card</button>
    </div>
  );
};

export default App;
