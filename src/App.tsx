import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useThemeContext } from "./hooks/useThemeContext";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

const App = () => {
  const { darkTheme } = useThemeContext();

  const users = [
    {
      id: 0,
      gender: "male",
      username: "Usuario 1",
      profileImageSrc: "https://randomuser.me/api/portraits/med/men/2.jpg",
      first: "Primeiro",
      last: "Último",
      age: 24,
      rua: "Rua José Mariano",
      numero: 71,
      cidade: "Betim",
      estado: "Minas Gerais",
      cep: "32667-070",
      countryFlag: "BR",
    },
    {
      id: 1,
      gender: "female",
      username: "Usuario 2",
      profileImageSrc: "https://randomuser.me/api/portraits/med/women/47.jpg",
      first: "Primeiro",
      last: "Último",
      age: 28,
      rua: "Rua José Mariano",
      numero: 17,
      cidade: "Betim",
      estado: "Minas Gerais",
      cep: "32667-070",
      countryFlag: "US",
    },
    {
      id: 3,
      gender: "female",
      username: "Usuario 2",
      profileImageSrc: "https://randomuser.me/api/portraits/med/women/47.jpg",
      first: "Primeiro",
      last: "Último",
      age: 28,
      rua: "Rua José Mariano",
      numero: 17,
      cidade: "Betim",
      estado: "Minas Gerais",
      cep: "32667-070",
      countryFlag: "US",
    },
  ];

  const getCountryFlag = (countryFlag: string) => {
    return `https://flagsapi.com/${countryFlag}/flat/64.png`;
  };

  return (
    <div className={`${styles.App} ${darkTheme ? styles.dark : ""}`}>
      <Header />
      <main>
        <h1>Gerador de Cards Pessoais</h1>
        <button className={styles.generate_card_button}>Gerar Card</button>

        <section className={styles.cards_container}>
          {users.map((user) => (
            <div className={styles.card_container} key={user.id}>
              <section className={styles.images}>
                <img
                  src={user.profileImageSrc}
                  alt={`${user.first} ${user.last} perfil`}
                />
                <div className={styles.icon_container}>
                  {user.gender === "male" ? (
                    <div className={styles.male_icon}>
                      <BsGenderMale />
                    </div>
                  ) : (
                    <div className={styles.female_icon}>
                      <BsGenderFemale />
                    </div>
                  )}
                </div>
              </section>

              <section className={styles.data_container}>
                <div className={styles.data}>
                  <div>
                    <p>Usuário:</p>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <p>Nome:</p>
                    <p>
                      {user.first} {user.last}
                    </p>
                  </div>
                  <div>
                    <p>Idade:</p>
                    <p>{user.age} anos</p>
                  </div>
                </div>

                <div className={styles.address}>
                  <section>
                    <div>
                      <span>Endereço:</span> {user.rua}, {user.numero}
                    </div>
                    <div>
                      {user.cidade} - {user.estado}
                    </div>
                    <div>{user.cep}</div>
                  </section>

                  <div className={styles.country_flag}>
                    <img
                      src={getCountryFlag(user.countryFlag)}
                      alt={`${user.countryFlag} flag`}
                    />
                  </div>
                </div>
              </section>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
