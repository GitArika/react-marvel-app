import React, { useEffect } from 'react';
import {  Link, useRouteMatch } from 'react-router-dom';
import {  FiChevronLeft } from 'react-icons/fi';

import { Header, CharacterInfo } from './styles';
import { useCharacterDetailContext } from '../../hooks/characterDetail';

interface CharacterParams {
  id: string
}

const CharactersDetail: React.FC = () => {
  const { params } = useRouteMatch<CharacterParams>();
  const { character, findCharacter } = useCharacterDetailContext();
  useEffect(() => {
    findCharacter(params.id)
  }, [findCharacter, params.id])

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
