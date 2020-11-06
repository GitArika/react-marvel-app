import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CharactersList from '../pages/CharactersList';
import CharactersDetail from '../pages/CharactersDetail';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={CharactersList} />
    <Route path="/character/:id+" component={CharactersDetail} />
  </Switch>
);

export default Routes;
