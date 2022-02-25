<template>
    <div class="pokemon-training row row-cols-3">
        <div class="pokemon-training__training">
            <h1>Training</h1>
            <ul class="pokemon-training__training-list">
                <li class="pokemon-training__training-list__item"
                    v-for="(value, key) in training_data"
                    :key="key"
                >
                    <label class="training-details-label">{{ clean_string(key) }}</label>
                    <span class="training-details-value">{{ value }}</span>
                </li>
            </ul>
        </div>
        <div class="pokemon-training__breeding">
            <h1>Breeding</h1>
            <ul class="pokemon-training__breeding-list">
                <li class="pokemon-training__breeding-list__item"
                    v-for="(value, key) in breeding_data"
                    :key="key"
                >
                    <label class="breeding-details-label">{{ clean_string(key) }}</label>
                    <span class="breeding-details-value" v-if="value">{{ value }}</span>
                    <span class="breeding-details-value" v-else>None</span>
                </li>
            </ul>
        </div>
        <div class="pokemon-training__type-defenses">
            <h1>Type Defenses</h1>
            <ul class="pokemon-training__type-defenses-list">
                <li class="pokemon-training__type-defenses-list__item"
                    v-for="(value, key) in type_defenses_data"
                    :key="key"
                >
                    <label class="type-defense-label" v-if="value">{{ clean_string(key) }}</label>
                    <div class="type-defense-types">
                        <span v-for="(type, index) in value" :key="index"
                            :style="{backgroundColor: type_color[type], boxShadow: '0 0 1rem' + type_color[type] }"
                        >
                            <img :src="`${icon_url}${type}.svg`" :alt="type">
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { type_charts, type_color } from './pokemon_details.js'
    export default {
        name: 'PokemonTraining',
        props: {
            types: {
                type: Array,
                required: true,
            },
            training: {
                type: Object,
                required: true,
            },
            icon_url: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                training_data: {},
                breeding_data: {},
                type_defenses_data: {},
            }
        },
        computed: {    
            // Pokémon Type Charts
            type_charts() {
                return type_charts;
            },    

            // Color
            type_color() {
                return type_color;
            }
        },
        methods: {
            type_coverage(types) {
                let primary_weeknesses = null;
                let weeknesses_details = null;
                let secondary_weeknesses = null;
                const weeknesses_arr = [];

                const primary_type = types[0] ? types[0] : '';

                const secondary_type = types[1] ? types[1] : null;

                primary_weeknesses = this.type_charts[primary_type];
                const keys = Object.keys(primary_weeknesses);

                if(secondary_type === null) {
                    return primary_weeknesses;
                }
                else {
                    secondary_weeknesses = this.type_charts[secondary_type];

                    for(const each of keys) {
                        const value_1 = primary_weeknesses[each]
                        const value_2 =  secondary_weeknesses[each];

                        weeknesses_details = value_1 * value_2;

                        weeknesses_arr.push(
                            [each, weeknesses_details]
                        );
                    }

                    return Object.fromEntries(weeknesses_arr);
                }
            },

            // Get Data from 'training_details' event
            get_data() {
                return new Promise((resolve, reject) => {
                    this.$bus.on('training_details', value => {
                        if(value) {
                            setTimeout(() => resolve({...this.training, ...value}), 1000);
                        }
                        else {
                            reject(undefined);
                        }
                    });
                })
            },

            training_details(data) {
                // Catch Rate = ((Capture Rate / 3) / 256) * 100
                let catch_rate = ((data.catch_rate / 3) / 256) * 100;
                catch_rate = catch_rate.toFixed(1) + '%';

                // Steps 
                let min_steps = ((data.egg_cycles - 1) * 257) + 1;
                let max_steps = data.egg_cycles * 257;


                this.training_data = {
                    'ev_yield': this.clean_string(data.ev_yield),
                    'catch_rate': `${data.catch_rate} (${catch_rate} with PokéBall, full HP)`,
                    'base_friendship': data.base_friendship,
                    'base_exp': data.base_exp,
                    'growth_rate': this.clean_string(data.growth_rate),
                };

                this.breeding_data = {
                    'egg_groups': data.egg_groups ? this.clean_string(data.egg_groups) : null,
                    'egg_cycles': `${data.egg_cycles} (${min_steps} ~ ${max_steps} steps)`,
                }
            },

            // Damage Caculator
            type_defenses(types) {
                const data =  this.type_coverage(types);

                const keys = Object.keys(data);

                const takes_0x = [];
                const takes_025x = [];
                const takes_05x = [];
                const takes_1x = [];
                const takes_2x = [];
                const takes_4x = [];


                for(const each of keys) {
                    const value = data[each];

                    switch (value) {
                        case 0:
                            takes_0x.push(each);
                            break;

                        case 0.25:
                            takes_025x.push(each);
                            break;

                        case 0.5:
                            takes_05x.push(each);
                            break;

                        case 1:
                            takes_1x.push(each);
                            break;
                        case 2:
                            takes_2x.push(each);
                            break;

                        case 4:
                            takes_4x.push(each);
                            break;
                    
                        default:
                            break;
                    }

                }

                this.type_defenses_data = {
                    'takes_0x_from': takes_0x.length > 0 ? takes_0x : null,
                    'takes_0.25x_from': takes_025x.length > 0 ? takes_025x : null,
                    'takes_0.5x_from': takes_05x.length > 0 ? takes_05x : null,
                    'takes_1x_from': takes_1x.length > 0 ? takes_1x : null,
                    'takes_2x_from': takes_2x.length > 0 ? takes_2x : null,
                    'takes_4x_from': takes_4x.length > 0 ? takes_4x : null,
                };
            },

            clean_string(string) {
                const pattern = /(?:[-]|[_]|[,\s]*$)/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            },
        },
        async mounted() {
            const response = await this.get_data();

            this.training_details(response);
            this.type_defenses(this.types);
        },
        watch: {
            async '$route.params.id'() {
                const response = await this.get_data();

                this.training_details(response);
                this.type_defenses(this.types);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pokemon-training {
        width: clamp(36rem, 100%, 130rem);
        min-height: 25rem;
        margin: 1.5rem;
        padding: 1rem;
        justify-content: space-around;
        align-items: center;

        & > div {
            min-width: 45rem;
            min-height: 20rem;
            padding: 1rem;
            margin: 2rem;
            text-align: center;
            background-color: transparent;
            box-shadow: 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.15),
                        -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                        inset -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                        inset 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.1);
            border-radius: 0.5rem;

            ul {
                padding: 0;
                margin: 0;
                text-transform: capitalize;

                li {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    flex-flow: column wrap;
                    margin: 1rem 0;

                    & > label {
                        min-height: 3rem;
                        box-shadow: 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                                    -0.2rem -0.2rem 0.5rem rgba(64, 116, 238, 0.15),
                                    inset -0.2rem -0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                                    inset 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.1),
                                    0.2rem 0 0.5rem rgba(64, 116, 238, 0.15),
                                    0 0.2rem 0.5rem rgba(64, 116, 238, 0.15);
                        border-radius: 0.6rem;
                        color: #4a80ff;
                    }
                }
            }
        }

        .type-defense-types {
            span {
                min-width: 5rem;
                min-height: 5rem;
                position: relative;
                display: inline-block;
                margin: 1rem;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.5s ease;

                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 3rem;
                    height: 3rem;
                    object-fit: cover;
                    transform: translate(-50%, -50%);
                }
            }

            span:hover {
                transform: translateY(-1rem);
            }
        }
    }
</style>