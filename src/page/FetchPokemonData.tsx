import axios from 'axios';
import { Pokemon } from '../type/type';

// Function to fetch a single Pokemon by ID
export const fetchPokemonData = async (id: number): Promise<Pokemon | null> => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;

        // Extract relevant information from the API response
        const pokemon: Pokemon = {
            name: data.name,
            id: data.id,
            base_experience: data.base_experience,
            height: data.height,
            order: data.order,
            weight: data.weight,
            image: data.sprites?.front_default,
            types: data.types.map((type: any) => type.type.name),
        };

        return pokemon;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return null;
    }
};
