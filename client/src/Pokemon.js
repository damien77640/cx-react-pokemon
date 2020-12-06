import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4242/pokemons")
            .then(response => {
                setPokemons(response.data)
            })
    }, [])

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
      };

    useEffect(() => {
        const results = pokemons.filter(pokemon =>
            pokemon.nompokemon.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      }, [searchTerm]);

    return (
        <>
        <div className="row justify-content-center bg-dark" style={{minHeight: "100vh"}}>
        <div className="col-md-10">
        <div className="container-fluid pt-4">
            <div className="justify-content-center row mb-4">
            <img src={logo}/>
            </div>
            <div className="justify-content-center row mb-4">
            <input type="text" className="form-control" placeholder="Search Pokemon" value={searchTerm} onChange={handleChange}/>
            </div>
            {searchTerm !== '' ? 
            <div className="row justify-content-center">
            { searchResults.map((pokemon, i) =>
            (
                <Link className="col m-2 justify-content-center bg-secondary text-decoration-none" to={"/pokemons/"+pokemon.numero} >
             <img style={{top:"50%",left:"50%",transform:"translate(-50%, -50%)",position:"relative"}} className="mb-5 pb-5" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.numero}.png`} alt='image pokemon'></img>
             <div>
             <p className="text-white font-weight-bold m-0 h3" key={'num'+i}>#{pokemon.numero}
             </p>
             <img className="float-right" src={`http://www.pkparaiso.com/imagenes/pokedex/xy-icons/${pokemon.numero}.png`} />
             </div>
             <p className="text-white font-weight-bold h4" key={i}>{pokemon.nompokemon}</p>
                </Link>
             )
            )}
            </div>
            :
            <div className="row justify-content-center">
            { pokemons.map((pokemon, i) =>
            (
                <Link className="col m-2 justify-content-center bg-secondary text-decoration-none" to={"/pokemons/"+pokemon.numero} >
             <img style={{top:"50%",left:"50%",transform:"translate(-50%, -50%)",position:"relative"}}  className="mb-5 pb-5" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.numero}.png`} alt='image pokemon'></img>
             <div>
             <p className="text-white font-weight-bold m-0 h3" key={'num'+i}>#{pokemon.numero}
             </p>
             <img className="float-right" src={`http://www.pkparaiso.com/imagenes/pokedex/xy-icons/${pokemon.numero}.png`} />
             </div>
             <p className="text-white font-weight-bold h4" key={i}>{pokemon.nompokemon}</p>
                </Link>
             )
            )}
            </div>
             }
        </div>
        </div>
        </div>
        </>
    )
}

export default Pokemon