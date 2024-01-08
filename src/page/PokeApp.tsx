import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography, Box} from '@mui/material';
import { TablePagination} from '@mui/material/';


import { Pokemon } from '../type/type';

const cardContainerStyle = {
    margin: '5% 5% 5% 5%',
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const fetchPokemon = (offset: number, limit: number): Promise<Pokemon[]> => {
    const promise = [];
    for (let i = offset + 1; i <= offset + limit; i++) {
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
        console.error('Error fetching data:', error);
        return [];
      });
  };
  
  export const PokeCard: React.FC = () => {
    const NumbersOfPokemonInPage = 40;
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(NumbersOfPokemonInPage);
  
    useEffect(() => {
      fetchPokemon(page * rowsPerPage, rowsPerPage).then((pokemonArray) => {
        setPokemonList(pokemonArray);
      });
    }, [page, rowsPerPage]);
  
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <Box>
        <Box sx={cardContainerStyle}>
          {pokemonList.map((pokemon: any, index: number) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 140 }} image={pokemon.image} title={pokemon.name} />
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
        </Box>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  };