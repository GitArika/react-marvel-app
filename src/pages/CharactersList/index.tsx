import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import md5 from 'md5'

import ApiContants from '../../constants/apiConstants';

import { Header, Title, Characters, Pagination, Loader } from './styles';


interface Character {
  id: number,
  name: string;
  description: string;
  thumbnail: {
    path: string,
    extension: string
  };
}

const CharactersList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>(() => {
    return [];
  });

  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    setPage(page - 1);
  }

  function getLimitOffset(): number {
    if(page === 1 )
      return 1;
    
    return  (page - 1) * 5  + 1;
  }
  async function loadData(): Promise<void> {
    setLoading(true);
    try {
      const response = await api.get('/characters', {
        params: {
          orderBy: 'name',
          limit: 5,
          offset: getLimitOffset(),
          apikey: ApiContants.public_key,
          ts: 1,
          hash: md5(ApiContants.secret),
  
        }
      });
  
      setCharacters(response.data.data.results);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <>
      <Link to="/">

      </Link>
      <Header>
        <Title>Universo Marvel</Title>
        {loading && <Loader></Loader>}
      </Header>


      <Characters>
        {characters?.map(character => (
          <Link
            key={character.name}
            to={`/character/${character.id}`}
          >
            <img
              src={character?.thumbnail?.path + '.' + character?.thumbnail?.extension}
              alt={character.name}
            />
            <div>
              <strong>{character.name}</strong>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Characters>
      <Pagination>
        {page !== 1 && <span onClick={previousPage}>Previous</span>}
        <span onClick={nextPage }>Next</span>
      </Pagination>
    </>
  );
};

export default CharactersList;
