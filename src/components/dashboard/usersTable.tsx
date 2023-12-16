"use server"
import { cookies } from 'next/headers';
import * as React from 'react';
import TableAlone from './tableAlone';
import { Modal } from 'antd';

const getUsers = async () => {
    const token  = cookies().get('token')?.value || "";
    try {
        const response = await fetch(
            `http://localhost:5000/user/users`,
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

export default async function UsersTable({deleteAction}:any) {

    const _users = await getUsers();

    return ( 
        <>
            <div style={{background: "#fff", padding: "25px"}}>
                <TableAlone _users={_users} />
            </div>
        </>
    );
}