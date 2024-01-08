import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, Grid } from '@mui/material/';

import { fetchPokemonData} from './FetchPokemonData';
import { Pokemon } from '../type/type';

export const PokeDetail = () => {
    const { id } = useParams();
    const PokemonLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);


    useEffect(() => {
        const pokemonId = Number(id) ?? 0; // Convert id to number or use 0 if undefined
        fetchPokemonData(pokemonId).then((pokemonData) => {
            setPokemon(pokemonData);
        });
    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {pokemon && (
                    <>
                        <Typography variant="h4"> {pokemon.name} </Typography>
                        <Typography variant="subtitle1">No. {pokemon.id}</Typography>
                    </>
                )}
            </Grid>
            <Grid item xs={6}>
                {pokemon && <img src={pokemon.image} alt={pokemon.name} />}
            </Grid>
            <Grid item xs={6}>
                <img src="https://via.placeholder.com/50x50" alt="Legendary" />
            </Grid>
        </Grid>
    );
};
