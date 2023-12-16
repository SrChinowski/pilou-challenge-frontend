"use client"
import { Modal, QRCode, notification } from 'antd';
import * as React from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';

const QrModal = (
    {isOpen, setIsOpen, record} : 
    {isOpen: boolean, setIsOpen:any, record: any}
) => {

    const [loading, setLoading] = React.useState(false)

    const handleOk = () => {}

    return ( 
        <>
            <Modal 
                title="QR del usuario" 
                open={isOpen} 
                onOk={handleOk} 
                onCancel={() => setIsOpen(false)}
            >
                  <QRCode value={JSON.stringify(record) || '-'} />
            </Modal>
        </>
     );
}
 
export default QrModal;