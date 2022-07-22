import React from "react";
import { findMinMax } from "../../utils/findMinMax";
import { CANVAS_HEIGHT, CANVAS_WIDTH, IDataItem } from "../ChartContainer/ChartContainer";
import config from "../../assets/config.json"

const STEP = 100
export const PADDING = 80


export interface IData {
    x: number,
    y: number, 
}

export interface IItem extends IData{
    data: any
    color: string
}

interface IAxises {
    x: string,
    y: string
}

interface IProps {
    data: IItem[][],
    axises: IAxises
}

interface ILineParams {
    ctx?:CanvasRenderingContext2D | null,
    color?:string 
}

interface ITextParams {
    color?: string,
}




class Chart extends React.Component<IProps> {
    canvas?: null | HTMLCanvasElement
    ctx?: CanvasRenderingContext2D | null
    drawLine({x, y}: IData , params?: ILineParams ){
        if(params?.ctx){
            params.ctx.lineJoin = 'round'
            params.ctx.strokeStyle = params.color || "#000000"
            params.ctx.lineWidth = 3
            params.ctx.lineTo(x, y)
            params.ctx.stroke()
        }
    }


    componentDidMount(){
        if(this.canvas){
            const ctx = this.canvas.getContext("2d")
            this.ctx = ctx
            if(ctx){
                this.drawGrid(ctx)
                this.drawGraphs()
                this.drawGraphText(ctx, this.props.data[0])
            }
        }
    }

    drawGraph(data:IItem[]){
        this.ctx?.beginPath()
        this.ctx?.moveTo(PADDING, CANVAS_HEIGHT - PADDING )
        data.forEach((coords) => {
            const neededCoods = { x: coords.x + PADDING , y: CANVAS_HEIGHT - coords.y -PADDING  }
            this.drawLine(neededCoods, { ctx: this.ctx, color: coords.color})
        })
        this.ctx?.closePath()
    }

    drawGrid(ctx:CanvasRenderingContext2D){
        const length = this.props.data.length
        const lines = Math.round((CANVAS_WIDTH + PADDING) * 2 / length)
        ctx.beginPath()
        ctx.strokeStyle="#f1ecec"
        for(let i = 0; i < lines ; i++){
            const coords = i * STEP
            ctx.lineWidth = 1
            ctx.moveTo(coords, 0)
            ctx.lineTo(coords, CANVAS_HEIGHT - PADDING)
            ctx.stroke()
        }
        ctx.closePath()
    }

    drawGraphs(){
        this.props.data.forEach(item => {
            this.drawGraph(item)
        })
    }

    drawGraphText(ctx:CanvasRenderingContext2D, data:IItem[], params?: ITextParams){
        if(params?.color){
            ctx.fillStyle = params.color
        }
        ctx.font = ctx.font.replace(/\d+px/, "30px")
        const yAxisValues = data.map(el => el.data[this.props.axises.y])
        yAxisValues.unshift(0)
        const {max, min} = findMinMax(yAxisValues)

        const delta = max - min
        const step = Math.round(delta / config.yAxisStep)
        const drawDelta = Math.round((CANVAS_HEIGHT) / config.yAxisStep)
        for(let i = config.yAxisStep + 1; i >= 0 ; i--){
            const yCoord = CANVAS_HEIGHT - PADDING - drawDelta * i
            const yValue = step * i
            this.drawText(ctx, {x: 10, y: yCoord}, yValue)
        }
    }
    drawText(ctx:CanvasRenderingContext2D, {x, y}:IData, text: string | number){
        ctx.fillText(text.toString(), x, y)
    }


    render(): React.ReactNode {
        return <canvas ref={ref => this.canvas = ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{width: "100%", border: "1px solid black", margin: "20px"}}></canvas>
    }
}

export default React.memo(Chart)