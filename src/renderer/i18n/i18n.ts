
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en_US } from "./en_US";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en_US
        },
        lng: "en_US",
        fallbackLng: "en_US",
        interpolation: {
            escapeValue: false
        }
    });