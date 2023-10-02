import React, { useEffect, useState } from 'react';

interface Pokemon {
    name: string;
    id: number;
    base_experience: number;
    height: number;
    order: number;
    weight: number;
    image: any;
    types: string[];
}

export const fetchPokemon = (): Promise<Pokemon[]> => {
    /**
     * @description Return information from PokeAPI
     * @param None
     * @returns name: data.name,
                id: data.id,
                base_experience: data.base_experience,
                height: data.height,
                order: data.order,
                weight: data.weight,
                image: data.sprites['front_default'],
                types: data.types,
     */


    const promise = [];
    for (let i = 1; i < 150; i++) {
        const PokemonLink = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promise.push(fetch(PokemonLink).then((result) => result.json()));
    }

    return Promise.all(promise)
        .then((result) => {
            return result.map((data) => ({
                name: data.name,
                id: data.id,
                base_experience: data.base_experience,
                height: data.height,
                order: data.order,
                weight: data.weight,
                image: data.sprites['front_default'],
                types: data.types,
            }));
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return []; // Return an empty array in case of an error
        });
}

function PokemonComponent() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetchPokemon().then((pokemonArray) => {
            setPokemonList(pokemonArray);
        });
    }, []);

    return (
        <div>
            <h1>Pokemon List</h1>
            <ul>
                {pokemonList.map((pokemon, index) => (
                    <li key={index}>
                        <h5>Name: {pokemon.name}</h5>
                        <img src={pokemon.image} />
                        <h5>Types: {pokemon.types.join(', ')}</h5> {/* Join the type names */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonComponent;
