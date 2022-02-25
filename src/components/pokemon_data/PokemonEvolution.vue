<template>
    <div class="pokemon-evolution">
        <div class="pokemon-evolution__heading">
                <h1>Evolution Chain</h1>
        </div>
        <div class="pokemon-evolution__chain">
            <div class="pokemon-evolution__chain-item" 
                v-for="(value, index) in evolution_chain" :key="index"
            >
                <div class="pokemon-evolution__chain-details" v-if="value">
                    <div class="id">
                        {{ `#${pretty_id(value.id)}` }}
                    </div>

                    <div class="image">
                        <router-link :to="`/pokemon-detail/${value.id}`">
                            <img :src="`${image_url}${pretty_id(value.id)}.png`" :alt="value.species_name">
                        </router-link>
                    </div>

                    <div class="species-name">
                            {{ value.species_name }}
                    </div>
                </div>
                <div class="pokemon-evolution__chain-condition">
                    <span v-if="condition.length === 1">
                        {{ condition[index].content }}
                    </span>
                    <span v-if="index > 0">
                        {{ condition[index].content }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PokemonEvolution',
        props: {
            image_url: {
                type: String,
                required: true,
            },
            icon_url: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                species_url: `https://pokeapi.co/api/v2/pokemon-species/${this.$route.params.id}/`,
                evolution_url: '',
                species_data: {},

                // Evolution Data
                evolution_data: {},
                evolution_chain: [],
                condition: [],
                training: {},

                is_loading: true,
            }
        },
        methods: {
            // Fetch Species Data
            fetch_data(url) {
                this.axios.get(url)
                .then((response) => {
                    if(response.status === 200) {
                        this.species_data = response.data;
                        this.evolution_url = this.species_data.evolution_chain.url;
                    }
                })
                .finally(() => {
                    this.training_details(this.species_data);
                    this.fetch_evolution();
                    this.is_loading = false;
                })
            },

            // Fetch Evolution Data
            fetch_evolution() {
                this.axios.get(this.evolution_url)
                .then((response) => {
                    if(response.status === 200) {
                        this.evolution_data = response.data.chain;

                        this.chain([this.evolution_data]);
                        this.evolution_condition();
                    }
                })
            },

            // Evolution Chain Details
            chain(arr) {
                const evolution_details = arr[0]['evolution_details'][0];
                const number_of_evolution = arr[0]['evolves_to'].length;
                let species_name = arr[0].species.name;

                // Chain Data
                this.evolution_chain.push({
                    'id': this.get_id(arr),
                    'species_name': species_name,
                    'gender': !evolution_details ? null : evolution_details.gender,
                    'held_item': !evolution_details ? null : evolution_details.held_item,
                    'known_move': !evolution_details ? null : evolution_details.known_move,
                    'known_move_type': !evolution_details ? null : evolution_details.known_move_type,
                    'location': !evolution_details ? null : evolution_details.location,
                    'min_affection': !evolution_details ? null : evolution_details.min_affection,
                    'min_beauty': !evolution_details ? null : evolution_details.min_beauty,
                    'min_happiness': !evolution_details ? null : evolution_details.min_happiness,
                    'needs_overworld_rain': !evolution_details ? null : evolution_details.needs_overworld_rain,
                    'party_species': !evolution_details ? null : evolution_details.party_species,
                    'party_type': !evolution_details ? null : evolution_details.party_type,
                    'relative_physical_stats': !evolution_details ? null : evolution_details.relative_physical_stats,
                    'time_of_day': !evolution_details ? null : evolution_details.time_of_day,
                    'trade_species': !evolution_details ? null : evolution_details.trade_species,
                    'turn_upside_down': !evolution_details ? null : evolution_details.turn_upside_down,
                    'min_level': !evolution_details ? 1 : evolution_details.min_level,
                    'trigger_name': !evolution_details ? null : evolution_details.trigger.name,
                    'item': !evolution_details ? null : evolution_details.item
                });

                // Loop Through Each Evolve
                if(number_of_evolution > 0) {
                    for(let i = 0; i < number_of_evolution; i++) {
                        const array = [arr[0]['evolves_to'][i]]
                        this.chain(array);
                    }
                }
            },

            // Get ID From species URL
            get_id(arr) {
                const reg_id = /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/([\d]*)\//;
                const url = arr[0].species.url;
                const matches = url.match(reg_id);

                return matches[1];
            },

            pretty_id(id) {
                id = id.toString();

                id = id.padStart(3, 0);

                return id;
            },

            // Condition
            evolution_condition() {
                const id = this.$route.params.id;
                const chain = this.evolution_chain;
                const condition = this.condition;
                let condition_details = '';
                let i = 0;

                if(chain.length > 1) {
                    for(const each of chain) {
                        i++;

                        // Evolution Details
                        const trigger_name = each.trigger_name;
                        const held_item = each.held_item;
                        const item = each.item;
                        const known_move = each.known_move;
                        const known_move_type = each.known_move_type;
                        const location = each.location;
                        const min_affection = each.min_affection;
                        const min_beauty = each.min_beauty;
                        const min_happiness = each.min_happiness;
                        const min_level = each.min_level;
                        const party_species = each.party_species;
                        const party_type = each.party_type;
                        const relative_physical_stats = each.relative_physical_stats;
                        const trade_species = each.trade_species;
                        const turn_upside_down = each.turn_upside_down;
                        const needs_overworld_rain = each.needs_overworld_rain;
                        const time_of_day = each.time_of_day;
                        const gender = each.gender;

        
                        switch (trigger_name) {
                            case null:
                                break;

                            case 'level-up':
                                condition_details = 'Level Up';
                                break;

                            case 'trade':
                                condition_details = 'Trade';
                                break
                            
                            case 'use-item':
                                condition_details = 'Use';
                                break;

                            case 'shed':
                                condition_details = 'With Empty PokéBall and an open slot in party';
                                break;

                            case 'spin':
                                condition_details = 'Spin';
                                break;

                            case 'tower-of-darkness':
                                condition_details = 'Train in the Tower of Darkness';
                                break;

                            case 'tower-of-waters':
                                condition_details = 'Train in the Tower of Waters';
                                break;

                            case 'three-critical-hits':
                                condition_details = 'Land three critical hits in a battle';
                                break;

                            case 'take-damage':
                                condition_details = 'Go somewhere after taking damage';
                                break;

                            case 'other':
                                // Milcery / Alcremie
                                if(id === '868' || id === '869') {
                                    condition_details = 'Spin around holding Sweet';
                                }
                                
                                // Farfetchd / Sirfetchd
                                if(id === '865' || id === '83') {
                                    condition_details = 'Achieve 3 critical hits in one battle';
                                }

                                // Yamask / Cofagrigus / Runerigus
                                if(id === '867' || id === '562' || id === '563') {
                                    condition_details = 'Near Dusty Bowl';
                                }

                                // Kubfu / Urshifu
                                if(id === '891' || id === '892') {
                                    condition_details = 'Train In Tower of Darkness'
                                }

                                break;
                        }

                        condition_details += min_level ? ` ${min_level} +` : '';
                        condition_details += item ? ` ${this.clean_string(item.name)}` : '';
                        condition_details += held_item ? ` With holding ${this.clean_string(held_item.name)}` : '';
                        condition_details += known_move ? ` Knowing ${this.clean_string(known_move.name)} Move` : '';
                        condition_details += known_move_type ? ` Knowing a ${this.clean_string(known_move_type.name)} Move` : '';
                        condition_details += location ? ` At ${this.clean_string(location.name)}` : '';
                        condition_details += min_affection ? ` With ${min_affection} + Affection` : '';
                        condition_details += min_beauty ? ` With ${min_beauty} + Beauty` : '';
                        condition_details += min_happiness ? ` With ${min_happiness} + Happiness` : '';
                        condition_details += party_species ? ` ${party_species}` : '';
                        condition_details += party_type ? ` ${party_type}` : '';
                        condition_details += trade_species ? ` ${trade_species}` : '';
                        condition_details += turn_upside_down ? ` ${turn_upside_down}` : '';
                        condition_details += needs_overworld_rain ? ' During Rain or Fog' : '';
                        condition_details += time_of_day ? ` During the ${time_of_day} time` : '';

                        // Wurmple / Silcoon / Beautiful / Cascoon / Dustox

                        if(id === '265' || id === '266' || id === '267' || id === '268' || id === '269') {
                            if(i === 2 || i === 4) {
                                condition_details += ' Base on Personality Value';
                            }
                        }

                        // Cosmog / Cosmoem / Solgaleo / Lunala
                        if(id === '789' || id === '790' || id === '791' || id === '792') {
                            if(i === 3) {
                                condition_details += ' In Pokemon Sun or Ultra Sun';
                            }
                            else if(i === 4) {
                                condition_details += ' In Pokemon Moon or Ultra Moon';
                            }
                        }

                        // Applin / Flapple / Appletun 
                        if(id === '840' || id === '841' || id === '842') {
                            if(i === 2) {
                                condition_details += ' Tart Apple';
                            }
                            else if(i === 3) {
                                condition_details += ' Sweet Apple';
                            }
                        }
                        
                        // Sinistea Phony / Polteageist Phony
                        if(id === '854' || id === '855') {
                            if(i === 2) {
                                condition_details += ' Cracked Pot';
                            }
                        }

                        // Clobbopus / Grapploct 
                        if(id === '852' || id === '853') {
                            if(i === 2) {
                                condition_details += ' After Learn Taunt';
                            }
                        }

                        // Meltan / Meltan
                        if(id === '808' || id === '809') {
                            if(i === 2) {
                                condition_details += ' Pokémon GO only, 400 Meltan Candies';
                            }
                        }

                        switch (relative_physical_stats) {
                            case null:
                                break;

                            case 1:
                                condition_details += " With Attack greater than Defense";
                                break;
                        
                            case -1:
                                condition_details += " With Attack lower than Defense";
                                break;

                            default:
                                condition_details += " With Attack Equal to Defense";
                                break;
                        }

                        switch (gender) {
                            case null:
                                break;
                        
                            case 1:
                                condition_details += " Female Only";
                                break;

                            default:
                                condition_details += " Male Only";
                                break;
                        }


                        condition.push({
                            'content': condition_details,
                        });
                    }
                }
                else if(chain.length === 1) {
                    condition_details = "This Pokémon Doesn't Evolve";
                    condition.push({
                        'content': condition_details,
                    });
                }
            },

            training_details(data) {
                const base_friendship = data.base_happiness;
                const catch_rate = data.capture_rate;
                const growth_rate = data.growth_rate.name;
                const egg_cycles = data.hatch_counter;
                let egg_groups = '';

                for(const each of data.egg_groups) {
                    egg_groups += `${each.name}, `;
                }

                this.training = {
                    'base_friendship': base_friendship,
                    'catch_rate': catch_rate,
                    'growth_rate': growth_rate,
                    'egg_groups': egg_groups,
                    'egg_cycles': egg_cycles,
                };

                this.$bus.emit('training_details', this.training);
            },
            
            clean_string(string) {
                const pattern = /(?:[-])/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            }
        },
        created() {
            this.fetch_data(this.species_url);
        },
        watch: {
            '$route.params.id'(value) {
                this.training = {};
                this.condition = [];
                this.evolution_chain = [];
                this.species_url = `https://pokeapi.co/api/v2/pokemon-species/${value}/`;
                this.fetch_data(this.species_url);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pokemon-evolution {
        width: 100%;


        h1 {
            font-size: 3rem;
            text-transform: uppercase;
            text-align: center;
        }

        &__chain {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
            place-items: center;
            grid-gap: 2rem;
            padding: 2rem;


            &-item {
                padding: 1rem;
            }

            &-details {
                text-transform: capitalize;
                text-align: center;

                .image {
                    position: relative;
                    width: 20rem;
                    height: 20rem;
                    margin: 0 auto;

                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }

            &-condition {
                margin-top: 2rem;
                max-width: 30rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-align: center;
                text-transform: capitalize;
            }
        }
    }
</style>