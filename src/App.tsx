// React
import { useState } from "react";

// Hooks
import { useThemeContext } from "./hooks/useThemeContext";

// Components
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

// Translation
import { i18n } from "./translate/i18n";

// Icons
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

// CSS
import styles from "./App.module.scss";

interface UserProps {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  login: {
    username: string;
  };
  dob: {
    age: number;
  };
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    medium: string;
  };
  nat: string;
}

export const getCountryFlag = (countryFlag: string, size: number) => {
  return `https://flagsapi.com/${countryFlag}/flat/${size}.png`;
};

const App = () => {
  const { darkTheme } = useThemeContext();

  const [users, setUsers] = useState<UserProps[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const generatePerson = () => {
    const getUser = async () => {
      setIsLoading(true);
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const newUser = data.results;
      console.log(newUser);

      setUsers([...users, newUser[0]]);
      setIsLoading(false);
    };

    getUser();
  };

  return (
    <div className={`${styles.App} ${darkTheme ? styles.dark : ""}`}>
      <Header logoTitle={i18n.t("titles.logo_title")} />
      <main>
        <h1>{i18n.t("titles.main_title")}</h1>
        {isLoading ? (
          <button className={styles.generate_card_button} disabled>
            {i18n.t("buttons.loading")}...
          </button>
        ) : (
          <button
            onClick={generatePerson}
            className={styles.generate_card_button}
          >
            {i18n.t("buttons.generate_card")}
          </button>
        )}

        <section className={styles.cards_container}>
          {users.map((user, index) => (
            <div className={styles.card_container} key={index}>
              <section className={styles.images}>
                <img
                  src={user.picture.medium}
                  alt={`${user.name.first} ${user.name.last} perfil`}
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
                    <p>{i18n.t("messages.username")}:</p>
                    <p>{user.login.username}</p>
                  </div>
                  <div>
                    <p>{i18n.t("messages.name")}:</p>
                    <p>
                      {user.name.first} {user.name.last}
                    </p>
                  </div>
                  <div>
                    <p>{i18n.t("messages.age")}:</p>
                    <p>{user.dob.age} anos</p>
                  </div>
                </div>

                <div className={styles.address}>
                  <section>
                    <div>
                      <span className={styles.address_span}>
                        {i18n.t("messages.address")}
                      </span>
                      :&nbsp;{user.location.street.name},{" "}
                      {user.location.street.number}
                    </div>
                    <div>
                      {user.location.city} - {user.location.state}
                    </div>
                    <div>
                      {user.location.postcode} - {user.location.country}
                    </div>
                  </section>

                  <div className={styles.country_flag}>
                    <img
                      src={getCountryFlag(user.nat, 64)}
                      alt={`${user.nat} flag`}
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
