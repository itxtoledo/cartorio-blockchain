import { API } from "./services/API";

const main = async () => {
  const api = new API();

  api.start();
};

main();
