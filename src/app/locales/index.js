import en from './en';
import ru from './ru';

const resources = {
  en,
  ru,
};

const getLangItem = ({ translation }) => {
  const { languageName: name, languageTag: tag } = translation;

  return { name, tag };
};

export const getAvaibleLanguages = () => Object.values(resources).map(getLangItem);

export default resources;
