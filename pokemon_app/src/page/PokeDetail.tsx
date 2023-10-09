import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Typography, Grid } from '@mui/material/';

import { fetchPokemon } from './PokeApp';
import { Pokemon } from '../type/type';

export const PokeDetail = () => {
    const { id } = useParams();
    const PokemonLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null); 

    useEffect(() => {
        fetchPokemon().then((pokemonData) => {
            setPokemon(pokemonData[0]);
        });
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>; // Add a loading indicator while fetching data
    }
    
    return (
        <Grid container spacing={0}>
        <Grid item xs={12}>
            <Typography variant="h4"> {pokemon.name} </Typography>
            <Typography variant="subtitle1">No.{pokemon.id}</Typography>
        </Grid>
        <Grid item xs={6}>
            <img src={pokemon.image} style={{ width: '50%', height: 'auto' }}  />
        </Grid>
        <Grid item xs={6}>
            <table>
            <tbody>
                <tr>
                <td>Height:</td>
                <td>2.0 m</td>
                </tr>
                <tr>
                <td>Weight:</td>
                <td>122.0 kg</td>
                </tr>
                <tr>
                <td>HP:</td>
                <td>106</td>
                </tr>
            </tbody>
            </table>
        </Grid>
        </Grid>
    );
}

