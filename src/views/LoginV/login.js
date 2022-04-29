import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

export function useCount() {
    const router = useRouter();
    const formObj = reactive({
        username: '',
        password: '',
    })
    const user = sessionStorage.getItem('user');
    const pwd = sessionStorage.getItem('pwd');

    const login = () => {
        if (formObj.username == '' || formObj.password == '') {
            ElMessage({
                message: '账号和密码不能为空',
                type: 'error',
            })
        } else {
            if (formObj.username == user && formObj.password == pwd) {
                router.push({ path: '/index' })
            } else {
                ElMessage({
                    message: '用户名和密码不对！！！',
                    type: 'warning',
                })
            }
        }
    }
    const zhuce = () => {
        router.push({ path: '/zhuce' })
    }

    return { formObj, login, zhuce }
}