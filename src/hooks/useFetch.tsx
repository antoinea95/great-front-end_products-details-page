import { useQuery } from '@tanstack/react-query';

export const useFetch = (endpoint: string, params?: Record<string, string>) => {
    const baseUrl = "https://www.greatfrontend.com/api/projects/challenges/e-commerce";
    let url = `${baseUrl}/${endpoint}`;
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
    }

    const {data, isLoading, isError, error, isFetched} = useQuery({
        queryKey: [endpoint, params], 
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
