import { mutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { checkAuth } from "./authQueries";

export const checkAuthOptions = queryOptions({
    queryKey: ['check-auth'],
    queryFn: checkAuth
})