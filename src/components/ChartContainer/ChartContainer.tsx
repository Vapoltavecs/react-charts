import React, {  ReactNode } from "react";
import { findMinMax } from "../../utils/findMinMax";
import Chart, { IData, IItem, PADDING } from "../chart/Chart";
import cl from "./ChartContainer.module.sass"

//надо передавать матрицу для правильной обработки данных

export const CANVAS_HEIGHT = 1200
export const CANVAS_WIDTH = 2400

type State =  {
    data: IItem[][]
}

export interface IDataItem {
    color: string, 
    data: any[]
}

type Props = {
    yAxis: string,
    xAxis: string,
    data: IDataItem[]
}

class ChartContainer extends React.Component<Props> {
    state : State = { data: [] }

    componentDidMount(){
        if(this.props.data){
            const data = this.props.data.map(el => {
                const yAxisData = el.data.map(data => data[this.props.yAxis])
                const {min, max} = findMinMax(yAxisData)
                const delta = max - min
                
                const xStep = Math.round((CANVAS_WIDTH + 130) / el.data.length)
                const yStep = Math.round((CANVAS_HEIGHT - (PADDING * 2)) / delta) 
                return el.data.map((data, i) => {
                    return {x: xStep * i, y: yStep * data[this.props.yAxis], data, color: el.color }
                })
            })
            this.setState({data})
        }
    }
        

    render(): React.ReactNode {
        const data = this.state.data
        if(data.length === 0){
            return "Данные еще готовятся..."
        }else{
            return <div className={cl["container"]}><Chart data={data} axises={{x: this.props.xAxis, y: this.props.yAxis}} /></div>
        }
    }
}

export default React.memo(ChartContainer)