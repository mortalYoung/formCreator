import React from 'react';
import { AST, InputAttr, FormAttr, ButtonAttr, InputNumberAttr, CheckBoxAttr, SwitchAttr, RadioAttr } from '../global';
import { Input, InputNumber, Select, Form, Switch, Button } from 'antd';
interface IProps {
    data: AST,
    handleSubmit?: (arg: object) => void
}

const Option = Select.Option;
export default (props: IProps) => {
    const handleSubmit = (values: object) => {
        props.handleSubmit && props.handleSubmit(values);
    }
    const typeRender = () => {
        const { data } = props;
        switch (data.type) {
            case 'Input': {
                const attr = data.attr as InputAttr
                const initialValues = {
                    labelName: data.name,
                    required: data.required,
                    placeholder: attr ? attr.placeholder : '',
                    id: attr ? attr.id : '',
                    maxLength: attr ? attr.maxLength : '',
                    type: attr ? attr.type : '',
                    size: attr.size,
                    allowClear: attr ? attr.allowClear : false,
                    disabled: attr ? attr.disabled : false,
                }
                return <Form
                    key={data.key}
                    name="setting"
                    onFinish={handleSubmit}
                    initialValues={initialValues}
                >
                    <Form.Item
                        name="labelName"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Input Label" autoComplete="off"></Input>
                    </Form.Item>
                    <Form.Item
                        name="placeholder"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="输入框默认内容" autoComplete="off"></Input>
                    </Form.Item>
                    <Form.Item
                        name="id"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="输入框的 id" autoComplete="off"></Input>
                    </Form.Item>
                    <Form.Item name="maxLength">
                        <InputNumber style={{ width: '100%' }} placeholder="最大长度" min={0}></InputNumber>
                    </Form.Item>
                    <Form.Item name="type">
                        <Input placeholder="声明 input 类型，同原生 input 标签的 type 属性" autoComplete="off"></Input>
                    </Form.Item>
                    <Form.Item name="disabled" label="是否禁用状态" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="size"
                        rules={[{ required: false }]}
                    >
                        <Select defaultValue="middle">
                            <Option value="large">large</Option>
                            <Option value="middle">default</Option>
                            <Option value="small">small</Option>
                            {/* 
                                3.x的属性为small|large|default
                                4.x的属性为small|large|middle
                            */}
                        </Select>
                    </Form.Item>
                    <Form.Item name="allowClear" label="清除图标" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="required"
                        label="是否必填"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form >
            }
            case 'Form': {
                const attr = data.attr as FormAttr;
                const initialValues = {
                    hideRequiredMark: attr.hideRequiredMark ? attr.hideRequiredMark : false,
                    colon: attr.colon == undefined ? true : attr.colon,
                    labelAlign: attr.labelAlign,
                    layout: attr.layout,
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="hideRequiredMark"
                            label="隐藏所有表单项的必选标记"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="colon"
                            label="配置 Form.Item 的 colon 的默认值"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="labelAlign"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="right">
                                <Option value="left">left</Option>
                                <Option value="right">right</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="layout"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="horizontal">
                                <Option value="horizontal">horizontal</Option>
                                <Option value="vertical">vertical</Option>
                                <Option value="inline">inline</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            case 'Button': {
                const attr = data.attr as ButtonAttr;
                const initialValues = {
                    labelName: data.name,
                    disabled: attr.disabled ? attr.disabled : false,
                    ghost: attr.ghost ? attr.ghost : false,
                    href: attr.href ? attr.href : '',
                    htmlType: attr.htmlType ? attr.htmlType : 'button',
                    icon: attr.icon ? attr.icon : '',
                    shape: attr.shape ? attr.shape : '',
                    size: attr.size,
                    type: attr.type ? attr.type : 'primary',
                    block: attr.block ? attr.block : false,
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="disabled"
                            label="按钮失效状态"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="ghost"
                            label="幽灵属性"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="labelName"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="Button Label" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="href">
                            <Input placeholder="点击跳转的地址，指定此属性 button 的行为和 a 链接一致" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="htmlType"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="button">
                                <Option value="submit">submit</Option>
                                <Option value="reset">reset</Option>
                                <Option value="button">button</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="icon">
                            <Input placeholder="设置按钮的图标类型" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="shape"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="">
                                <Option value="">default</Option>
                                <Option value="circle">circle</Option>
                                <Option value="circle-outline">circle-outline</Option>
                                <Option value="round">round</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="size"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="middle">
                                <Option value="small">small </Option>
                                <Option value="large">large</Option>
                                <Option value="middle">default</Option>
                                {/* 
                                    3.x的属性为small|large|default
                                    4.x的属性为small|large|middle
                                 */}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="type"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="primary">
                                <Option value="primary">primary</Option>
                                <Option value="dashed">dashed</Option>
                                <Option value="danger">danger</Option>
                                <Option value="link">link</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="block"
                            label="将按钮宽度调整为其父宽度的选项"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            case 'InputNumber': {
                const attr = data.attr as InputNumberAttr;
                const initialValues = {
                    labelName: data.name,
                    autoFocus: attr.autoFocus,
                    disabled: attr.disabled,
                    max: attr.max == Number.POSITIVE_INFINITY ? '' : attr.max, /* 对数字稍作展示处理 */
                    min: attr.min == Number.NEGATIVE_INFINITY ? '' : attr.min,
                    precision: attr.precision ? attr.precision : 1,
                    decimalSeparator: attr.decimalSeparator,
                    step: attr.step,
                    size: attr.size ? attr.size : ''
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="autoFocus"
                            label="自动获取焦点"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="disabled"
                            label="禁用"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="labelName"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="InputNumber Label" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item name="max">
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="最大值">
                            </InputNumber>
                        </Form.Item>
                        <Form.Item name="min">
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="最小值">
                            </InputNumber>
                        </Form.Item>
                        <Form.Item name="precision">
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="数值精度">
                            </InputNumber>
                        </Form.Item>
                        <Form.Item
                            name="decimalSeparator">
                            <Input placeholder="小数点" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="step">
                            <Input placeholder="每次改变步数，可以为小数" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="size"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="">
                                <Option value="">无</Option>
                                <Option value="large">large</Option>
                                <Option value="small">small</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            case 'CheckBox': {
                const attr = data.attr as CheckBoxAttr;
                const initialValues = {
                    labelName: data.name,
                    disabled: attr.disabled,
                    name: attr.name ? attr.name : ''
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="disabled"
                            label="禁用"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="labelName"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="Checkbox Label" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="name">
                            <Input placeholder="CheckboxGroup 下所有 input[type=checkbox] 的 name 属性" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            case 'Switch': {
                const attr = data.attr as SwitchAttr || {};
                const initialValues = {
                    labelName: data.name,
                    disabled: attr.disabled,
                    autoFocus: attr.autoFocus,
                    loading: attr.loading,
                    size: attr.size,
                    classname: attr.className ? attr.className : ''
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="labelName">
                            <Input placeholder="Switch label" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="autoFocus"
                            label="组件自动获取焦点"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="disabled"
                            label="禁用"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="loading"
                            label="加载中的开关"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="size"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="default">
                                <Option value="default">default</Option>
                                <Option value="small">small</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="className">
                            <Input placeholder="Switch 器类名" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            case 'Radio': {
                const attr = data.attr as RadioAttr || {};
                const initialValues = {
                    labelName: data.name,
                    disabled: attr.disabled,
                    name: attr.name ? attr.name : '',
                    size: attr.size,
                    buttonStyle: attr.buttonStyle
                }
                return (
                    <Form
                        key={data.key}
                        name="setting"
                        onFinish={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="labelName">
                            <Input placeholder="Radio label" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="disabled"
                            label="禁选所有子单选器"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="name">
                            <Input placeholder="RadioGroup 下所有 input[type=radio]的name属性" autoComplete="off"></Input>
                        </Form.Item>
                        <Form.Item
                            name="size"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="middle">
                                <Option value="middle">default</Option>
                                {/**
                                 * 3.x版本为default
                                 * 4.x版本为middle
                                 */}
                                <Option value="small">small</Option>
                                <Option value="large">large</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="buttonStyle"
                            rules={[{ required: false }]}
                        >
                            <Select defaultValue="outline">
                                <Option value="outline">outline</Option>
                                <Option value="solid">solid</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form >
                )
            }
            default:
                break;
        }
    }
    return (
        <>
            {typeRender()}
        </>
    )
}