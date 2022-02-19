<template>
    <div class="search-box d-flex form-inputs"> 
        <input class="form-control" type="text" 
            placeholder="Search any pokémon..." id="search"
            maxlength="30"
            autocomplete="off"
            v-model="search"
            @keyup="autocomplete()"
        > 
        <i>
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </i>
        <div class="
                autocomplete 
                p-3
                position-absolute 
                w-100"
            v-show="is_open"
            ref="autocomplete"
        >
            <ul class="autocomplete-list row row-cols-1 justify-content-center"
                v-if="suggestions.length > 0"
            >
                <li class="autocomplete-list-item m-3"
                    v-for="(value, index) in suggestions"
                    :key="index"
                    @click="set_name(value)"
                >
                    <p v-html="highlighter(value)"></p>
                </li>
            </ul>
            <ul class="autocomplete-list row row-cols-1 justify-content-center"
                v-else
            >
                <li class="autocomplete-list-item m-3">
                    <p>Not Found</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Autocomplete',
        props: {
            arr: {
                type: Array,
                required: false,
                default: () => [],
            },
            highlight: {
                type: Boolean,
                required: false,
                default: () => false,
            }
        },
        data() {
            return {
                search: '',
                is_open: false,
                suggestions: [],
            }
        },
        methods: {
            autocomplete() {
                if(!this.search) {
                    this.suggestions = [];
                    this.is_open = false;
                    return;
                }
                
                this.is_open = true;
                this.suggestions = this.arr.filter(item => {
                    const matches = item.toLowerCase().substr(0, this.search.length);

                    if(matches === this.search.toLowerCase()) {
                        return item;
                    }
                });
            },

            highlighter(string) {
                if(!this.highlight || !this.search) {
                    return string;
                }

                return string.replace(new RegExp(this.search, 'gi'), match => {
                    return `<span class="highlight" style="font-weight: bold;">${match}</span>`;
                });
            },

            set_name(value) {
                this.search = value;
                this.is_open = false;

                // Emit data to another components
                this.$bus.emit('set_name', value);
            },

            click_outside() {
                if(!this.$refs.autocomplete.contains(event.target)) {
                    this.is_open = false;
                }
            }
        },
        mounted() {
            document.addEventListener('click', this.click_outside);
        },
        destroyed() {
            document.removeEventListener('click', this.click_outside);
        },
    }
</script>

<style lang="scss" scoped>
    .search-box {
        &.form-inputs {
            position: relative;
            width: min(90%, 30rem);
            transition: all 0.5s cubic-bezier(.6,.11,.73,.78);

            input {
                font-size: 1.6rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                background-color: #EDF2FB;
            }

            .form-control {
                height: 4.5rem;

                &:focus {
                    box-shadow: none;
                    border: 1px solid #000
                }
            }

            i {
                position: absolute;
                top: 50%;
                right: 1rem;
                transform: translateY(-50%);
            }

            .autocomplete {
                top: 100%;
                background-color: #EDF2FB;
                z-index: 99;
                cursor: pointer;
                box-shadow: 0 2rem 5rem rgba(64, 116, 238, 0.1),
                            0.5rem 0.5rem 5rem rgba(64, 116, 238, 0.15),
                            -0.5rem -0.5rem 5rem rgba(64, 116, 238, 0.15),
                            inset 0.5rem 0.5rem 2rem rgba(64, 116, 238, 0.15),
                            inset -0.5rem -0.5rem 2rem rgba(64, 116, 238, 0.15),
                            inset 0 -0.5rem 2rem rgba(64, 116, 238, 0.2);
                border-bottom-left-radius: 0.6rem;
                border-bottom-right-radius: 0.6rem;
                border: 0.2rem solid rgba(64, 116, 238, 0.4);
                max-height: 50rem;
                overflow: auto;
                scroll-behavior: smooth;

                &::-webkit-scrollbar {
                    width: 0.7rem;
                    border-left: 0.1rem solid rgba(64, 116, 238, 0.1);
                }

                &::-webkit-scrollbar-track {
                    background-color: transparent;
                    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.5);
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #B6CCFE;
                    border-radius: 0.2rem;
                }

                &-list {
                    margin: 1rem 0;
                    padding: 1rem;
                    text-transform: lowercase;
    
                    &-item {
                        list-style: none;
                        height: 4rem;
                        background-color: transparent;
                        border-radius: 0.6rem;
                        box-shadow: 0.5rem 0.5rem 1.5rem rgba(64, 116, 238, 0.15),
                                    -0.5rem -0.5rem 1.5rem rgba(64, 116, 238, 0.15),
                                    inset 0.5rem 0.5rem 1.5rem rgba(64, 116, 238, 0.25),
                                    inset -0.5rem -0.5rem 1.5rem rgba(64, 116, 238, 0.25),
                                    0 0.3rem 1rem rgba(64, 116, 238, 0.25);
                        line-height: 4rem;
                        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);

                        &:hover {
                            background-color: #B6CCFE;
                        }

                        & > p::first-letter {
                            text-transform: uppercase;
                        }
                    }
                }
            }
        }
    }
</style>