import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./assets/locals/en.json";
import esJSON from "./assets/locals/es.json";
import ruJSON from "./assets/locals/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    es: { ...esJSON },
    ru: { ...ruJSON },
  }, // Where we're gonna put translations' files
  lng: "en", // Set the initial language of the App
});
