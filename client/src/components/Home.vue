<template>
  <v-container>

	<v-layout row>
		<v-dialog v-model="loading" persistent fullscreen>
			<v-container fill-height>
				<v-layout row justify-center align-center>
					<v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
				</v-layout>
			</v-container>
		</v-dialog>
	</v-layout>

	<v-flex xs12 text-xs-center>
		<v-carousel v-if="!loading && pets.length > 0" v-bind="{ 'cycle': true }" interval="3000">
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
  import { mapGetters } from 'vuex'

  export default{
	name: 'home',
	data(){
		return{
		}
	},
	created(){
		this.handleGetCarouselPets();
	},
	computed: {
		...mapGetters(['loading', 'pets'])
	},
	methods: {
		handleGetCarouselPets(){
			this.$store.dispatch('getPets');
		}
	}
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
