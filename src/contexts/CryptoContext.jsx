import { createContext } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {
  return <Crypto.Provider>{children}</Crypto.Provider>;
}

export default CryptoContext;
