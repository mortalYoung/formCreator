import { AST, InputAttr, ButtonAttr, FormAttr, NoneAttr, InputNumberAttr, CheckBoxAttr, SwitchAttr, RadioAttr } from ".";

class ASTData implements AST {
    name: string;
    type: string;
    key: string;
    children: Array<ASTData>;
    required: boolean;
    attr: InputAttr | ButtonAttr | FormAttr | InputNumberAttr | CheckBoxAttr | SwitchAttr | RadioAttr | NoneAttr;
    constructor(data: AST) {
        this.name = data.name;
        this.type = data.type;
        this.key = data.key;
        // this.children = data.children;
        this.children = data.children.map((item) => {
            return new ASTData(item);
        })
        this.required = data.required;
        switch (data.type) {
            case 'Input': {
                const attr: InputAttr = {
                    size: 'middle'
                };
                this.attr = attr;
                break;
            }
            case 'Form': {
                const attr: FormAttr = {
                    labelAlign: 'right',
                    layout: 'horizontal'
                };
                this.attr = attr;
                break;
            }
            case 'Button': {
                const attr: ButtonAttr = {
                    size: 'middle',
                };
                this.attr = attr;
                break;
            }
            case 'InputNumber': {
                const attr: InputNumberAttr = {
                    autoFocus: false,
                    disabled: false,
                    max: Number.POSITIVE_INFINITY,
                    min: Number.NEGATIVE_INFINITY,
                    decimalSeparator: '.',
                    step: 1
                }
                this.attr = attr;
                break;
            }
            case 'CheckBox': {
                const attr: CheckBoxAttr = {
                    disabled: false,
                }
                this.attr = attr;
                break;
            }
            case 'Switch': {
                const attr: SwitchAttr = {
                    disabled: false,
                    autoFocus: false,
                    loading: false,
                    size: 'default',
                }
                this.attr = attr;
                break;
            }
            case 'Radio': {
                const attr: RadioAttr = {
                    disabled: false,
                    size: 'middle',
                    buttonStyle: 'outline'
                }
                this.attr = attr;
                break;
            }
            default:
                this.attr = {} as NoneAttr;
                break;
        }
    }
    stringify = () => {
        let result = '';
        for (const key of Object.keys(this.attr)) {
            if (this.attr.hasOwnProperty(key)) {
                const attr: { [key: string]: any } = this.attr;
                const value = attr[key];
                if (typeof value == 'undefined' || value == '') {
                    continue;
                } else {
                    if (typeof value == 'boolean') {
                        result += `${key} = { ${value.toString()} } `
                    } else {
                        result += `${key} = '${value}' `
                    }
                }
            }
        }
        return result
    }
}
export default ASTData;