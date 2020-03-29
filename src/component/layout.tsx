import React from "react"
import { Layout, Select } from 'antd';
import { ChildrenProps } from '../global';
import '../styles/layout.scss';
const { Header, Footer, Content } = Layout;
const { Option } = Select;
export default (props: ChildrenProps) => (
    <Layout>
        <Header className="header">
            <div className="title">Form表单代码生成器</div>
            <div className="extra">
                <label htmlFor="antdVersion">Antd Version:</label>
                <Select size="small" id="antdVersion" defaultValue="3.x" style={{ width: 60 }}>
                    <Option value="3.x">3.x</Option>
                </Select>
                <span>仅支持简单组件生成代码</span>
            </div>
        </Header>
        <Content className="content">{props.children}</Content>
        <Footer className="footer">design@moralYoung contact:342731425@qq.com</Footer>
    </Layout>
)