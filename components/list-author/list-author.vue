<template>
	<view class="author-box">
		<view class="author-item-image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="author-item-info">
			<view class="author-item-info-title">{{item.author_name}}</view>
			<view class="author-item-info-des">
				<view class="author-item-info-des-label">
					{{item.professional}}
				</view>
				<view class="author-item-info-des-info">
					<text>发帖{{item.article_ids.length}}</text>
					<text>粉丝{{item.fans_count}}</text>
				</view>
			</view>
		</view>
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
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.author-box {
		display: flex;
		padding: 10px 10px;
		margin: 10px 20px;
		border-radius: 5px;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5f;
		box-shadow:0 0 5px #b1b1b1;
		.author-item-image{
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.author-item-info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.author-item-info-title{
				position: relative;
				padding-right: 30px;
				font-size: 15px;
				color: #333333;
				font-weight: bold;
				line-height: 1.2;
				
			}
		}
		.author-item-info-des{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			.author-item-info-des-label{
				color: #666666;
			}
			.author-item-info-des-info{
				color: #999999;
				line-height: 1.5;
				text:first-child{
					margin-right: 10px;
				}
			}
		}
	}
</style>
