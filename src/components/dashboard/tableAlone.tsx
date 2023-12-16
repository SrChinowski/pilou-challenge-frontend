"use client"
import { Button, Modal, Popconfirm, Table, notification } from 'antd';
import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Tag } from "antd"
import UpdateModal from './updateModal';
import CreateModal from './createModal';
import QrModal from './qrModal';



const TableAlone = ({ _users }:any) => {

  const [openModal, setOpenModal] = React.useState(false)
  const [openModalC, setOpenModalC] = React.useState(false)
  const [openModalQR, setOpenModalQR] = React.useState(false)
  const [record, setrecord] = React.useState({})

    const handleRemove = async (record:any) => {
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
                      "user": {
                          "_id": record._id,
                          "active": false
                      }
                  }),
                }
            )
            if (response.ok) {
                const data = await response.json(); 
                console.log(data)
                notification.success({
                  message: "Baja confirmada"
                })
                setTimeout(() => {
                  location.reload()
                }, 1500);
            } 
            else return {}
        } catch (error) {
            console.log("[ERROR] :",error)
            notification.error({
              message: "Error en la operacion"
            })
            return {}
        }
    }

    const handleUpdate = (record:any) => {
      setOpenModal(true)
      setrecord(record)
    }

    const handleQR = (record:any) => {
      setOpenModalQR(true)
      setrecord(record)
    }

    const columnsUsers = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Apellido',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
            title: 'Estatus',
            dataIndex: 'active',
            key: 'created_at',
            render: (text: any) => (text ? <Tag color="success">Activo</Tag> : <Tag color="error">Baja</Tag>),
        },
        {
          title: 'Contacto de Emergencia',
          dataIndex: 'emergency_contact',
          key: 'emergency_contact',
          render: (text: any) => <p>{text.name} - {text.phone}</p>,
        },
        {
            title: 'Tipo de Sangre',
            dataIndex: 'blood_type',
            key: 'blood_type',
            render: (text: any) => (text !== "" ? <p>{text}</p> : "no disponible"),
        },
        {
            title: 'Fecha de Ingreso',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_ :any, record : any) => (
              <>
                  <Popconfirm
                    title="Dar de baja a colaborador"
                    description="Seguro?"
                    onConfirm={() => handleRemove(record)}
                    onCancel={() => {}}
                    okText="Eliminar"
                    cancelText="Cancelar"
                >
                    <Button danger>Eliminar</Button>
                </Popconfirm>
                <br/>
                <a onClick={() =>handleUpdate(record)}>Actualizar</a>
                <br/>
                <a onClick={() =>handleQR(record)}>Generar QR</a>
              </>
            ),
          },
      ];
    return ( 
      <>
        <Button type='primary' onClick={() =>setOpenModalC(true)}>Agregar Usuario</Button>
        <Table dataSource={_users} columns={columnsUsers} />
        <UpdateModal isOpen={openModal} setIsOpen={setOpenModal} record={record}/>
        <CreateModal isOpen={openModalC} setIsOpen={setOpenModalC} />
        <QrModal isOpen={openModalQR} setIsOpen={setOpenModalQR} record={record}/>
      </>
    );
}
 
export default TableAlone;