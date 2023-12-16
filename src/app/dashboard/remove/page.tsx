import * as React from "react";
import styles from "./dashboard.module.css";
import { Avatar, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import { UserOutlined } from '@ant-design/icons';
import UserBadge from "@/app/dashboard/userBadge";

const MenuItems = [
    {
        key: 0,
        icon: (<UserOutlined />),
        label: "Inicio",
    },
    {
        key: 1,
        icon: (<UserOutlined />),
        label: "Colaboradores",
    },
    {
        key: 2,
        icon: (<UserOutlined />),
        label: "Reportes",
    },
]

export default function DashboardRemove() {

  return (
    <main className={styles.main}>
      <Layout style={{ width: "100%" }}>
        <Header className={styles.dashboardHeader }>
            <Image 
                src={"/logo-b.webp"}
                width={63}
                height={25}
                alt='Pilou'
            />
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Header>
        <Layout>
          <Sider width={200} style={{ backgroundColor: '#fff', borderRight: "1px solid #ececec"}}>
            <UserBadge />
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "fit-content", borderRight: 0 }}
              items={MenuItems}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <h1>Remove</h1>
            </Content>
          </Layout>
        </Layout>
      </Layout> 
    </main>
  );
};
