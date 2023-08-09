import { createContext, useContext, useState } from 'react';
import GlobalStyle from '../GlobalStyle';
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);

	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext) throw new Error('useGlbalData hook은 GlobalProvider컴포넌트 안에서만 호출가능');

	return globalContext;
}
