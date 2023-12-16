'use client';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import styles from '../../app/page.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)

    const handleSubmit = async (values: any) => {

        setLoading(true)
        try {
            const response = await fetch(
                `http://localhost:5000/auth/login/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": values.username,
                        "password": values.password
                    }),
                }
            )

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                router.push('/dashboard');
            } else {
                setUnauthorized(true)
            }

        } catch (error) {
            console.log("[ERROR] :",error)
        }
        setLoading(false)
    }
    
    useEffect(() => {
        unauthorized && setTimeout(function() {
            setUnauthorized(false)
        }, 3500);
    }, [unauthorized])

    return ( 
        <>
        <Form
            autoComplete='false'
            layout='vertical'
            className={styles.loginForm}
            onFinish={handleSubmit}
            disabled={loading}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'El usuario es obligatorio' }]}
            >
                <Input placeholder="Usuario" prefix={ <UserOutlined />}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'El usuario es obligatorio' }]}
            >
                <Input.Password placeholder="Contraseña" prefix={ <LockOutlined />}/>
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Recuerdame</Checkbox>
                </Form.Item>

                <a style={{float: "right"}} href="">
                    {"Olvidé la contraseña :("}
                </a>
            </Form.Item>
            <Form.Item className={styles.loginFormBtn}>
                <Button type="primary" htmlType="submit" className={styles.loginFormBtn} loading={loading}>
                    Iniciar Sesión
                </Button>
            </Form.Item>
            {
                unauthorized && <Alert type='error' showIcon message="Usuario o contraseña incorrectos :("/>
            }
        </Form>
        </>
    );
}
 