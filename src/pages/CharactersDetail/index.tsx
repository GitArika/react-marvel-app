import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {  FiChevronLeft } from 'react-icons/fi';
import md5 from 'md5'

import api from '~/services/api';
import ApiContants from '../../constants/apiConstants';

import { Header, CharacterInfo } from './styles';

interface CharacterParams {
  id: string;
}

interface Character{
  name: string;
  description: string;
  thumbnail:  {
    path: string,
    extension: string
  };
  resourceURI: string
}

const CharactersDetail: React.FC = () => {
  const { params } = useRouteMatch<CharacterParams>();

  const [character, setCharacter] = useState<Character | null>(null);


  useEffect(() => {

    async function loadData(): Promise<void> {
      const response = await 
        api.get(`characters/${params.id}`, {
          params: {
            apikey: ApiContants.public_key,
            ts: 1,
            hash: md5(ApiContants.secret),
          }});

      setCharacter(response.data.data.results[0]);
    }

    loadData();
  }, [params.id]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16}/>
          Voltar
        </Link>
      </Header>

      {character && (
        <CharacterInfo>
          <header>
            <div>
              <img
                src={character?.thumbnail?.path + '.' + character?.thumbnail?.extension }
                alt={character.name}
              />
            </div>
            <div>
              <strong>{character.name}</strong>
              <p>{character.description}</p>
            </div>
          </header>
        </CharacterInfo>
      )}
    </>
  );
};

export default CharactersDetail;
