<template>
	<swiper class="list-home" :current="activeIndex" @change='change'>
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="index" >
			<list-item class='list-scroll' :list='listCatchData[index]' @loadmore="loadmore" :load="load[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10,
			};
		},
		watch:{
			tab(newVal){
				if(newVal.lenght === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		components:{
			listItem
		},
		created(){
			uni.$on('updata_article', (res) => {
				if(res === 'follow'){
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
				
			})
		},
		methods:{
			loadmore(){ 
				if(this.load[this.activeIndex].loading === 'noMore') return
				++this.load[this.activeIndex].page
				this.getList(this.activeIndex)
			},
			change(e){
				const {current} = e.detail
				this.$emit("changeTab", current)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0){
					this.getList(current)
				}
			},
			getList(index){
				if(!this.load[index]){
					this.load[index] = {
						page: 1,
						loading: 'loading'
					}
				}
				if(this.tab.length === 0) return
				this.$api.get_list({
					name:this.tab[index].name,
					page:this.load[index].page,
					pageSize:this.pageSize
				}).then((res) => {
					const {data} = res
					if(data.length === 0){
						let oldload = {}
						oldload.loading = 'noMore'
						oldload.page = this.load[index].page
						this.$set(this.load, index, oldload)
						// 强制刷新
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[index] || []
					oldList.push(...data)
					this.$set(this.listCatchData, index, oldList)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		display: flex;
		height: 100%;
	}
	.list-home{
		height: 100%;
		// flex: 1;
		.swiper-item{
			height: 100%;
			.list-scroll{
				height: 100%;
			}
		}
	}
</style>
