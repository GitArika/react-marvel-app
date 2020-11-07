import md5 from 'md5';
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import ApiContants from '~/constants/apiConstants';
import api from '../services/api'

interface Character{
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string,
        extension: string
    };
}

interface CharacterContextData {
    characters: Character[],
    loading: boolean,
    nextPage(): void,
    previousPage(): void,
    page: number
}

interface PageCache {
    page: number,
    cacheInfo: Character[]
}

const CharacterContext = createContext<CharacterContextData>({} as CharacterContextData);

export const CharacterProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [pageCache, setCache] = useState<PageCache[]>([]);

    const [loading, setLoading] = useState(true);

    const  nextPage = useCallback( () => {

        setPage(page + 1);
    }, [setPage, page]);

    const previousPage = useCallback( () => {

        setPage(page - 1);
    }, [setPage, page])

    const getLimitOffset = useCallback( (): number =>  {
        if (page === 1)
            return 1;

        return (page - 1) * 5 + 1;
    }, [page]);

    useEffect(() => {
        setLoading(true);

        if (pageCache && pageCache.length > 0) {
            const cacheData =  pageCache.find(el => el.page === page);

            if(cacheData) {
                setData(cacheData.cacheInfo);
                setTimeout(() => {
                    setLoading(false);
                }, 400);

                return;
            }
        }

        try {
            api.get('/characters', {
                params: {
                    orderBy: 'name',
                    limit: 20,
                    offset: getLimitOffset(),
                    apikey: ApiContants.public_key,
                    ts: 1,
                    hash: md5(ApiContants.secret),

                }
            }).then(response => {
                const formatedCacheData = response.data.data.results as Character[];

                setCache([...pageCache, { page, cacheInfo: formatedCacheData }])
                setData(response.data.data.results);
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }, [getLimitOffset, setLoading, setData, setCache, pageCache, page])

    return (
        <CharacterContext.Provider
            value={{characters: data, loading, nextPage, previousPage, page}}
        >
            {children}
        </CharacterContext.Provider>
    )
}

export function useCharacterContext(): CharacterContextData {
    const context = useContext(CharacterContext)
  
    if (!context) {
      throw new Error()
    }
    return context;
  }