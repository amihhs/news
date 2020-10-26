<template>
	<view>
		<list-scroll>
			<uni-load-more v-if='articleList.length === 0 ' status="loading" iconType="snow"></uni-load-more>
			<list-card v-for='(item, index) in articleList' :key='index' :item='item' types='follow'></list-card>
			<view class="no-content" v-if="noContent">
				没有更多内容...
			</view>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: [],
				noContent: true,
			};
		},
		created() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle() {
				this.$api.get_my_article().then(res => {
					const {
						data
					} = res
					this.articleList = data
					if (data.length === 0) {
						this.noContent = true
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-content {
		padding: 20px;
		font-size: 14px;
		color: #999999;
		text-align: center;

	}
</style>
