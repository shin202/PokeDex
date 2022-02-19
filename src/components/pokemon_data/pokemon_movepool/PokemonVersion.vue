<template>
    <div class="version-group">
        <h1>Game Version</h1>
        <ul class="version-group-list row row-cols-5 justify-content-between p-3">
            <li class="version-group-list-item" ref="version_item"
                v-for="(value, index) in game_version_group"
                :key="index"
                @click="set_version(index, value.name)"

            >
                <span>{{ clean_string(value.name ) }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'PokemonVersion',
        data() {
            return {
                api_url: 'https://pokeapi.co/api/v2/version-group/',
                game_version_group: [],
            }
        },
        methods: {
            fetch_data() {
                this.axios.get(this.api_url)
                .then(response => {
                    if(response.status === 200) {
                        this.game_version_group = response.data.results;
                    }
                })
                .finally(() => {
                    this.$refs.version_item[0].classList.add('active');
                })
            },

            clean_string(string) {
                const pattern = /(?:[-])/gm;

                if(pattern.test(string)) {
                    string = string.replace(pattern, ' ');
                }

                return string;
            },

            set_version(index, value) {
                const element = this.$refs.version_item;
                for(let i = 0; i < element.length; i++) {
                    element[i].classList.remove('active');
                    element[index].classList.add('active');
                }

                this.$emit('set_version', value);
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

    .version-group {
        width: clamp(36rem, 90%, 70rem);
        margin: 2rem;
        padding: 1rem;
        background-color: transparent;
        box-shadow: 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.15),
                    -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                    inset -0.3rem -0.3rem 1rem rgba(64, 116, 238, 0.15),
                    inset 0.3rem 0.3rem 1rem rgba(64, 116, 238, 0.1);
        border-radius: 0.5rem;
        text-align: center;


        &-list {
            margin: 0;
            text-transform: capitalize;
            position: relative;
            gap: 1rem;
            
            &-item {
                min-height: 5rem;
                padding: 0.5rem;
                margin: 1rem;
                cursor: pointer;
                background-color: transparent;
                border-radius: 3.6rem;
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
    }
</style>