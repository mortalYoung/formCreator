const global = {

}
export default global;
export interface ChildrenProps {
    children: React.ReactNode
}
export interface AST {
    name: string,
    type: string,
    key: string,
    children: Array<AST>,
    required: boolean,
    attr?: InputAttr | FormAttr | ButtonAttr | CheckBoxAttr | SwitchAttr | RadioAttr | NoneAttr,
}
export interface InputAttr {
    placeholder?: string,
    id?: string,
    maxLength?: number,
    type?: string,
    size: 'middle' | 'small' | 'large',
    allowClear?: boolean,
    disabled?: boolean
}
export interface FormAttr {
    hideRequiredMark?: boolean,
    colon?: boolean,
    labelAlign: 'right' | 'left',
    layout: 'horizontal' | 'vertical' | 'inline'
}
export interface ButtonAttr {
    disabled?: boolean,
    ghost?: boolean,
    href?: string,
    htmlType?: 'button' | 'reset' | 'submit',
    icon?: string,
    shape?: 'circle-outline' | 'circle' | 'round',
    type?: 'primary' | 'dashed' | 'danger' | 'link',
    size: 'middle' | 'small' | 'large',
    block?: boolean
}
export interface InputNumberAttr {
    autoFocus: boolean,
    defaultValue?: number,
    disabled: boolean,
    max: number,
    min: number,
    precision?: number,
    decimalSeparator: string,
    step: number | string,
    size?: 'large' | 'small',
}
export interface CheckBoxAttr {
    name?: string,
    disabled: boolean,
}
export interface SwitchAttr {
    autoFocus: boolean,
    disabled: boolean,
    loading: boolean,
    size: 'default' | 'small',
    className?: string
}
export interface RadioAttr {
    disabled: boolean,
    name?: string,
    size: 'large' | 'middle' | 'small',
    buttonStyle: 'outline' | 'solid'
}
export interface NoneAttr {

}