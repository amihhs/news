<template>
	<view class="icon" @click.stop="likeTap">
		<uni-icons :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created(){
			this.like = this.item.is_like
		},
		methods:{
			likeTap(){
				this.like = !this.like
				this.setupdataLikes()
			},
			setupdataLikes(){
				uni.showLoading()
				this.$api.updata_likes({
					article_id: this.item._id,
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					uni.$emit('updata_article',this.types)
				})
			}
		}
	}
</script>

<style lang="scss">
.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
