<template>
    <div class="auth-page">
        <div class="auth-card">
            <h2 class="auth-title">登录</h2>
            <ElForm :model="loginForm" :rules="loginRules" ref="loginRef" label-position="top" class="auth-form">
                <ElFormItem label="邮箱" prop="email">
                    <ElInput v-model="loginForm.email" placeholder="请输入邮箱" />
                </ElFormItem>

                <ElFormItem label="密码" prop="password">
                    <ElInput v-model="loginForm.password" type="password" placeholder="请输入密码" />
                </ElFormItem>

                <ElFormItem>
                    <ElButton type="primary" class="auth-btn" @click="handleLogin">
                        登录
                    </ElButton>
                </ElFormItem>
            </ElForm>

            <div class="auth-footer">
                <span>还没有账号？</span>
                <router-link to="/register">去注册</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
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
const loginRef = ref<InstanceType<typeof ElForm>>();

const loginForm = reactive({
    email: '',
    password: '',
});

const loginRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const handleLogin = () => {
    loginRef.value?.validate((valid) => {
        if (valid) {
            // 模拟登录成功
            ElMessage.success('登录成功');
            router.push('/');
        }
    });
};
</script>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
}

.auth-card {
    width: 380px;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #409eff;
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
    color: #409eff;
}
</style>