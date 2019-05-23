<template>
  <v-container>
	<v-flex xs12 text-xs-center>
		<v-carousel v-bind="{ 'cycle': true }" interval="3000">
			<v-carousel-item v-for="post in pets" :key="post._id" :src="post.image">
				<div id="carousel__title">
					<h1>{{ post.name }}</h1>
					<h2>{{ post.description }}</h2>					
				</div>
			</v-carousel-item>
		</v-carousel>
	</v-flex>
  </v-container>
</template>

<script>
  import {gql} from 'apollo-boost';

  export default{
	name: 'home',
	data(){
		return{
		}
	},
	methods: {
		handleGetCarouselPets(){
			// rech out to Vuex store, fire action that gets posts for carousel
			this.$store.dispatch('getPets');
		}
	},
	created(){
		this.handleGetCarouselPets();
	},
	computed: {
		pets(){
			return this.$store.getters.pets;
		}
	},
	// apollo: {
	//   	getPets: {
	//   		query: gql`
	// 			query {
	// 				getPets {
	// 					name
	// 					description
	// 					image
	// 					likes
	// 				}
	// 			}
	//   		`,
	//   		result(args){
	//   			console.dir(args)
	//   			this.posts = args.data.getPets;
	//   		},
	//   		error(err){
	//   			console.error('[ERROR!!]', err)
	//   			console.dir(err)
	//   		}
	//   		// result({ data, loading, networkStatus }){
	//   		// 	if(!loading){
	//   		// 		this.post = data.getPets;
	//   		// 		console.log('[networkStatus]', networkStatus)
	//   		// 	}
	//   		// }
	//   	}
 //    }
}
</script>

<style>
	#carousel__title{
		position: absolute;
		background: rgba(0,0,0,.5);
		color: white;
		border-radius: 5px 5px 0 0;
		padding: 0.5em;
		margin: 0 auto;
		bottom: 50px;
		left: 0;
		right: 0;
	}
</style>
