<template>
    <div>
        <navbar/>
        <div class="pokedex">
            <div class="container-fluid">
                <pokemon-list 
                    :image_url="image_url" 
                    :api_url="api_url"
                />
            </div>
            <button class="btn btn-back-to-top" @click="back_to_top()">
                <span>
                    <font-awesome-icon icon="fa-solid fa-angle-up" />
                </span>
            </button>
        </div>
    </div>
</template>

<script>
    import LoadingComponent from './async/LoadingComponent.vue'
    import ErrorComponent from './async/ErrorComponent.vue'
    import Navbar from './Navbar.vue'

    const PokemonList = () => ({
        component: import(/* webpackChunkName: "pokemon_list" */ "./pokemon_list/PokemonList.vue"),
        loading: LoadingComponent,
        delay: 500,
        error: ErrorComponent,
        timeout: 3000,
    });
    export default {
        name: 'Pokemon',
        components: {
            PokemonList,
            Navbar,
        },
        data() {
            return {
                image_url: 'https://raw.githubusercontent.com/Shin241412/Pokemon-Dataset/main/assets/images/',
                api_url: 'https://pokeapi.co/api/v2/pokemon/',
            }
        },
        methods: {
            // Back to top
            back_to_top() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .pokedex {
        font-size: 1.6rem;
        position: relative;

        .btn {
            position: fixed;
            bottom: 3rem;
            right: 3rem;
            min-width: 5rem;
            min-height: 5rem;
            background-color: #B6CCFE;
            border-radius: 50%;
            box-shadow: 0.5rem 0.5rem 0.8rem rgba(64, 116, 238, 0.12),
                        -0.5rem -0.5rem 0.8rem rgba(64, 116, 238, 0.12),
                        inset -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.25),
                        inset 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.1);
            z-index: 99;

            
            span {
                font-size: 2rem;
                text-align: center;
                line-height: 4rem;
                color: #0A3668;
            }
        }

        .btn:hover, .btn:active {
            background-color: #ABC4FF;
        }
    }
</style>