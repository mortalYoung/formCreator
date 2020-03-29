import ASTData from "../global/factory";
interface IState {
    formAST: ASTData[]
}
export interface Action {
    type: string
    payload: ASTData[]
}
function getDefaultAST(): ASTData[] {
    const defaultValue: Array<ASTData> = [];
    return defaultValue
}
export const initialState = { formAST: getDefaultAST() };
export function ASTreducer(_state: IState, action: Action) {
    switch (action.type) {
        case 'update':
            return Object.assign({}, { formAST: action.payload })
        default:
            throw new Error();;
    }
}