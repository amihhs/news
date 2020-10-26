<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<view>
			<list-card :item='item' v-for='(item, index) in list' :key='item._id'></list-card>
		</view>
		<uni-load-more v-if='list.length === 0 || list.length > 7' iconType="snow" :status="load.loading || 'loading'" ></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list:{
				type:Array,
				default (){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading: 'loading'
					}
				}
			}
			
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			},
		}
	}
</script>

<style scoped>
	.list-scroll {
		height: 100%;
	}
</style>
