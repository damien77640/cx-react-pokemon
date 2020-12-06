import {Switch,Route,BrowserRouter} from "react-router-dom";
import Pokemon from "./Pokemon";
import PokemonAttaque from "./PokemonAttaque";

const App = () => {
    return(
        <BrowserRouter>
            <Switch>
            <Route exact path="/" render = {props => (<Pokemon {...props}/>)} />
          <Route exact path="/pokemons" render = {props => (<Pokemon {...props}/>)} />
              <Route exact path="/pokemons/:id" render = {props => (<PokemonAttaque {...props}/>)} />
        </Switch>
        </BrowserRouter>
    );
}

export default App