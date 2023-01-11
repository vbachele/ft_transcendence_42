import { createContext, useState } from "react";

type PictureContextProviderProps = {
	children: React.ReactNode
}

export type PictureUser = {
	image: string
}

type PictureContextType = {
	picture: PictureUser | null | unknown;
	setPicture: React.Dispatch<React.SetStateAction<PictureUser | null | unknown>>
}

export const PictureContext = createContext({} as PictureContextType);

export const PictureContextProvider = ({
	children
}: PictureContextProviderProps) =>
{
	const [picture, setPicture] = useState<PictureUser | null | unknown>(null)
	return(
		<PictureContext.Provider value={{picture, setPicture}}> {children} </PictureContext.Provider> 
	)
}

export default PictureContext;