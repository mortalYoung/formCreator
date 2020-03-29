import React from 'react';
import ASTData from '../global/factory';
import { Button, Form, Input, InputNumber, Checkbox, Switch, Radio } from 'antd';
import { InputAttr, ButtonAttr, InputNumberAttr, CheckBoxAttr, SwitchAttr, RadioAttr, FormAttr } from '../global';
import getTargetDOM from '../utils';
interface IProps {
    formTree: ASTData[],
    onAdd: (arg: ASTData) => void,
    onClick: (arg: string) => void
}
function RenderView(props: IProps) {
    const { formTree, onAdd, onClick } = props;
    const formAttr = formTree[0].attr as FormAttr || {};
    const children = formTree[0].children
    /**
     * 
     * @description-button添加按钮响应事件
     */
    const handleAdd = (typeName: string): void => {
        const elementData = new ASTData({
            name: typeName.toLowerCase(),
            type: typeName,
            key: `${typeName.toLowerCase()}-${new Date().valueOf()}`,
            required: false,
            children: []
        })
        onAdd(elementData);
    }
    /**
     * 
     * @description-设置属性响应事件
     */
    const handleClick = (e: any) => {
        e.stopPropagation();
        const targetDom = getTargetDOM(e);
        const key = targetDom.getAttribute('attr-key');
        onClick(key);
    }
    return (
        <>
            <div className="button-group" >
                <Button size="small" onClick={() => handleAdd('Input')}>添加Input</Button>
                <Button size="small" onClick={() => handleAdd('Button')}>添加Button</Button>
                <Button size="small" onClick={() => handleAdd('InputNumber')}>添加InputNumber</Button>
                <Button size="small" onClick={() => handleAdd('CheckBox')}>添加CheckBoxGroup</Button>
                <Button size="small" onClick={() => handleAdd('Switch')}>添加Swtich</Button>
                <Button size="small" onClick={() => handleAdd('Radio')}>添加Radio</Button>
            </div>
            <div onClick={handleClick} style={{ height: '100%' }} attr-key={formTree[0].key}>
                <Form {...formAttr}>
                    {children.map((child) => {
                        const { key, type, name, required } = child;
                        switch (type) {
                            case 'Input': {
                                const attr = child.attr as InputAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        label={name}
                                        attr-key={key}
                                        key={key}
                                        rules={[{ required: required }]}
                                    >
                                        <Input {...attr}></Input>
                                    </Form.Item>
                                )
                            }
                            case 'Button': {
                                const attr = child.attr as ButtonAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        key={key}
                                        attr-key={key}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={(e) => { e.preventDefault() }}
                                            {...attr}
                                        >
                                            {name}
                                        </Button>
                                    </Form.Item>
                                )
                            }
                            case 'InputNumber': {
                                const attr = child.attr as InputNumberAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        key={key}
                                        attr-key={key}
                                        label={name}
                                        rules={[{ required: required }]}
                                    >
                                        <InputNumber {...attr} />
                                    </Form.Item>
                                )
                            }
                            case 'CheckBox': {
                                const attr = child.attr as CheckBoxAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        key={key}
                                        attr-key={key}
                                        label={name}
                                        rules={[{ required: required }]}
                                    >
                                        <Checkbox.Group
                                            options={['fake', 'data']}
                                            {...attr}
                                        />
                                    </Form.Item>
                                )
                            }
                            case 'Switch': {
                                const attr = child.attr as SwitchAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        key={key}
                                        attr-key={key}
                                        label={name}
                                        rules={[{ required: required }]}
                                        valuePropName="checked"
                                    >
                                        <Switch {...attr} />
                                    </Form.Item>
                                )
                            }
                            case 'Radio': {
                                const attr = child.attr as RadioAttr || {};
                                return (
                                    <Form.Item
                                        className="target-dom"
                                        name={name}
                                        key={key}
                                        attr-key={key}
                                        label={name}
                                        rules={[{ required: required }]}
                                    >
                                        <Radio.Group
                                            options={['fake', 'data']}
                                            {...attr}
                                        />
                                    </Form.Item>
                                )
                            }
                            default:
                                break;
                        }
                    })}
                </Form>
            </div>
        </>
    )
}
export default RenderView;