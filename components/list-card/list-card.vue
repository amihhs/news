<template>
	<view @click="open">
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="listcard">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :types='types' :item="item"></likes>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">
						<view class="listcard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		<!-- 多图 -->
		<view v-if="item.mode === 'column'" class="listcard mode-column">
			<view class="listcard-content">
				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :types='types' :item="item"></likes>
				</view>
				<view class="listcard-image">
					<view v-if='index < 3' v-for="(item, index) in item.cover" :key='index' class="listcard-image-title">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">
						<view class="listcard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		<!-- 大图 -->
		<view v-if="item.mode === 'image'" class="listcard mode-image">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">

				<view class="listcard-content-title">
					<text>{{item.title}}</text>
					<likes :types='types' :item="item"></likes>
				</view>
				<view class="listcard-content-des">
					<view class="listcard-content-des-label">
						<view class="listcard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listcard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
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

			};
		},
		methods:{
			open(){
				const item = this.item
				this.$emit('click',item)
				const params = {
					_id: item._id,
					author: item.author,
					title:item.title,
					create_time: item.create_time,
					thumb_up_count:item.thumbs_up_count,
					browse_count: item.browse_count
				}
				uni.navigateTo({
					url:'/pages/home-detail/home-detail?params='+ JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);

		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.listcard-content {
			display: flex;
			flex-direction: column;
			padding-left: 10px;
			width: 100%;
			justify-content: space-between;

			.listcard-content-title {
				font-size: 14px;
				color: #333;
				font-weight: bold;
				line-height: 1.2;
				padding-right: 30px;
				position: relative;

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				
			}

			.listcard-content-des {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.listcard-content-des-label {
					display: flex;
					font-size: 12px;

					.listcard-content-des-label-item {
						padding: 0 5px;
						margin: 5px;
						border-radius: 15px;
						border: 1px $mk-base-color solid;
					}
				}

				.listcard-content-des-browse {
					color: #999;
					font-size: 12px;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {
			.listcard-content {
				width: 100%;
				padding-left: 0;

				.listcard-image {
					display: flex;
					margin-top: 10px;
					width: 100%;
					height: 70px;
					margin-bottom: 10px;

					.listcard-image-title {
						margin-left: 10px;
						width: 100%;
						border-radius: 5px;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.listcard-content-des {}
				}
			}
		}

		&.mode-image {
			display: flex;
			flex-direction: column;

			.listcard-image {
				width: 100%;
				height: 100px;
			}

			.listcard-content {
				padding-left: 0;
				margin-top: 10px;

				.listcard-content-des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}

			}
		}
	}
</style>
