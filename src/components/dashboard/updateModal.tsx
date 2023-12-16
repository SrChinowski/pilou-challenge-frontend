"use client"
import { Modal, notification } from 'antd';
import * as React from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';

const UpdateModal = (
    {isOpen, setIsOpen, record} : 
    {isOpen: boolean, setIsOpen:any, record: any}
) => {

    console.log(record)
    const [loading, setLoading] = React.useState(false)

    const handleOk = () => {}
    const handleSubmit = async (values: any) => {
        console.log(values)
        setLoading(true)
        const token  = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:5000/user/update`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      "user": {_id: record._id , ...values}
                  }),
                }
            )

            if (response.ok) {
                const data = await response.json(); 
                console.log(data)
                notification.success({
                  message: "Usuario Actualizado"
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
                initialValues={{
                    username: record.username,
                    name: record.name,
                    last_name: record.last_name,
                    emergency_contact_name: record.emergency_contact?.name || "",
                    emergency_contact_phone: record.emergency_contact?.phone || "",
                    blood_type: record.blood_type,

                }}
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
 
export default UpdateModal;