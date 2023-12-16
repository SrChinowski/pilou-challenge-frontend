"use server"
import Avatar from 'antd/es/avatar/avatar';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import  Row from 'antd/es/row';
import  Col from 'antd/es/col';
import styles from "../../app/dashboard/dashboard.module.css"

import { headers, cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { UserI } from '@/schemas/user';

const getUserInfo = async () => {
    const token  = cookies().get('token')?.value || "";
    const user = jwtDecode(token) as any;
    try {
        const response = await fetch(
            `http://localhost:5000/user/find/${user.username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                },
            }
        )
        // console.log("Entra", response)
        if (response.ok) {
            const data = await response.json(); 
            return data
        } 
        else return {}
    } catch (error) {
        console.log("[ERROR] :",error)
        return {}
    }
}

const UserBadge = async () => {

    const _user = await getUserInfo()

    return ( 
        <>
        <Row className={styles.profileSider}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <Col>
                <p className={styles.profileSiderTitle}>{_user.name}</p>
                <p className={styles.profileSiderUsername}>{_user.username}</p>
            </Col>
        </Row>
    </>
     );
}
 
export default UserBadge;