/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../hooks/selector.hook";

export const isAuthenticatedSelector = () => useAppSelector((state) => state.auth.isAuthenticated)
export const tokenSelector = () => useAppSelector((state) => state.auth.token)