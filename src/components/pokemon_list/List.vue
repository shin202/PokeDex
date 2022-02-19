<template>
    <ul class="pokedex__list">
        <li class="pokedex__list-item" v-for="(value, index) in arr"
            :key="index"
        >
            <span class="pokemon-id">
                {{ pretty_id(get_id(index, value)) }}
            </span>
            <div class="pokemon-image__container">
                <div class="pokeball"></div>
                <router-link :to="`/pokemon-detail/${get_id(index, value)}`">

                    <!-- Fix URL -->
                    <img 
                        v-if="value.name === 'arceus' || value.name === 'silvally'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-normal.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'burmy' || value.name === 'mothim'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-plant.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'cherrim'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-overcast.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'deerling' || value.name === 'sawsbuck'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-spring.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'scatterbug' || value.name === 'spewpa'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-icy-snow.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'vivillon'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-meadow.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'flabebe' || value.name === 'floette' || value.name === 'florges'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-red.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'furfrou'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-natural.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'gastrodon' || value.name === 'shellos'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-west.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'morpeko'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-full-belly.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'polteageist' || value.name === 'sinistea'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-phony.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'unown'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-a.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else-if="value.name === 'xerneas'"
                        class="pokemon-image" 
                        :src="`${url}${value.name}-active.png`" 
                        :alt="value.name"
                    >
                    <img 
                        v-else
                        class="pokemon-image" 
                        :src="`${url}${value.name}.png`" 
                        :alt="value.name"
                    >
                </router-link>
            </div>
            <span class="pokemon-name">
                {{ value.name }}
            </span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'List',
        props: {
            arr: {
                type: Array,
                required: false,
                default: () => [],
            },
            url: {
                type: String,
                required: false,
                default: () => '',
            },
            is_search: {
                type: Boolean,
                required: false,
                default: () => false,
            }

        },
        data() {
            return {
                
            }
        },
        methods: {
            pretty_id(id) {
                id = id.toString();

                id = id.padStart(3, '0');

                id = '#' + id;

                return id
            },

            // When user search for any pokemon, id will change, 
            // if we show id by index in array it will be wrong,
            // so we will change id of pokemon if user searched it.
            get_id(index, value) {
                if(!this.is_search) {
                    return index + 1;
                }
                else return value.id;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pokedex__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
        grid-gap: 3rem;
        width: 100%;
        padding: 3rem;
        margin-bottom: 0;

        &-item {
            list-style: none;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            gap: 1rem;
            background-color: #B6CCFE;
            height: 25rem;
            text-align: center;
            border-radius: 1.2rem;
            cursor: pointer;
            box-shadow: 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.25),
                        -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.15),
                        inset -0.5rem -0.5rem 1rem rgba(64, 116, 238, 0.25),
                        inset 0.5rem 0.5rem 1rem rgba(64, 116, 238, 0.1);
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s cubic-bezier(.6,.11,.73,.78);
            transform: scale(0);

            // PokéBall
            .pokemon-image__container {
                width: 10rem;
                height: 10rem;
                background-color: #EDF2FB;
                border-radius: 50%;
                border: 0.1rem solid #000000;
                overflow: hidden;
                position: relative;
                box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.12),
                            -0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.12),
                            inset 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.15),
                            inset -0.3rem -0.3rem 1rem rgba(0, 0, 0, 0.15),
                            inset 0.5rem -0.5rem 1rem rgba(0, 0, 0, 0.2);

                &::before,
                &::after {
                    content: '';
                    position: absolute;
                }

                &::before {
                    background: linear-gradient(to top, transparent 50%, red 50%);
                    top: -20%;
                    left: -20%;
                    width: 120%;
                    height: 120%;
                    border-radius: 50%;
                    transform: translate(10%, 10%);
                }

                &::after {
                    top: 50%;
                    left: 0;
                    width: 120%;
                    height: 1rem;
                    background-color: #000000;
                    transform: translateX(-6%);
                }

                img.pokemon-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 10;
                    filter: saturate(150%);
                }

                div.pokeball {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 3rem;
                    height: 3rem;
                    background-color: #B6CCFE;
                    transform: translate(-50%, -35%);
                    border-radius: 50%;
                    border: 0.2rem solid #000000;
                    z-index: 5;
                    box-shadow: inset 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.1),
                                inset -0.1rem -0.1rem 0.3rem rgba(0, 0, 0, 0.1),
                                0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.1);

                    &::before {
                        position: absolute;
                        content: '';
                        top: 50%;
                        left: 50%;
                        width: 60%;
                        height: 60%;
                        background-color: #EDF2FB;
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                        z-index: 6;
                        box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.12),
                                    -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.12);
                    }
                }
            }

            span {
                text-transform: capitalize;
                background-color: #EDF2FB;
                width: 100%;
                height: 3rem;
                box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.12),
                            inset 0rem -0.2rem 0.4rem rgba(0, 0, 0, 0.12);
                border-top: 0.2rem solid rgba(64, 116, 238, 0.15);
                border-bottom: 0.2rem solid rgba(64, 116, 238, 0.15);
            }
        }

        &-item.show {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }
    }
</style>