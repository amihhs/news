<template>
	<view class="follow">
		<view class="follow-header">
			<view class="follow-header-box">
				<view class="follow-header-item" :class="{active:activeIdx === 0}" @click="tab(0)">文章</view>
				<view class="follow-header-item" :class="{active:activeIdx === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-content">
			<swiper class="follow-content-swiper" :current="activeIdx" @change="change">
				<swiper-item class="follow-content-swiper-item">
					<list-scroll>
						<uni-load-more v-if='list.length === 0 && !noContent' status="loading" iconType="snow"></uni-load-more>
						<list-card v-for='(item, index) in list' :key='index' :item='item' types='follow'></list-card>
						<view class="no-content" v-if="noContent">
							没有更多内容...
						</view>
					</list-scroll>

				</swiper-item>
				<swiper-item class="follow-content-swiper-item">
					<list-scroll>
						<uni-load-more v-if='authorList.length === 0 && !noAuthor' status="loading" iconType="snow"></uni-load-more>
						<list-author v-for='i in authorList' :key='i.id' :item='i'></list-author>
						<view class="no-content" v-if="noAuthor">
							没有更多内容...
						</view>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIdx: 0,
				list: [],
				authorList: [],
				noContent: false,
				noAuthor: false
			};
		},
		onLoad() {
			uni.$on('updata_article', (res) => {
				this.getFollow()
				if (this.list.length === 0) {
					this.noContent = true
				}
			})
			uni.$on('updata_author',() => {
				this.getAuthor()
				if (this.authorList.length === 0) {
					this.noAuthor = true
				}
			})
			this.getFollow()
			this.getAuthor()
		},
		methods: {
			tab(index) {
				this.activeIdx = index
			},
			change(e){
				this.activeIdx=e.detail.current
			},
			getFollow() {
				this.$api.get_follow().then(res => {
					const {
						data
					} = res
					this.list = data
					if (this.list.length === 0) {
						this.noContent = true
					}
				})
			},
			getAuthor(){
				this.$api.get_author().then(res => {
					const {data} = res
					this.authorList = data
					if (this.authorList.length === 0) {
						this.noAuthor = true
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		flex: 1;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.follow-header {
		width: 100%;
		padding: 15px 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #f4f4f4;
		.follow-header-box {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border: 1px solid $mk-base-color;
			border-radius: 5px;

			.follow-header-item {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 5px 0;
				font-size: 15px;
				font-weight: 1.5;

				&:first-child {
					border-right: 1px solid $mk-base-color;
				}

				&.active {
					color: $mk-base-color;
				}
			}
		}
	}

	.follow-content {
		flex: 1;
		height: 100%;

		.follow-content-swiper {
			height: 100%;
			.no-content{
				padding: 50px;
				font-size: 14px;
				color: #999999;
				text-align: center;

			}
		}
	}
</style>
