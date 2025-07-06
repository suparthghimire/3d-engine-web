import packageJson from "../../package.json";

export const APP_CONFIG = {
  version: packageJson.version,
  name: "Morphy",
  description: "A powerful 3D modeling application built for the web platform",
  author: "Suparth Narayan Ghimire",
};

export const APP_INFO = {
  name: "Morphy",
  description: "A powerful 3D modeling application built for the web.",
  version: APP_CONFIG.version,
  developer: {
    name: "Suparth Narayan Ghimire",
    website: "https://suparth.com.np",
  },
  releaseDate: "December 2024",
  features: [
    "Basic 3D modeling",
    "Transform controls (move, rotate, scale)",
    "Vertex editing",
  ],
  logo: "/logo_with_name.svg",
  links: {
    github: "#",
  },
};
