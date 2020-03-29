import React, { useState } from 'react';
import { Drawer } from 'antd';
import Setting from './setting';
import Empty from './empty';
import RenderView from './renderView';
import '../styles/viewer.scss'
import { Action } from '../store';
import ASTData from '../global/factory';
import { AST } from '../global';
function getVoidAST(): AST {
    return new ASTData({ name: '', type: '', key: '', required: false, children: [] })
}
interface IProps {
    dispatch: React.Dispatch<Action>,
    formAST: ASTData[]
}
export default (props: IProps) => {
    const { dispatch, formAST } = props;
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [drawerData, setDrawerData] = useState(getVoidAST);
    /**
     * 
     * @description-更新data操作
     */
    const updateDispatch = (data: ASTData[]) => {
        dispatch({ type: 'update', payload: data })
    }
    /**
     * 
     * @description-初始化数据
     */
    const handleIniial = (initialData: ASTData): void => {
        updateDispatch([initialData])
    }
    /**
     * 
     * @description-添加form组件
     */
    const handleAdd = (arg: ASTData): void => {
        const copy = formAST.concat();
        copy[0].children.push(arg);
        updateDispatch(copy)
    }
    /**
     * 
     * @description-设置form组件属性
     */
    const handleClick = (key: string) => {
        if (key === 'form') {
            setDrawerData(formAST[0]);
            setDrawerVisible(true);
        } else {
            const obj = formAST[0].children.find((value) => value.key == key);
            if (!obj) {
                throw new Error('find error!');
            } else {
                setDrawerData(obj);
                setDrawerVisible(true);
            }
        }
    }
    /**
     * 
     * @description-保存setting操作
     */
    const handleSaveSetting = (args: any) => {
        const { labelName, required, ...attr } = args;
        const protoData = formAST.concat();
        if (drawerData.key === 'form') {
            protoData[0].required = required;
            protoData[0].name = labelName;
            protoData[0].attr = { ...attr };
            updateDispatch(protoData)
        } else {
            const o = protoData[0].children.find(v => v.key === drawerData.key);
            if (o) {
                o.required = required;
                o.name = labelName;
                o.attr = { ...attr };
                updateDispatch(protoData)
            } else {
                throw new Error('find error!');
            }

        }
        setDrawerVisible(false);
        setDrawerData(getVoidAST);
    }
    return (
        <div className="viewer">
            {
                formAST.length == 0 ?
                    (<Empty onInitial={handleIniial} />) :
                    <RenderView onAdd={handleAdd} onClick={handleClick} formTree={formAST} />
            }
            <Drawer
                width={512}
                title={`${drawerData.name}setting`}
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Setting data={drawerData} handleSubmit={handleSaveSetting} />
            </Drawer>
        </div>
    )
}