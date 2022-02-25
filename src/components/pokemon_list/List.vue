<template>
    <ul class="pokedex__list">
        <li class="pokedex__list-item" v-for="(value, index) in arr"
            :key="index"
        >
            <span class="pokemon-id">
                {{ `#${pretty_id(get_id(index, value))}` }}
            </span>
            <div class="pokemon-image__container">
                <div class="pokeball"></div>
                <router-link :to="`/pokemon-detail/${get_id(index, value)}`">
                    <img 
                        class="pokemon-image" 
                        :src="`${url}${pretty_id(get_id(index, value))}.png`" 
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

                id = id.padStart(3, 0);

                return id;
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
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: scale3d(0, 0, 0);

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
            transform: scale3d(1, 1, 1);
        }
    }
</style>