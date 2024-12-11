import { useQuery } from '@tanstack/react-query';

type ReturnHookType<T> = {
    data: T,
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    isFetched: boolean
}

export const useFetch = <T,>(endpoint: string, params?: Record<string, string>) : ReturnHookType<T> => {
    const baseUrl = "https://www.greatfrontend.com/api/projects/challenges/e-commerce";
    let url = `${baseUrl}/${endpoint}`;
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
    }

    const {data, isLoading, isError, error, isFetched} = useQuery({
        queryKey: params ? [endpoint, params] : [endpoint], 
        queryFn: async () => {
        const response = await fetch(url);


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
    }})

    // Utiliser useQuery pour effectuer la requête
    return {data, isLoading, isError, error, isFetched};
};
