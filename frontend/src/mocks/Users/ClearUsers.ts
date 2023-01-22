import { api } from "lib/api"

export const clearUsers = () => {
    api.delete('/users/clear');
}