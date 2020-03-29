import React, { useReducer } from "react"
import Layout from '../component/layout';
import Viewer from '../component/viewer';
import Coder from '../component/coder';
import GridContainer from '../component/gridContainer';
import { initialState, ASTreducer } from "../store";

export default () => {
    const [state, ASTdispatch] = useReducer(ASTreducer, initialState);
    return (
        <Layout>
            <GridContainer>
                <Viewer dispatch={ASTdispatch} formAST={state.formAST}></Viewer>
                <Coder formAST={state.formAST}></Coder>
            </GridContainer>
        </Layout>
    )
}
