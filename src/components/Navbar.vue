<template>
    <div class="pokedex__navbar">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-md">
                <div class="previous">
                    <router-link to="/" class="btn btn-previous">
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                    </router-link>
                </div>
                <auto-complete :arr="autocomplete_list" :highlight="true"/>
                <h1>Pokémon Pokédex</h1>
            </div>
        </nav>
    </div>
</template>

<script>
    import Autocomplete from './Autocomplete.vue'
    import { pokemon_name } from './pokemon_data/pokemon_details.js'
    export default {
        name: 'Navbar',
        data() {
            return {
                autocomplete_list: pokemon_name,
            }
        },
        components: {
            'auto-complete': Autocomplete,
        }
    }
</script>

<style lang="scss" scoped>
    .pokedex__navbar {
        background-color: #D7E3FC;
        min-height: 7rem;
        text-align: center;
        padding: 1rem;
        min-width: 20rem;
        max-width: 100%;
        box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.1),
                    -1rem -1rem 2rem rgba(0, 0, 0, 0.1);
        text-transform: capitalize;

        .container-md {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }


        .btn-previous {
            width: 4rem;
            height: 4rem;
            background-color: #B6CCFE;
            font-size: 2rem;
            border-radius: 50%;
            box-shadow: 0.5rem 0.5rem 0.8rem rgba(64, 116, 238, 0.12),
                        -0.5rem -0.5rem 0.8rem rgba(64, 116, 238, 0.12),
                        inset -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.25),
                        inset 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.1);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s cubic-bezier(.6,.11,.73,.78);
        }
        .btn:hover, .btn:active {
            background-color: #ABC4FF;
        }
    }
</style>