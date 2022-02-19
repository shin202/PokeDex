<template>
    <div class="list" v-if="!is_loading && !is_search">
        <list :arr="pokemons" :url="image_url" :is_search="is_search" />
    </div>

    <div class="list" v-else-if="!is_loading && is_search">
        <list :arr="search" :url="image_url" :is_search="is_search" />
    </div>
</template>

<script>
    import $ from 'jquery'
    import List from './List.vue'
    export default {
        name: 'PokemonList',
        props: [
            'image_url',
            'api_url',
        ],
        components: {
            List,
        },
        data() {
            return {
                pokemons: [],
                next_url: '',
                is_loading: true,
                is_search: false,
                search: [],
            }
        },
        methods: {
            // Fetch Data from API
            fetch_data(url) {
                this.axios.get(url)
                .then((response) => {
                    if(response.status === 200) {
                        this.next_url = response.data.next;
                        response.data.results.forEach((pokemon) => {
                            this.pokemons.push(pokemon);
                        });
                    }
                })
                .finally(() => {
                    this.is_loading = false;
                })
                .then(() =>  this.infinite_scroll())
            },

            // Next URL
            next() {
                this.fetch_data(this.next_url);
            },

            // Infinite scroll eff
            infinite_scroll() {
                const pokemon = $('.pokedex__list-item');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        entry.target.classList.toggle('show', entry.isIntersecting);
                    });
                }, {
                    threshold: 0.5,
                });

                const last_child_observer = new IntersectionObserver((entries) => {
                    const last_child = entries[0];

                    if(!last_child.isIntersecting) {
                        return;
                    }
                    
                    if(!this.next_url) {
                        return;
                    }

                    // Fetch more data when user scroll
                    this.next();

                    last_child_observer.unobserve(last_child.target);
                }, {
                    rootMargin: '100px',
                });

                if(!this.is_loading && !this.is_search) {
                    last_child_observer.observe(document.querySelector(".pokedex__list-item:last-child"));
                }

                for(const each of pokemon) {
                    observer.observe(each);
                }
            },

            search_pokemon() {
                // Get Pokemon name from 'set_name' event
                this.$bus.on('set_name', value => {
                    this.search = [];
                    this.is_search = true;
                    this.is_loading = true;

                    // Change Name
                    switch (value.toLowerCase()) {
                        case 'zamazenta':
                        case 'zacian':
                            value = value.toLowerCase() + '-hero';
                            break;

                        case 'tapu koko':
                        case 'tapu lele':
                        case 'tapu bulu':
                        case 'tapu fini':
                            value = value.toLowerCase().replace(' ', '-');
                            break;

                        case 'giratina':
                            value = value.toLowerCase() + '-altered';
                            break;
                        
                        case 'tornadus':
                        case 'landorus':
                        case 'thundurus':
                            value = value.toLowerCase() + '-incarnate';
                            break;

                        case 'aegislash':
                            value = value.toLowerCase() + '-shield';
                            break;

                        case 'basculin':
                            value = value.toLowerCase() + '-red-striped';
                            break;
                        
                        case 'darmanitan':
                            value = value.toLowerCase() + '-standard';
                            break;

                        case 'deoxys':
                            value = value.toLowerCase() + '-normal';
                            break;
                        
                        case 'eiscue':
                            value = value.toLowerCase() + '-ice';
                            break;

                        case 'gourgeist':
                        case 'pumpkaboo':
                            value = value.toLowerCase() + '-average';
                            break;

                        case 'indeedee':
                        case 'meowstic':
                            value = value.toLowerCase() + '-male';
                            break;

                        case 'keldeo':
                            value = value.toLowerCase() + '-ordinary';
                            break;

                        case 'lycanroc':
                            value = value.toLowerCase() + '-midday';
                            break;

                        case 'meloetta':
                            value = value.toLowerCase() + '-aria';
                            break;

                        case 'mimikyu':
                            value = value.toLowerCase() + '-disguised';
                            break;

                        case 'minior':
                            value = value.toLowerCase() + '-red-meteor';
                            break;

                        case 'oricorio':
                            value = value.toLowerCase() + '-baile';
                            break;

                        case 'shaymin':
                            value = value.toLowerCase() + '-land';
                            break;

                        case 'toxtricity':
                            value = value.toLowerCase() + '-amped';
                            break;

                        case 'urshifu':
                            value = value.toLowerCase() + '-single-strike';
                            break;

                        case 'wishiwashi':
                            value = value.toLowerCase() + '-solo';
                            break;

                        case 'wormadam':
                            value = value.toLowerCase() + '-plant';
                            break;

                        default:
                            break;
                    }

                    const url = `${this.api_url}${value.toLowerCase()}`;

                    this.fetch_by_name(url);
                })
            },

            fetch_by_name(url) {
                this.axios.get(url)
                .then(response => {
                    if(response.status === 200) {
                        this.search.push(response.data);
                    }
                })
                .finally(() => {
                    this.is_loading = false;
                })
                .then(() => this.infinite_scroll());
            }
        },
        mounted() {
            this.fetch_data(this.api_url);
            this.search_pokemon();
        },
    }
</script>

<style lang="scss" scoped>
    .list {
        margin-top: 5rem;
    }
</style>