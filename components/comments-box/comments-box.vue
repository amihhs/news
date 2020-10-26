<template>
	<view class="comment">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src='item.author.avatar' mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view v-if='!item.is_reply' class="title">
					{{item.author.author_name}}
				</view>
				<view v-else class="title">
					{{item.author.author_name}}<text class="reply-text">回复</text>{{item.to}}
				</view>
				<view>
					{{item.create_time | formatTime}}
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view>
				{{item.comment_content}}
			</view>
			<view class="comments-info">
				<view class="comment-button" @click="commentReply({item, is_reply:reply})">
					回复
				</view>
			</view>
			<view class="comments-reply" v-for='item in item.replys' :key='item.comment_id'>
				<comments-box :reply='true' :item='item' @reply="commentReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	import {parseTime} from '@/utils/index.js'
	export default {
		name:"comments-box",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			reply:{
				type: Boolean,
				default:false
			}
		},
		data() {
			return {

			};
		},
		filters:{
			formatTime(time){
				return parseTime(time)
			}
		},
		methods:{
			commentReply(item){
				if(item.is_reply){
					item.item.reply_id = item.item.comment_id
					item.item.comment_id = this.item.comment_id
				}
				this.$emit('reply', item)
			}
		}
	}
</script>

<style lang="scss">
	.comment {
		margin: 15px 0;

		.comment-header {
			display: flex;

			.comment-header-logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;

				}
			}

			.comment-header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333333;
					.reply-text{
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}

		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000000;
			.comments-info{
				margin-top: 10px;
				display: flex;
				.comment-button{
					padding: 2px 10px;
					font-size: 12px;
					color: #999999;
					border-radius: 20px;
					border: 1px solid #ccc;
					
				}
			}
			.comments-reply{
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
