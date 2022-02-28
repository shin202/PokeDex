<template>

    <div v-if="is_loading" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <pacman-loader :color="'#B6CCFE'" :size="'30px'"/>
    </div>

    <div v-else>
        <navbar />
        <div class="pokemon-detail container-fluid">

            <div class="pokemon-detail__heading">
                <h1>{{ pokemon_detail.name }}</h1>
            </div>

            <div class="pokemon-detail__info row row-cols-3">

                <div class="info">
                    <ul class="info-list">

                        <li class="info-list__item">
                            <span>ID</span>
                            <div class="id">
                                <span>{{ `#${pretty_id(pokemon_detail.id)}` }}</span>
                            </div>
                        </li>

                        <li class="info-list__item">
                            <span>Height</span>
                            <div class="height">
                                <span>{{ pokemon_detail.height / 10 + 'm' }}</span>
                            </div>
                        </li>

                        <li class="info-list__item">
                            <span>Weight</span>
                            <div class="weight">
                                <span>{{ pokemon_detail.weight / 10 + 'kg' }}</span>
                            </div>
                        </li>

                        <li class="info-list__item">
                            <span>Abilities</span>
                            <div class="abilities">
                                <span v-for="(value, index) in pokemon_detail.abilities"
                                    :key="index" :style="{ backgroundColor: primary_color }"
                                >
                                    {{ clean_string(value.ability.name) }}
                                </span>
                            </div>
                        </li>

                        <li class="info-list__item">
                            <span>Type</span>
                            <div class="type">
                                <div v-for="(value, index) in pokemon_detail.types"
                                    :key="index"
                                >
                                    {{ value.type.name }}
                                    <div class="type-icons" v-if="index === 0" 
                                        :style="{backgroundColor: primary_color, boxShadow: '0 0 1rem' + primary_color }"
                                    >
                                        <img :src="`${icon_url}${value.type.name}.svg`" :alt="value.type.name">
                                    </div>
                                    <div class="type-icons" v-else 
                                        :style="{backgroundColor: secondary_color, boxShadow: '0 0 1rem' + secondary_color }"
                                    >
                                        <img :src="`${icon_url}${value.type.name}.svg`" :alt="value.type.name">
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="info-list__item">
                            <span>Form</span>
                            <div class="form">
                                <span v-for="(value, index) in pokemon_detail.forms"
                                    :key="index"
                                >
                                    {{ clean_string(value.name) }}
                                </span>
                            </div>
                        </li>

                    </ul>
                </div>
                <div class="image">
                    <span v-for="i in 100" :key="i" :class="`image__grid-cell--${i}`"></span>
                    <img class="pokemon-image" 
                        :src="`${image_url}${pretty_id($route.params.id)}.png`" 
                        :alt="pokemon_detail.name"
                    >
                </div>

                <div class="stats">
                    <ul class="stats-list">
                        <span class="stats-list-title">Base Stats</span>

                        <li class="stats-list__item" v-for="(value, index) in pokemon_detail.stats"
                            :key="index"
                        >
                            <div>
                                <span>{{ clean_string(value.stat.name) }}</span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" 
                                        :style="{    
                                                    width: stats_percent[index] + '%', 
                                                    maxWidth: stats_percent[index] + '%' ,
                                                    backgroundColor: primary_color,
                                                }" 
                                        :aria-valuenow="value.base_stat" aria-valuemin="0" aria-valuemax="100"
                                    >
                                        <span>
                                            {{ value.base_stat }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

            <pokemon-evolution v-if="!is_loading" :image_url="image_url" :icon_url="icon_url" />
            <pokemon-training v-if="!is_loading" :types="pokemon_types" :training="training" :icon_url="icon_url" />
            <pokemon-moves v-if="!is_loading" :moves="pokemon_moves" :icon_url="icon_url"/>
        </div>
    </div>
</template>

<script>
    import Navbar from '../Navbar.vue'
    import $ from 'jquery'
    import PokemonEvolution from './PokemonEvolution.vue'
    import PokemonTraining from './PokemonTraining.vue'
    import { type_color } from './pokemon_details.js'
    import PokemonMoves from './pokemon_movepool/PokemonMoves.vue'
    export default {
        name: 'PokemonDetails',
        data() {
            return {
                pokemon_detail: {},
                stats_percent: [],
                pokemon_types: [],
                pokemon_moves: [],
                training: {},
                primary_color: '',
                secondary_color: '',

                pokemon_url: `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}/`,
                image_url: 'https://raw.githubusercontent.com/Shin241412/Pokemon-Dataset/main/assets/images/',
                icon_url: 'https://raw.githubusercontent.com/Shin241412/Pokemon-Dataset/main/assets/icons/',

                is_loading: true,
                mousemove_top: null,
                mousemove_left: null,
            }
        },
        components: {
            Navbar,
            PokemonEvolution,
            PokemonTraining,
            PokemonMoves,
        },
        methods: {
            // Fetch_data
            fetch_data(url) {
                this.axios.get(url)
                .then((response) => {
                    if(response.status === 200) {
                        this.pokemon_detail = response.data;
                        this.pokemon_moves = response.data.moves;
                    }
                })
                .finally(() => {
                    // Get Type of Pokémon
                    for(const each of this.pokemon_detail.types) {
                        this.pokemon_types.push(each.type.name);
                    }
                    this.training_details(this.pokemon_detail);
                    this.stats();
                    this.is_loading = false;
                })
                .then(() => {
                    // Change color
                    this.primary_color = this.types.main;
                    this.secondary_color = this.types.second;
                    $('.pokedex__navbar').css({'background-color': this.types.main});
                    $('.navbar').find('.btn-previous').css({'opacity': '1', 'visibility': 'visible'});
                    $('.search-box').css({'opacity': 0, 'visibility': 'hidden'});
                })
            },

            pretty_id(id) {
                id = String(id);

                id = id.padStart(3, 0);

                return id;
            },

            // Stats Progress Bar
            stats() {
                const pokemon_stats = [];
                for(const each of this.pokemon_detail.stats) {
                    pokemon_stats.push(each.base_stat);
                }

                // Find max stats
                const max = Math.max(...pokemon_stats);

                // Max Stats is 100%
                const percent_per_stat = 100 / max;
                
                for(const each of pokemon_stats) {
                    const percent = percent_per_stat * each;

                    this.stats_percent.push(percent);
                }
            },

            // Get Training Data
            training_details(data) {
                let ev_yield = '';

                const arr = data.stats;
                for(let i = 0; i < arr.length; i++) {
                    const ev = arr[i].effort;
                    const type = arr[i].stat.name;
                    if(ev !== 0) {
                        ev_yield += `${ev} ${type}, `;
                    }
                }

                const base_exp = data.base_experience;

                this.training = {
                        'ev_yield': ev_yield,
                        'base_exp': base_exp,
                };
            },

            clean_string(string) {
                const pattern = /(?:[-])/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            },
        },
        computed: {
            // Type Color
            types() {
                const types = type_color;
                const type = [];
                for(const each of this.pokemon_detail.types) {
                    type.push(each.type.name);
                }

                const main_type = type[0];
                const second_type = type[1];

                return {main: types[main_type], second: types[second_type]};
            }
        },
        mounted() {
            this.fetch_data(this.pokemon_url);
        },
        watch: {
            // If user click on the evolution form, redirect to this evolution form.
            '$route.params.id'(value) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.pokemon_url = `https://pokeapi.co/api/v2/pokemon/${value}`;
                this.training = {};
                this.pokemon_types = [];
                this.stats_percent = [];
                this.fetch_data(this.pokemon_url);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pokemon-detail {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 5rem;
        font-size: 1.6rem;

        &__heading {
            h1 {
                font-size: 5rem;
                text-transform: uppercase;
            }
        }

        &__info {
            width: clamp(36rem, 90%, 130rem);
            min-height: 50rem;
            padding: 1rem;
            margin: 1.5rem;
            justify-content: space-around;
            align-items: center;

            & > div {
                min-width: 30rem;
            }

            .info, .stats {
                perspective: 30rem;
                cursor: pointer;

                ul {
                    max-width: 100%;
                    transform: rotateY(25deg);
                    transition: all 0.5s ease;
                    background-color: transparent;
                    box-shadow: 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.25),
                                -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.15),
                                inset -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.25),
                                inset 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.1);
                    border-radius: 1rem;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 0;

                    li {
                        list-style: none;
                        padding: 1rem;
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                        gap: 2rem;

                        .type-icons {
                            position: relative;
                            width: 3rem;
                            height: 3rem;
                            border-radius: 50%;

                            img {
                                position: absolute;
                                width: 60%;
                                height: 60%;
                                object-fit: cover;
                                margin: 20%;
                            }
                        }

                        .form, .abilities {
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;

                            span {
                                background-color: transparent;
                                margin: 0.5rem;
                                padding: 0.5rem;
                                min-width: 15rem;
                                text-align: center;
                                display: inline-block;
                                box-shadow: 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.1),
                                            -0.1rem -0.1rem 0.5rem rgba(64, 116, 238, 0.1),
                                            0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.1),
                                            inset 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                                            inset -0.2rem -0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                                            inset 0 0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                                            inset 0.2rem 0 0.5rem rgba(64, 116, 238, 0.25);
                                border-radius: 0.6rem;
                            }
                        }

                        div {
                            display: flex;
                            align-items: center;
                            flex-direction: row;
                            flex-wrap: wrap;
                            gap: 2rem;
                            text-transform: capitalize;

                            .progress {
                                flex: 1;
                                height: 2rem;
                                border-radius: 0.5rem;

                                .progress-bar {
                                    font-size: 1.6rem;
                                    height: 100%;
                                    font-size: 1rem;
                                    animation: fill 2s ease 1;
                                }

                                @keyframes fill {
                                    0% {
                                        width: 0;
                                    }
                                    100% {
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .info:hover, .stats:hover {
                ul {
                    transform: rotateY(0);
                }
            }

            .image {
                position: relative;
                min-height: 43rem;
                transform-style: preserve-3d;
                perspective: 100rem;
                display: grid;
                grid-template-columns: repeat(10, minmax(0, 1fr));
                grid-template-rows: repeat(10, minmax(0, 1fr));
                cursor: pointer;

                & > span {
                    z-index: 1;
                }

                @for $i from 1 to 100 {
                    &__grid-cell--#{($i)}:hover ~ img {
                        transform: rotateX(25deg + ($i % 10 * -5)) rotateY(-25deg + ($i % 10 * 5));
                    }
                }

                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            }

            .stats {
                perspective: 25rem;

                &-list-title {
                    text-align: center;
                    padding: 1rem;
                }

                ul {
                    transform: rotateY(-25deg);

                    li {
                        display: block;
                    }
                }
            }
        }
}
</style>