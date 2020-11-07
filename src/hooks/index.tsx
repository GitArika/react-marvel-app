import React from 'react'

import { CharacterProvider } from './characters'
import { CharacterDetailProvider } from './characterDetail';



const AppProvider: React.FC = ({ children }) => (
    <>
    <CharacterProvider>
        <CharacterDetailProvider>
            { children}
        </CharacterDetailProvider>
    </CharacterProvider>
    </>
)

export default AppProvider
