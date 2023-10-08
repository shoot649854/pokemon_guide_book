import { useEffect, useState } from 'react';
import * as React from 'react';

import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    for (let i = 1; i < 550; i++) {
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
                types: data.types.map((typeData: any) => typeData.type.name).join(', '),
            }));
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            return []; 
        });
}

const cardContainerStyle: React.CSSProperties = {
    margin: '5% 5% 5% 5%',
    display: 'flex',
    flexDirection: 'row' as 'row', 
    flexWrap: 'wrap', 
    gap: '16px', 
  };
  
const cardStyle = {
    maxWidth: 500,
    width: 'calc(33.33% - 16px)', 
  };
  
export const PokeCard: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetchPokemon().then((pokemonArray) => {
            setPokemonList(pokemonArray);
        });
    }, []);
    
    return (
        <div style={cardContainerStyle}>
            {pokemonList.map((pokemon:any, index:number) => (
                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={pokemon.image}
                            title={pokemon.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {pokemon.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Types: {pokemon.types}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
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
                        <h5>Types: {pokemon.types}</h5>
                    </li>
                ))}
            </ul>
        </div>
    );
}
