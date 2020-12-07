const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const router = express.Router();
app.use(cors())
const {
    Pool
} = require('pg')
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const port = process.env.PORT || 4242

router.get("/", (req, res) => {
    res.send("Welcome to your api !");
})

router.get("/pokemons", (req, res) => {
    pool.query('SELECT nompokemon,numero FROM pokemon ORDER BY numero ASC')
        .then((response, error) => {
            const data = response.rows
            data.map((pokemon) => {
                if (pokemon.numero < 10) {
                    pokemon.numero = "00" + pokemon.numero
                } else if (pokemon.numero < 100) {
                    pokemon.numero = "0" + pokemon.numero
                }
            })
            res.send(data)
        })
})

router.get("/pokemons/:id", async (req, res) => {
    const query = "SELECT * FROM pokeattaque AS pa JOIN attaque AS aa ON pa.numeroattaque = aa.id JOIN pokemon AS po ON po.numero = pa.numeropokemon WHERE po.numero =" + req.params.id
    const result = await pool.query(query)
    const infoPokemon = result.rows
    infoPokemon.map((pokemon) => {
        if (pokemon.numeropokemon < 10) {
            pokemon.numeropokemon = "00" + pokemon.numeropokemon
        } else if (pokemon.numeropokemon < 100) {
            pokemon.numeropokemon = "0" + pokemon.numeropokemon
        }
    })
    res.send(infoPokemon)
})

router.post("/pokemons", async (req, res) => {
    const select = "SELECT MAX(numero) FROM pokemon"
    const result2 = await pool.query(select)
    const query = "INSERT INTO pokemon (nompokemon,numero) VALUES ('" + req.query.nom + "'," + (result2.rows[0].max + 1) + ")"
    const result = await pool.query(query)
    const query2 = "INSERT INTO pokeattaque (numeropokemon, niveau, numeroattaque) VALUES (" + (result2.rows[0].max + 1) + ",'Depart',1)"
    const result3 = await pool.query(query2)
    res.send("Pokémon ajouté !")
})

router.delete("/pokemons/:id", async (req, res) => {
    const select = "DELETE FROM pokemon WHERE numero=" + req.params.id
    const result = await pool.query(select)
    res.send("Pokémon supprimé !")
})

app.use(router)

app.listen(port, () => {
    console.log("Server is listening on port", port)
})
