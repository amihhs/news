<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more v-if='loading' status="loading" iconType="circle"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" v-for="(item, index) in labelList" :key='item._id' @click="remove(index)">
					{{item.name}}
					<uni-icons v-if="is_edit" class="icons-close" type="clear" color="red" size="20"></uni-icons>
				</view>
			</view>
			<view v-if="labelList.length === 0 && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if='loading' status="loading" iconType="circle"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content-item" v-for="(item, index) in list" :key='item._id' @click="add(index)">
					{{item.name}}
					<uni-icons v-if="is_edit" class="icons-close" type="plus" color="green" size="20"></uni-icons>
				</view>
			</view>
			<view v-if="list.length === 0 && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: true
			};
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			emit(){
				
			},
			editLabel() {
				if (this.is_edit) {
					this.is_edit = false
					uni.showLoading()
					this.setUpdataLabel(this.labelList)
				} else {
					this.is_edit = true
				}

			},
			remove(index) {
				if (!this.is_edit) return
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			add(index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			setUpdataLabel(label) {
				let Arr = []
				label.forEach(val => {
					Arr.push(val._id)
				})
				this.$api.updata_label({
					label: Arr
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					uni.$emit('labelChange')
				})
			},
			getLabel() {
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					const {
						data
					} = res
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
					this.loading = false
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}

			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content-item {
					padding: 2px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: #666 1px solid;
					font-size: 14px;
					color: #666;
					position: relative;

					.icons-close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.no-data {
		height: 100px;
		width: 100%;
		line-height: 100px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>
