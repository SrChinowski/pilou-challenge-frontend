"use client"
import { Modal, notification } from 'antd';
import * as React from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';

const CreateModal = (
    {isOpen, setIsOpen} : 
    {isOpen: boolean, setIsOpen:any}
) => {

    const [loading, setLoading] = React.useState(false)

    const handleOk = () => {}
    const handleSubmit = async (values: any) => {
        console.log(values)
        setLoading(true)
        const token  = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:5000/user/new`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "user": {
                            "username": values.username,
                            "name": values.name,
                            "last_name": values.last_name,
                            "emergency_contact": {
                                "name": values.emergency_contact_name,
                                "phone": values.emergency_contact_phone
                                },
                            "blood_type": values.blood_type,
                            "password": values.password
                        }
                  }),
                }
            )

            if (response.ok) {
                const data = await response.json(); 
                console.log(data)
                notification.success({
                  message: "Usuario Creado"
                })
                setIsOpen(false)
                setTimeout(() => {
                    location.reload()
                  }, 1500);
            } else {
                notification.error({
                    message: "Error en la operacion"
                  })
            }

        } catch (error) {
            console.log("[ERROR] :",error)
        }
        setLoading(false)
    }
    return ( 
        <>
            <Modal 
                title="Actualizar Información" 
                open={isOpen} 
                onOk={handleOk} 
                onCancel={() => setIsOpen(false)}
            >
            <Form
                autoComplete='false'
                layout='vertical'
                onFinish={handleSubmit}
                disabled={loading}
            >
                <Form.Item
                    name="username"
                    label="Usuario"
                >
                    <Input placeholder="Usuario" />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nombre"
                >
                    <Input placeholder="Nombre" />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Apellido"
                >
                    <Input placeholder="Apellido" />
                </Form.Item>
                <Form.Item
                    name="emergency_contact_name"
                    label="Nombre del contacto de Emergencia"
                >
                    <Input placeholder="Apellido" />
                </Form.Item>
                <Form.Item
                    name="emergency_contact_phone"
                    label="Telefono del contacto de Emergencia"
                >
                    <Input placeholder="Telefono" />
                </Form.Item>
                <Form.Item
                    name="blood_type"
                    label="Tipo de Sangre"
                >
                    <Input placeholder="Tipo de Sangre" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Contraseña"
                >
                    <Input placeholder="Contraseña" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Actualizar
                    </Button>
                </Form.Item>
            </Form>
            </Modal>
        </>
     );
}
 
export default CreateModal;