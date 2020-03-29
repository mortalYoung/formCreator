import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useStaticQuery, graphql } from 'gatsby';
import beautify from 'js-beautify';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/jsx/jsx.js'
import ASTData from '../global/factory';
interface IProps {
    formAST: ASTData[]
}
/**
 * @description 初始化 form 表单的 Code
 */
function getInitCoder(): { value: string, importFlag: RegExp, codeFlag: RegExp, keyWord: string[] } {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        importFlag,
                        codeFlag
                    }
                }
            }
        `
    )
    return {
        value: `import React from 'react';${data.site.siteMetadata.importFlag};export default ({ props }) => {return (<React.Fragment>${data.site.siteMetadata.codeFlag}</React.Fragment>)}`,
        importFlag: new RegExp(data.site.siteMetadata.importFlag),
        codeFlag: new RegExp(data.site.siteMetadata.codeFlag),
        keyWord: [data.site.siteMetadata.importFlag, data.site.siteMetadata.codeFlag]
    }
}
const beautifyConfig: JsBeautifyOptions = {
    "indent_size": 4,
    "indent_char": " ",
    "max_preserve_newlines": 5,
    "preserve_newlines": true,
    "keep_array_indentation": false,
    "break_chained_methods": false,
    "brace_style": "collapse",
    "space_before_conditional": true,
    "unescape_strings": false,
    "jslint_happy": false,
    "end_with_newline": false,
    "wrap_line_length": 0,
    "e4x": true,
}
/**
 * 
 * @description 添加 formItem 的 Code 
 */
const addFormItem = (result: string, codeFlag: RegExp, replaceText: string): string => {
    result = result.replace(
        codeFlag,
        replaceText
    )
    return result
}
/**
 * @description 添加 Import 的 Code
 */
const addImport = (result: string, importFlag: RegExp, replaceText: string, keyWord: string): string => {
    if (
        result
            .substring(
                result.indexOf(';'),
                result.indexOf(';', result.indexOf(';') + 1)
            ) // 对 result 进行分号切割，获取第二行的子字符串：
            .indexOf(keyWord) == -1 // 判断子字符串中是否已经 import 过 keyWord
    ) {
        result = result.replace(importFlag, replaceText);
    }
    return result;
}
/**
 * 
 * @description 隐藏输出code中的关键字 
 */
const invisibleKeyWord = (res: string, codeFlag: RegExp, importFlag: RegExp): string => {
    return res.replace(codeFlag, '').replace(importFlag, '');
}
export default (props: IProps) => {
    const { formAST } = props;
    let { value, importFlag, codeFlag, keyWord } = getInitCoder();

    /**
     * 
     * @description 根据父级传入的 formData 数据进行渲染
     */
    const formatter = (formData: ASTData[]): string => {
        let result = value;
        if (!formData.length) return invisibleKeyWord(result, codeFlag, importFlag);
        if (formData[0].type == 'Form') {
            result = value.replace(
                codeFlag,
                `
                <Form ${formData[0].stringify()}>${keyWord[1]}</Form>`
            ).replace(
                importFlag,
                `import { Form, ${keyWord[0]} } from 'antd'`
            )
            if (formData[0].children.length > 0) {
                let i = 0;
                let child = formData[0].children;
                while (child[i]) {
                    switch (child[i].type) {
                        case 'Input': {
                            const replaceText = `
                            <Form.Item>
                                {getFieldDecorator('${child[i].name}', {
                                 rules: [{ required: ${child[i].required} }],
                                })(
                                    <Input ${child[i].stringify()} />,
                                )}
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `Input, ${keyWord[0]}`, 'Input')
                            i++;
                            break;
                        }
                        case 'Button': {
                            const replaceText = `
                            <Form.Item>
                                <Button  ${child[i].stringify()}>${child[i].name}</Button>
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `Button, ${keyWord[0]}`, 'Button')
                            i++;
                            break;
                        }
                        case 'InputNumber': {
                            const replaceText = `
                            <Form.Item>
                                {getFieldDecorator('${child[i].name}', {
                                 rules: [{ required: ${child[i].required} }],
                                })(
                                    <InputNumber ${child[i].stringify()} />,
                                )}
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `InputNumber, ${keyWord[0]}`, 'InputNumber')
                            i++;
                            break;
                        }
                        case 'CheckBox': {
                            const replaceText = `
                            <Form.Item>
                                {getFieldDecorator('${child[i].name}', {
                                 rules: [{ required: ${child[i].required} }],
                                })(
                                    <CheckBox options={['fake','data']} ${child[i].stringify()} />,
                                )}
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `CheckBox, ${keyWord[0]}`, 'CheckBox')
                            i++;
                            break;
                        }
                        case 'Switch': {
                            const replaceText = `
                            <Form.Item>
                                {getFieldDecorator('${child[i].name}', {
                                 rules: [{ required: ${child[i].required} }],
                                })(
                                    <Switch ${child[i].stringify()} />
                                )}
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `Switch, ${keyWord[0]}`, 'Switch')
                            i++;
                            break;
                        }
                        case 'Radio': {
                            const replaceText = `
                            <Form.Item>
                                {getFieldDecorator('${child[i].name}', {
                                 rules: [{ required: ${child[i].required} }],
                                })(
                                    <Radio.Group options={['fake', 'data']} ${child[i].stringify()} />
                                )}
                            </Form.Item>${keyWord[1]}
                            `;
                            result = addFormItem(result, codeFlag, replaceText);
                            result = addImport(result, importFlag, `Radio, ${keyWord[0]}`, 'Radio')
                            i++;
                            break;
                        }
                        default:
                            i++;
                            break;
                    }
                }
            }
        }
        value = result; // 对 result 进行缓存
        return invisibleKeyWord(result, codeFlag, importFlag);
    }
    return (
        <div>
            <CodeMirror
                value={beautify.js(formatter(formAST), beautifyConfig)}
                options={{
                    tabSize: 4,
                    mode: 'jsx',
                    theme: 'material',
                    lineNumbers: true,
                    readOnly: true
                }}
                onBeforeChange={() => { }}
                onChange={() => { }}
            />
        </div>
    )
}