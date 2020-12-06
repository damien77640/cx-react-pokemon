import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const PokemonAttaque = ({match}) => {
    const [pokemons, setPokemons] = useState([])
    const url = "http://localhost:4242/pokemons/"+match.params.id
    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setPokemons(response.data)
            })
    }, [])

    return (
        <div className="bg-dark text-white" style={{minHeight: "100vh"}}>
            <nav className="navbar navbar-dark bg-dark">
                <Link className="btn btn-danger navbar-brand" to={"/pokemons"}>
                <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </nav>
        <div className="justify-content-center row mb-4">
            <h1 className="my-auto mr-5">#{pokemons[0]?.numeropokemon} {pokemons[0]?.nompokemon}</h1>
            {pokemons[0]?.nomen ? 
            <img src={`https://www.pkparaiso.com//imagenes/pokedex/../xy/sprites/animados/${pokemons[0]?.nomen.toLowerCase()}.gif`}></img>
            : 
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemons[0]?.numeropokemon}.png`}></img>}
             </div>
             <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row justify-content-center">
                        <div className="col-8 border-bottom border-secondary mb-3">
                        <h2>Identité</h2>
                        </div>
                        <div className="col-2  border-bottom border-secondary mb-3">
                        <img src={`https://www.pkparaiso.com//imagenes/pokedex/bw-s/${pokemons[0]?.numeropokemon}.png`}></img>
                        </div>
                        <div className="col-5 bg-secondary py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Couleur</div>
                                <div className="col-6">{pokemons[0]?.couleur}</div>
                            </div>
                        </div>
                        <div className="col-5 bg-secondary py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Pokemon</div>
                                <div className="col-6">{pokemons[0]?.nompokemon}</div>
                            </div>
                        </div>
                        <div className="col-5 py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Espece</div>
                                <div className="col-6">{pokemons[0]?.espece}</div>
                            </div>
                        </div>
                        <div className="col-5 py-3 mx-4">
                            <div className="row">
                                <div className="col-6">NomEN</div>
                                <div className="col-6">{pokemons[0]?.nomen}</div>
                            </div>
                        </div>
                        <div className=" col-5 bg-secondary py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Type1</div>
                                <div className="col-6">{pokemons[0]?.type1}</div>
                            </div>
                        </div>
                        <div className="col-5 bg-secondary py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Forme</div>
                                <div className="col-6">{pokemons[0]?.forme}</div>
                            </div>
                        </div>
                        <div className="col-5 py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Taille</div>
                                <div className="col-6">{pokemons[0]?.taille}</div>
                            </div>
                        </div>
                        <div className="col-5 py-3 mx-4">
                            <div className="row">
                                <div className="col-6">Poids</div>
                                <div className="col-6">{pokemons[0]?.poids}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row justify-content-center">
                        <div className="col-10">
                        <h2 className="border-bottom border-secondary pb-3">Attaques</h2>
                        </div>
  { pokemons.map((pokemon, i) =>(
      <div className="col-2 bg-secondary m-3">
      <div className="p-2 border-bottom border-white" key={i+pokemon.niveau}>
          <div className="row">
              <div className="col-5">Niveau</div>
              <div className="col">{pokemon.niveau}</div>
          </div>
      </div>
      <div className="p-2 border-bottom border-white" key={i+pokemon.nom}>
          <div className="row">
              <div className="col-5">Nom</div>
              <div className="col">{pokemon.nom}</div>
          </div>
      </div>
      <div className="p-2 border-bottom border-white" key={i+pokemon.puissance}>
          <div className="row">
              <div className="col-5">Puissance</div>
              <div className="col">{pokemon.puissance}</div>
          </div>
      </div>
      <div className="p-2" key={i+pokemon.pp}>
          <div className="row">
              <div className="col-5">PP</div>
              <div className="col">{pokemon.pp}</div>
          </div>
      </div>
  </div>
    )
        )}
  </div>
  </div>
  </div>
        </div>
    )
}

export default PokemonAttaque