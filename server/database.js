const fs = require("fs")
const dotenv = require("dotenv").config({path:__dirname+'/../.env'})
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
});

knex.schema.createTable('attaque', (table) => {
        table.increments('id').primary();
        table.string('nom');
        table.string('puissance');
        table.string('precision');
        table.integer('pp');
    })
    .createTable('pokemon', (table) => {
        table.integer('numero').primary();
        table.string('nompokemon');
        table.float('poids');
        table.float('taille');
        table.string('type1');
        table.string('couleur');
        table.string('espece');
        table.float('forme');
        table.string("nomen");
    }).createTable('pokeattaque', (table) => {
        table.increments('id').primary();
        table.integer('numeropokemon')
            .references('numero').inTable('pokemon').notNull().onDelete('cascade')
        table.string('niveau');
        table.integer('numeroattaque')
            .references('id').inTable('attaque').notNull().onDelete('cascade')
    })
    .then(() => {
        try {
            const data = fs.readFileSync('./data/pokedex.json', 'utf8')
            let attaques = []
            let pokemons = []
            let pokemonattaque = []
            let counter = 1;
            const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
            for (const [_, value] of Object.entries(JSON.parse(data))) {
                pokemons.push({
                    "numero": value.numero,
                    "nompokemon": value.nom,
                    "poids": value.poids,
                    "taille": value.taille,
                    "type1": value.type1,
                    "couleur": value.couleur,
                    "forme": value.forme,
                    "espece": value.espece,
                    "nomen": value.nomen,
                })
                for (const [_, valueAttaque] of Object.entries(value.attaques)) {
                    let flag = true
                    let tmp = 0
                    let temp = valueAttaque
                    let lvl = valueAttaque.niveau
                    delete temp.niveau
                    attaques.push(temp)
                    attaques = uniqueArray(attaques)

                    for (let i = 1;
                        (i < (attaques.length + 1)) && flag; i++) {
                        if (attaques[i - 1].nom === valueAttaque.nom) {
                            tmp = i
                            flag = false
                        } else {
                            tmp = counter
                        }
                    }
                    pokemonattaque.push({
                        'niveau': lvl,
                        'numeropokemon': value.numero,
                        'numeroattaque': tmp
                    });
                    if (flag) {
                        counter++
                    }
                }
            }

            return knex("attaque")
                .insert(attaques).then(() => console.log("data attaques inserted"))
                .then(function () {
                    return knex('pokemon')
                        .insert(pokemons).then(() => console.log("data infos pokemon importantes inserted"))
                        .then(function () {
                            return knex('pokeattaque')
                                .insert(pokemonattaque).then(() => console.log("data attaques poke inserted"))
                        });
                });

        } catch (err) {
            console.error(err)
        }
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });
