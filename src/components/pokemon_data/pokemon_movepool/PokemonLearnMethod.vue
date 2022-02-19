<template>
    <div class="pokemon-movepool__learn-method w-100 text-center">
        <h1>Learn Method</h1>
        <ul class="pokemon-movepool__learn-method-list row justify-content-around p-2 m-3 text-capitalize">
            <li class="pokemon-movepool__learn-method-item" 
                v-for="(value, index) in learn_method"
                :key="index"
                ref="learn_method"
                @click="set_method(index, value.name)"
            >   
                <span v-if="value.name === 'machine'">
                    TM/HM
                </span>
                <span v-else>
                    {{ clean_string(value.name) }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'PokemonLearnMethod',
        data() {
            return {
                api_url: 'https://pokeapi.co/api/v2/move-learn-method/',
                learn_method: [],
            }
        },
        methods: {
            fetch_data() {
                this.axios.get(this.api_url)
                .then(response => {
                    if(response.status === 200) {
                        this.learn_method = response.data.results;
                    }
                })
                .finally(() => {
                    this.learn_method = this.learn_method.slice(0, 4);
                    this.$refs.learn_method[0].classList.add('active');
                })
            },

            clean_string(string) {
                const pattern = /(?:[-])/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            },

            set_method(index, value) {
                const element = this.$refs.learn_method;

                for(let i = 0; i < element.length; i++) {
                    element[i].classList.remove('active');
                    element[index].classList.add('active');
                }

                this.$emit('set_method', value);
            }
        },
        mounted() {
            this.fetch_data();
        },
    }
</script>

<style lang="scss" scoped>
    li {
        list-style: none;
    }
    .pokemon-movepool__learn-method {
        &-item {
            font-size: 2rem;
            min-width: 8rem;
            padding: 0.5rem;
            margin: 1rem;
            cursor: pointer;
            background-color: transparent;
            border-radius: 0.5rem;
            box-shadow: 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                        -0.2rem -0.2rem 0.5rem rgba(64, 116, 238, 0.15),
                        inset -0.2rem -0.2rem 0.5rem rgba(64, 116, 238, 0.25),
                        inset 0.2rem 0.2rem 0.5rem rgba(64, 116, 238, 0.1),
                        0.2rem 0 0.5rem rgba(64, 116, 238, 0.15),
                        0 0.2rem 0.5rem rgba(64, 116, 238, 0.15);

            color: #4A80FF;
            transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);


            &:hover {
                transform: translateY(-1rem);
                background-color: #B6CCFE;
            }

            &.active {
                background-color: #B6CCFE;
                pointer-events: none;
            }
        }
    }
</style>