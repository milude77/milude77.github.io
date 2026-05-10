<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getMyTasks, addTask, deleteTask, completeTask, updateTask, type Todo } from '../utils/supabase'
import { useUserStore } from '../stores/user'
import { Plus, Delete, Check, EditPen } from '@element-plus/icons-vue'
import { ElMessage, ElInput, ElButton, ElEmpty, ElDatePicker } from 'element-plus'
import useAsyncLoading from "@/utils/useAsyncLoding"

const userStore = useUserStore()
const todos = ref<Todo[]>([])
const newTask = ref('')
const isListLoading = ref(false)

let curDate = ref(new Date())
const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const d = date.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${d}`
}

// 获取数据
const fetchTodos = async () => {
    if (!userStore.user) return
    isListLoading.value = true

    try {
        // 2. 传递格式化后的日期
        const selectedDate = formatDate(curDate.value)
        const { data, error } = await getMyTasks(selectedDate)

        if (error) throw error
        todos.value = data || []
    } catch (err: any) {
        console.error('获取失败:', err.message)
    } finally {
        isListLoading.value = false
    }
}

watch(curDate, () => {
    fetchTodos()
})

// 添加数据
const handleAdd = async () => {
    if (!newTask.value.trim()) return
    if (!userStore.user) return ElMessage.warning('请先登录')

    // --- 新增：日期校验逻辑 ---
    const today = new Date()
    today.setHours(0, 0, 0, 0) // 重置为今天凌晨

    const selectedDate = new Date(curDate.value)
    selectedDate.setHours(0, 0, 0, 0) // 重置选中日期凌晨

    if (selectedDate < today) {
        return ElMessage.warning('不能为过去的日期添加任务哦！')
    }

    try {
        const dateStr = formatDate(curDate.value)
        const { data, error } = await addTask(newTask.value.trim(), dateStr)

        if (error) throw error
        if (data) {
            todos.value.unshift(data[0])
            newTask.value = ''
        }
    } catch (err: any) {
        ElMessage.error('添加失败: ' + err.message)
    }
}

// 删除数据
const handleDelete = async (id: number) => {
    const { error } = await deleteTask(id)
    if (!error) {
        todos.value = todos.value.filter(t => t.id !== id)
    }
}

const handleTaskComplete = async (id: number) => {
    const { error } = await completeTask(id)
    if (!error) {
        const index = todos.value.findIndex(t => t.id === id)
        if (index !== -1) {
            todos.value[index].is_completed = true
        }
    }
}

const { loading: isTaskCompletedLoading, run: taskComplete } = useAsyncLoading(handleTaskComplete)
const { loading: isTaskAddLoading, run: taskAdded } = useAsyncLoading(handleAdd)

const toggleEdit = (item: Todo) => {
    if (item.isEditing) {
        // 如果当前是编辑状态，点击后执行保存
        handleSave(item);
    } else {
        // 开启编辑模式
        item.isEditing = true;
    }
};

const handleSave = (item: Todo) => {
    // 执行更新任务的函数
    updateTask(item.id, item.task);
    // 关闭编辑模式
    item.isEditing = false;
};

onMounted(async () => {
    await fetchTodos()
})
</script>

<template>
    <div class="planner-wrapper">
        <div class="planner-box">
            <div class="panner-title">
                <span>📅 </span>
                <el-date-picker v-model="curDate" type="date" placeholder="选择日期" />
            </div>

            <div class="input-group">
                <el-input v-model="newTask" placeholder="写下今天的计划..." size="large" @keyup.enter="handleAdd">
                    <template #append>
                        <el-button title="添加计划" :icon="Plus" @click="taskAdded" />
                    </template>
                </el-input>
            </div>

            <div v-loading="isListLoading" class="list-container">
                <div v-if="todos.length > 0" class="todo-list">
                    <div v-for="item in todos" :key="item.id" class="todo-item">
                        <div class="todo-info">
                            <!-- 通过 :readonly 控制是否可以编辑 -->
                            <el-input v-model="item.task" :readonly="!item.isEditing || item.is_completed"
                                :class="{ 'is-editing': item.isEditing }" size="large"
                                @keyup.enter="handleSave(item)" />

                            <!-- 编辑/完成 切换按钮 -->
                            <el-button v-if="!item.is_completed" class="edit-toggle-btn"
                                :type="item.isEditing ? 'primary' : ''" size="small" @click="toggleEdit(item)"
                                :icon="item.isEditing ? Check : EditPen">
                            </el-button>
                        </div>

                        <!-- 右侧操作区 -->
                        <div v-if="!item.is_completed" class="task-option-btn">
                            <el-button type="success" :icon="Check" circle size="small"
                                @click="taskComplete(item.id)" />
                            <el-button type="danger" :icon="Delete" circle size="small"
                                @click="handleDelete(item.id)" />
                        </div>
                        <div v-else class="task-option-btn">
                            <span class="todo-text">已完成</span>
                            <el-button type="success" :icon="Check" circle size="small" disabled />
                        </div>
                    </div>
                </div>

                <el-empty v-else :image-size="60" description="今天还没有计划呢" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 容器背景：确保不使用全局模糊 */
.planner-wrapper {
    padding: 20px;
    display: flex;
    justify-content: center;
}

.planner-box {
    width: 100%;
    max-width: 450px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
}

.panner-title {
    padding-bottom: 10px;
    color: #303133;
    font-size: 1.25rem;
    text-align: center;
}

.input-group {
    margin-bottom: 20px;
}

.list-container {
    min-height: 150px;
}

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
}

.todo-item:hover {
    background: #f5f7fa;
}

/* 默认隐藏编辑按钮 */
.edit-toggle-btn {
    opacity: 0;
    transition: opacity 0.3s;
    margin-left: 10px;
}

/* 鼠标移入 todo-item 时显示按钮 */
.todo-item:hover .edit-toggle-btn {
    opacity: 1;
}

/* 如果正在编辑中，保持按钮可见 */
.todo-item .edit-toggle-btn.el-button--primary {
    opacity: 1;
}

/* 调整只读状态下输入框的样式，使其看起来不像输入框 */
:deep(.el-input.is-readonly .el-input__wrapper) {
    box-shadow: none !important;
    background-color: transparent !important;
    cursor: default;
}

.todo-text {
    color: #606266;
    font-size: 14px;

}

.todo-info {
    display: flex;
    align-items: center;
}

.task-option-btn {}
</style>