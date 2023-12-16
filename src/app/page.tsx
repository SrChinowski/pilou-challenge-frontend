
import Image from 'next/image'
import styles from './page.module.css'
import { Badge, Col, ConfigProvider, Row } from 'antd';
import theme from '../theme/themeConfig';
import LoginForm from '@/components/login/loginForm';
import 'antd/dist/reset.css';

export default function Home() {

  return (
    <ConfigProvider theme={theme}>
    <main className={styles.main}>
      <Row className={styles.loginRow}>
        <Col span={18}>
          <Image 
            src={"/login.webp"}
            layout="fill" 
            objectFit="cover" 
            alt='Pilou'
          />
        </Col>
        <Col span={6} className={styles.loginWrapper}>
          <Image 
            src={"/logo.webp"}
            layout="intrinsic"
            width={210}
            height={75}
            alt='Pilou'
          />
          <Badge count={"Colaboradores"} color='#FF5420'/>
          <LoginForm />
          <p className={styles.credits}>Made with ❤️ by Carlos Leon</p>
        </Col>
      </Row>
    </main>
    </ConfigProvider>
  )
}
