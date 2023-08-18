// React
import { useState, useEffect, useRef } from "react";

// Context
import { ContextProps } from "../../context/ThemeContext";

// Hooks
import { useThemeContext } from "../../hooks/useThemeContext";

// Translation
import { i18n } from "../../translate/i18n";

// Assets
import Logo from "../../assets/logo.png";
import Logo_Dark from "../../assets/logo-dark.png";
import Moon from "../../assets/moon-stars.svg";
import Sun from "../../assets/sun.svg";

// CSS
import styles from "./Header.module.scss";

// Others
import { getCountryFlag } from "../../App";

const I18N_STORAGE_KEY = "i18nextLng";

interface Props {
  logoTitle: string;
}

const Header = ({ logoTitle }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem(I18N_STORAGE_KEY)
  );

  const { darkTheme, setDarkTheme }: ContextProps = useThemeContext();

  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const logoImagenRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // set new language and refresh the page to apply new language
  const handleChangeLanguage = (newLang: string) => {
    setLanguage(newLang);
    location = location;
  };

  // Toggle light/dark mode
  const toggleMode = () => {
    setDarkTheme!(!darkTheme);
  };

  // display/hide modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // hide modal
  const hideModal = () => {
    setIsModalOpen(false);
  };

  // Renders title based on selected language
  const renderTitle = () => {
    let countryLang = "";
    let flag = "";
    if (language === "pt-BR") {
      countryLang = i18n.t("languages.portuguese");
      flag = "BR";
    } else if (language === "en-US") {
      countryLang = i18n.t("languages.english");
      flag = "US";
    } else if (language === "es-ES") {
      countryLang = i18n.t("languages.spanish");
      flag = "ES";
    } else if (language === "fr-FR") {
      countryLang = i18n.t("languages.french");
      flag = "FR";
    } else if (language === "de-DE") {
      countryLang = i18n.t("languages.german");
      flag = "DE";
    }

    return (
      <div className={styles.language_text}>
        <div onClick={toggleModal} className={styles.language_data}>
          <p>{countryLang}</p>
          <img src={getCountryFlag(flag, 32)} alt="" />
        </div>
      </div>
    );
  };

  // Set new language to local storage
  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, language as string);
  }, [language]);

  // Change light/dark theme icon
  useEffect(() => {
    if (darkTheme) {
      themeButtonRef.current!.style.backgroundImage = `url(${Moon})`;
    } else {
      themeButtonRef.current!.style.backgroundImage = `url(${Sun})`;
    }
  }, [darkTheme]);

  // Close modal if click ouside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as HTMLElement)
      ) {
        hideModal();
      }
    };

    addEventListener("mousedown", handleClickOutside);

    return () => {
      removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.header} ${darkTheme ? styles.dark : ""}`}>
      <div className={styles.logo_container}>
        <p>{logoTitle}</p>
        <img
          ref={logoImagenRef}
          className={styles.logo}
          src={darkTheme ? Logo_Dark : Logo}
          alt="Gerador de Cards Logo"
        />
      </div>

      <div onClick={toggleMode} className={styles.theme_container}>
        <button ref={themeButtonRef}></button>
        <span></span>
      </div>

      <div className={styles.language_container}>
        {renderTitle()}

        <div
          ref={modalRef}
          onMouseLeave={hideModal}
          className={isModalOpen ? styles.language_modal : styles.hide}
        >
          <div onClick={() => handleChangeLanguage("pt-BR")}>
            <p>{i18n.t("languages.portuguese")}</p>
            <img src={getCountryFlag("BR", 32)} alt="" />
          </div>

          <div onClick={() => handleChangeLanguage("en-US")}>
            <p>{i18n.t("languages.english")}</p>
            <img src={getCountryFlag("US", 32)} alt="" />
          </div>
          <div onClick={() => handleChangeLanguage("es-ES")}>
            <p>{i18n.t("languages.spanish")}</p>
            <img src={getCountryFlag("ES", 32)} alt="" />
          </div>
          <div onClick={() => handleChangeLanguage("fr-FR")}>
            <p>{i18n.t("languages.french")}</p>
            <img src={getCountryFlag("FR", 32)} alt="" />
          </div>
          <div onClick={() => handleChangeLanguage("de-DE")}>
            <p>{i18n.t("languages.german")}</p>
            <img src={getCountryFlag("DE", 32)} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
