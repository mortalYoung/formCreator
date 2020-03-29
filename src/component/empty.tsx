import React from 'react';
import { Empty, Button } from 'antd';
import ASTData from '../global/factory';
interface IProps {
    onInitial: (arg: ASTData) => void
}
function EmptyWrapped(props: IProps) {
    /**
     * @description-初始化form类
     */
    const handInitial = (): void => {
        let formWrapped = new ASTData({
            name: 'form',
            type: 'Form',
            key: 'form',
            required: false,
            children: []
        });
        props.onInitial(formWrapped);
    }
    return (
        <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
                height: 160,
            }}
            description={
                <span>
                    无数据
        </span>
            }
        >
            <Button type="primary" onClick={handInitial}>添加Form包裹层</Button>
        </Empty>
    )
}
export default EmptyWrapped;