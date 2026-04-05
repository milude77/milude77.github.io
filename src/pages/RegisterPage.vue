<template>
    <div class="auth-page">
        <div class="auth-card">
            <h2 class="auth-title">注册</h2>
            <ElForm :model="registerForm" :rules="registerRules" ref="registerRef" label-position="top"
                class="auth-form">
                <ElFormItem label="用户名" prop="username">
                    <ElInput v-model="registerForm.username" placeholder="请输入用户名" />
                </ElFormItem>

                <ElFormItem label="邮箱" prop="email">
                    <ElInput v-model="registerForm.email" placeholder="请输入邮箱" />
                </ElFormItem>

                <ElFormItem label="密码" prop="password">
                    <ElInput v-model="registerForm.password" type="password" placeholder="请输入密码" />
                </ElFormItem>

                <ElFormItem label="确认密码" prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" />
                </ElFormItem>

                <ElFormItem>
                    <ElButton type="primary" class="auth-btn" @click="handleRegister">
                        注册
                    </ElButton>
                </ElFormItem>
            </ElForm>

            <div class="auth-footer">
                <span>已有账号？</span>
                <router-link to="/login">去登录</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { ElForm, ElMessage, ElInput, ElButton, ElFormItem } from 'element-plus';
import { useRouter } from 'vue-router';

onMounted(() => {
  const savedScheme = localStorage.getItem('color-scheme')
  if (savedScheme) {
    if (savedScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light')
    }
  }
})

const router = useRouter();
const registerRef = ref<InstanceType<typeof ElForm>>();

const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
});

const registerRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
        {
            required: true,
            message: '请确认密码',
            trigger: 'blur',
        },
        {
            validator: (value: string, callback: any) => {
                if (value !== registerForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur',
        },
    ],
};

const handleRegister = () => {
    registerRef.value?.validate((valid) => {
        if (valid) {
            // 模拟注册成功
            ElMessage.success('注册成功');
            router.push('/login');
        }
    });
};
</script>

<style scoped>
/* 和登录页复用同样样式 */
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
}

.auth-card {
    border: 1px solid #dcdfe6;
    width: 380px;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    text-align: center;
}

.auth-title {
    margin-bottom: 1.5rem;
    font-size: 24px;
}

.auth-btn {
    width: 100%;
}

.auth-footer {
    margin-top: 1rem;
    font-size: 14px;
}

.auth-footer a {
    margin-left: 4px;
}
</style>