import React  from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Header, Title, Characters, Pagination, Loader } from './styles';

import { useCharacterContext } from '../../hooks/characters'

const CharactersList: React.FC = () => {
  const {characters, loading, nextPage, previousPage, page} = useCharacterContext();

  return (
    <>
      <Link to="/">

      </Link>
      <Header>
        <Title>MARVEL CHARACTERS</Title>
        {loading && <Loader></Loader>}
      </Header>

      <Pagination>
        {page !== 1 && <span onClick={previousPage}>Previous</span>}
        <span onClick={nextPage }>Next</span>
      </Pagination>

      <Characters>
        {characters.map(character => (
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
