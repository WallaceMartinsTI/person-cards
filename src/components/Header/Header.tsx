import styles from "./Header.module.scss";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import Logo_Dark from "../../assets/logo-dark.png";
import { i18n } from "../../translate/i18n";

import { useThemeContext } from "../../hooks/useThemeContext";
import { useEffect, useRef } from "react";

import Moon from "../../assets/moon-stars.svg";
import Sun from "../../assets/sun.svg";

import { getCountryFlag } from "../../App";

const I18N_STORAGE_KEY = "i18nextLng";

interface Props {
  logoTitle: string;
}

const Header = ({ logoTitle }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkTheme, setDarkTheme } = useThemeContext();

  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const logoImagenRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState(
    localStorage.getItem(I18N_STORAGE_KEY)
  );

  const handleChangeLanguage = (newLang: string) => {
    setLanguage(newLang);
    location = location;
  };

  useEffect(() => {
    localStorage.setItem(I18N_STORAGE_KEY, language as string);
  }, [language]);

  const toggleMode = () => {
    setDarkTheme!(!darkTheme);
  };

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
        console.log("Clique fora do elemento");
      }
    };

    addEventListener("mousedown", handleClickOutside);

    return () => {
      removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
