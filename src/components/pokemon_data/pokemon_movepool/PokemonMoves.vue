<template>
    <div class="movepool d-flex w-100 justify-content-center flex-column align-items-center">
        <pokemon-learn-method @set_method="get_method"/>
        <div class="pokemon-movepool">
            <h1>MovePool</h1>
            <ul class="pokemon-movepool__list row justify-content-center align-items-center flex-column" 
                v-if="movepool.length > 0"
            >
                <div class="pokemon-movepool__header w-100">
                    <ul class="pokemon-movepool__header-list row justify-content-between p-3 m-1">
                        <li class="pokemon-movepool__header-item">
                            <span v-if="method === 'level-up'">Level</span>
                            <span v-else-if="method === 'machine'">TM/HM</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Move</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Type</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Category</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Power</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>PP</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Accuracy</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Priority</span>
                        </li>
                        <li class="pokemon-movepool__header-item">
                            <span>Generation</span>
                        </li>
                    </ul>
                </div>
                <li class="pokemon-movepool__list-item w-100"
                    v-for="(move, index) in movepool"
                    :key="index"
                    @click="show_move_details(move)"
                >
                    <ul class="pokemon-movepool__details row justify-content-between align-items-center p-2 m-2">
                        <li class="pokemon-movepool__details-item">
                            <span class="move-learn-method"
                                v-if="method === 'level-up'"
                            >
                                {{ move.level_learned_at }}
                            </span>
                            <span class="move-learn-method text-uppercase"
                                v-else-if="method === 'machine'"
                            >
                                {{ move.machine }}
                            </span>
                            <span class="move-learn-method"
                                v-else
                            >
                                -
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-name">
                                {{ clean_string(move.name) }}
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-type" :style="{backgroundColor: type_color[move.type], boxShadow: `0 0 2rem ${type_color[move.type]}`}">
                                <img :src="`${icon_url}${move.type}.svg`" :alt="move.type">
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-category">
                                <img :src="`${damage_category_icon}${move.category}.png`" :alt="move.category">
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-power" v-if="move.power !== ''">
                                {{ move.power }}
                            </span>
                            <span class="move-power" v-else>
                                -
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-pp" v-if="move.pp !== ''">
                                {{ move.pp }}
                            </span>
                            <span class="move-pp" v-else>
                                -
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-accuracy" v-if="move.accuracy !== ''">
                                {{ move.accuracy }}
                            </span>
                            <span class="move-accuracy" v-else>
                                -
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-priority">
                                {{ move.priority }}
                            </span>
                        </li>
                        <li class="pokemon-movepool__details-item">
                            <span class="move-generation">
                                {{ move.generation }}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="pokemon-movepool__list row justify-content-center align-items-center flex-column" 
                v-else
            >
                <li class="pokemon-movepool__list-item p-2 m-2" style="cursor: auto; pointer-events: none;">
                    <span>
                        No moves learned by this method in the selected Games.
                    </span>
                </li>
            </ul>
        </div>
        <pokemon-version @set_version="get_version"/>

        <modal @modal_show="modal_show">
            <template #modal-header v-if="is_show">
                <div class="header w-100 d-flex justify-content-center align-items-center">
                    <h2>{{ clean_string(modal_content.name) }}</h2>
                </div>
            </template>
            <template #default v-if="is_show">
                <div class="row justify-content-center border-bottom mw-100 m-0">
                    <div class="m-2 pl-1 pr-1 text-white text-left rounded row row-cols-2 justify-content-around align-items-center text-center" 
                        :style="{backgroundColor: type_color[modal_content.type], boxShadow: `0 0 2rem ${type_color[modal_content.type]}`}"
                        style="width: 12rem; height: 3rem;"
                    >
                        <span>{{ modal_content.type }}</span>
                        <img :src="`${icon_url}${modal_content.type}.svg`" 
                            :alt="modal_content.type"
                            style="height: 70%; object-fit: contain;"
                        >
                    </div>
                    <div class="m-2 pl-1 pr-1 text-white text-left rounded row row-cols-2 justify-content-around align-items-center text-center bg-info" 
                        style="width: 12rem; height: 3rem; box-shadow: 0 0 2rem #17A2B8"
                    >
                        <span>{{ modal_content.category }}</span>
                        <img :src="`${damage_category_icon}${modal_content.category}.png`" 
                            :alt="modal_content.category"
                            style="height: 70%; object-fit: contain;"
                        >
                    </div>
                </div>
                <div class="row justify-content-around mw-100 m-2 p-2">
                    <div class="row flex-column m-2">
                        <span>Power</span>
                        <span class="text-black-50 font-weight-bold" v-if="modal_content.power !== ''">
                            {{ modal_content.power }}
                        </span>
                        <span class="text-black-50 font-weight-bold" v-else>
                            -
                        </span>
                    </div>
                    <div class="row flex-column m-2">
                        <span>PP</span>
                        <span class="text-black-50 font-weight-bold" v-if="modal_content.pp !== ''">
                            {{ modal_content.pp }}
                        </span>
                        <span class="text-black-50 font-weight-bold" v-else>
                            -
                        </span>
                    </div>
                    <div class="row flex-column m-2">
                        <span>Accuracy</span>
                        <span class="text-black-50 font-weight-bold" v-if="modal_content.accuracy !== ''">
                            {{ modal_content.accuracy }}
                        </span>
                        <span class="text-black-50 font-weight-bold" v-else>
                            -
                        </span>
                    </div>
                    <div class="row flex-column m-2">
                        <span>Priority</span>
                        <span class="text-black-50 font-weight-bold">{{ modal_content.priority }}</span>
                    </div>
                </div>
                <div class="mw-100 m-2 p-2">
                    <div class="m-2 row flex-column justify-content-center align-items-center">
                        <h2 class="bg-info text-white text-uppercase w-50 m-2 p-2 d-inline-block rounded">Description</h2>
                        <span style="max-width: 30rem;" class="d-inline-block text-black-50 font-weight-bold">
                            {{ unicode_decode(modal_content.flavor_text_entries["18"]) }}
                        </span>
                    </div>
                </div>
                <div class="row justify-content-center flex-column mw-100 m-2 p-2">
                        <div class="m-2 row flex-column justify-content-center align-items-center">
                            <h2 class="bg-info text-white text-uppercase w-50 m-2 p-2 d-inline-block rounded">Effect</h2>
                            <span style="max-width: 35rem;" class="d-inline-block text-black-50 font-weight-bold">
                                {{ unicode_decode(modal_content.effect_entries.short_effect) }}
                            </span>
                        </div>
                        <div class="m-2 row flex-column justify-content-center align-items-center">
                            <h2 class="bg-info text-white text-uppercase w-50 m-2 p-2 d-inline-block rounded">In-Depth Effect</h2>
                            <span style="max-width: 35rem;" class="d-inline-block text-black-50 font-weight-bold">
                                {{ unicode_decode(modal_content.effect_entries.effect) }}
                            </span>
                        </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
    import PokemonLearnMethod from './PokemonLearnMethod.vue';
    import PokemonVersion from './PokemonVersion.vue';
    import { type_color } from '../pokemon_details.js';
    import { machine_moves } from './machines.js'
    export default {
        name: 'PokemonMoves',
        components: {
            PokemonVersion,
            PokemonLearnMethod,
        },
        props: {
            moves: {
                type: Array,
                required: false,
                default: () => [],
            },
            icon_url: {
                type: String,
                required: false,
                default: () => '',
            },
        },
        data() {
            return {
                movepool: [],
                version: 'red-blue',
                method: 'level-up',
                move_data: [],
                move_effect: [],
                move_data_url: 'https://raw.githubusercontent.com/shin202/Pokemon-Dataset/main/dataset/moves.json',
                effect_data_url: 'https://raw.githubusercontent.com/shin202/Pokemon-Dataset/main/dataset/move_effect.json',
                damage_category_icon: 'https://raw.githubusercontent.com/shin202/Pokemon-Dataset/main/assets/damage-category/',
                modal_content: {},
                is_show: false,
            }
        },
        computed: {
            type_color() {
                return type_color;
            },
            machine_moves() {
                return machine_moves;
            }
        },
        methods: {
            fetch_move_data() {
                this.axios.get(this.move_data_url)
                .then(response => {
                    if(response.status === 200) {
                        this.move_data = response.data.move_data;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.fetch_effect_data();
                })
            },

            fetch_effect_data() {
                this.axios.get(this.effect_data_url)
                .then(response => {
                    if(response.status === 200) {
                        this.move_effect = response.data.move_effect;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.move_learn_method_filter(this.version, this.method);
                })
            },

            get_move_data(name) {
                const move_data = this.move_data.filter(value => {
                    if(value.name === name && typeof name === 'string') {
                        return value;
                    }
                    else {
                        return;
                    }
                });

                return move_data;
            },

            get_move_effect(id) {
                const move_effect = this.move_effect.filter(value => {
                    if(value.id === id && typeof id === 'number') {
                        return value;
                    }
                    else {
                        return;
                    }
                });

                return move_effect;
            },

            get_machine_move(name) {
                const machine_move = this.machine_moves.filter(value => {
                    if(value.name === name && typeof name === 'string') {
                        return value;
                    }
                    else {
                        return;
                    }
                });

                return machine_move;
            },

            get_version(version) {
                this.version = version;
            },

            get_method(method) {
                this.method = method;
            },

            move_details() {
                const move_details = [];

                this.moves.forEach(entries => {
                    const move_data = this.get_move_data(entries.move.name)[0];
                    const move_effect = move_data ? this.get_move_effect(move_data.id)[0] : null;
                    const machine = this.get_machine_move(entries.move.name)[0];
                    

                    entries.version_group_details.forEach(entry => {
                        move_details.push({
                            'id': move_data ? move_data.id : '',
                            'name': entries.move.name,
                            'version_name': entry.version_group.name,
                            'level_learned_at': entry.level_learned_at,
                            'move_learn_method': entry.move_learn_method.name,
                            'type': move_data ? move_data.type : '',
                            'category': move_data ? move_data.category : '',
                            'power': move_data ? move_data.power : '',
                            'pp': move_data ? move_data.pp : '',
                            'accuracy': move_data ? move_data.accuracy : '',
                            'priority': move_data ? move_data.priority : '',
                            'generation': move_data ? move_data.generation : '',
                            'effect_entries': move_effect ? move_effect.effect_entries : '',
                            'flavor_text_entries': move_effect ? move_effect.flavor_text_entries : '',
                            'machine': machine ? machine.machines : '-',
                        });
                    })
                });

                return move_details;
            },

            game_version_filter(version) {
                const arr = this.move_details();

                const game_version = arr.filter(value => {
                    if(value.version_name === version) {
                        return value;
                    }
                });

                return game_version;
            },

            move_learn_method_filter(version, method) {
                const arr = this.game_version_filter(version);

                this.movepool = arr.filter(value => {
                    if(value.move_learn_method === method) {
                        return value;
                    }
                });
            },

            show_move_details(move) {
                this.$bus.emit('modal_show');
                this.modal_content = move;
            },

            modal_show(value) {
                this.is_show = value;
            },

            clean_string(string) {
                const pattern = /(?:[-])/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            },

            unicode_decode(string) {
                const pattern = /(?:\\u[0-9a-f]{1,4})/gmi;

                if(pattern.test(string)) {
                    let unicode_char = string.match(pattern)[0];

                    switch (unicode_char) {
                        case '\\u00e9':
                            unicode_char = '\u00e9';
                            break;
                    
                        case '\\u2019':
                            unicode_char = '\u2019';
                            break;
                    
                        case '\\u2013':
                            unicode_char = '\u2013';
                            break;
                    
                        default:
                            break;
                    }

                    string = string.replace(pattern, unicode_char.normalize());
                }

                return string;
            }
        },
        mounted() {
            this.fetch_move_data();
        },

        watch: {
            version() {
                this.move_learn_method_filter(this.version, this.method);
            },

            method() {
                this.move_learn_method_filter(this.version, this.method);
            }
        },
    }
</script>

<style lang="scss" scoped>
    li {
        list-style: none;
    }

    h1 {
            text-transform: uppercase;
    }

    .pokemon-movepool {
        width: clamp(36rem, 90%, 120rem);
        margin: 2rem;
        padding: 1rem;
        background-color: transparent;
        box-shadow: 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.15),
                    -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                    inset -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                    inset 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.1);
        border-radius: 0.5rem;
        text-align: center;
        max-height: 60rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.5vw;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #B6CCFE;
            border-radius: 0.5rem;
        }

        &__header {
            background-color: #EDF2FB;
            box-shadow: 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.15),
                        -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                        inset -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                        inset 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.1);
            border-radius: 0.5rem;
            position: sticky;
            top: 0;
            color: #4A80FF;
            z-index: 99;
            overflow: hidden;
            

            &-item {
                min-width: 7rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }

        &__list {
            padding: 1rem;
            margin: 0;
            gap: 2rem;
            text-transform: capitalize;
            position: relative;
            
            &-item {
                background-color: transparent;
                box-shadow: 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.15),
                            -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                            inset -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                            inset 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.1);
                border-radius: 0.5rem;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                cursor: pointer;
                min-height: 3rem;

                &:hover {
                    background-color: #B6CCFE;
                    color: #4A80FF;
                }
            }
        }

        &__details {
            &-item {
                min-width: 7rem;

                .move-type, .move-category {
                    position: relative;
                    display: inline-block;
                    width: 4rem;
                    height: 4rem;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

                    img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 65%;
                        height: 65%;
                        object-fit: cover;
                        transform: translate(-50%, -50%);
                    }

                    &:hover {
                        transform: translateY(-1rem);
                    }
                }

                .move-category {
                    border-radius: 0;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }
    }
</style>