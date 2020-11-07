import md5 from 'md5';
import React, { createContext, useState, useContext, useCallback } from 'react'
import ApiContants from '~/constants/apiConstants';
import api from '../services/api'

interface Character {
    name: string;
    description: string;
    thumbnail: {
        path: string,
        extension: string
    };
    resourceURI: string
}

interface CharacterDetailContextData {
    character: Character,
    findCharacter(id: string): Promise<void>;
}

interface DetailCache {
    id: string,
    cacheInfo: Character
}

const CharacterDetailContext = createContext<CharacterDetailContextData>({} as CharacterDetailContextData);

export const CharacterDetailProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<Character>({} as Character);
    const [detailCache, setDetailCache] = useState<DetailCache[]>([]);

    const findCharacter = useCallback( async (id: string) => {
        if (detailCache && detailCache.length > 0) {
            const cacheData = detailCache.find(el => Number(el.id) === Number(id));

            if (cacheData) {
                setData(cacheData.cacheInfo);
                return;
            }
        }
        
        api.get(`characters/${id}`, {
            params: {
                apikey: ApiContants.public_key,
                ts: 1,
                hash: md5(ApiContants.secret),
            }
        }).then(
            response => {
                const character = response.data.data.results[0];
                setData(character);
                setDetailCache([...detailCache, { id: character.id, cacheInfo: character }])
            }
        )

    }, [detailCache, setData, setDetailCache])

    return (
        <CharacterDetailContext.Provider
            value={{ character: data, findCharacter}}
        >
            {children}
        </CharacterDetailContext.Provider>
    )
}

export function useCharacterDetailContext(): CharacterDetailContextData {
    const context = useContext(CharacterDetailContext)

    if (!context) {
        throw new Error()
    }
    return context;
}