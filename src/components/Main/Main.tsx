import { useEffect, useState } from "react"
import Chart, { IDataItem } from "../ChartContainer/ChartContainer"

const arr = [
    {data: [{quantity: 0, date: 2}, {quantity: 20, date: 2}, {quantity: 1, date: 2}, {quantity: 50, date: 2}], color: "red"},
    {data: [{quantity: 0, date: 2}, {quantity: 50, date: 2}, {quantity: 5, date: 2}, {quantity: 3, date: 2},  {quantity: 42, date: 2},  {quantity: 4, date: 2}], color: "green"},
    {data: [{quantity: 0, date: 2}, {quantity: 31, date: 2}, {quantity: 20, date: 2}, {quantity: 41, date: 2},  {quantity: 10, date: 2},  {quantity: 4, date: 2}, {quantity: 4, date: 2}, {quantity: 4, date: 2}, {quantity: 4, date: 2}, {quantity: 4, date: 2}, {quantity: 4, date: 2}, {quantity: 10, date: 2}, {quantity: 30, date: 2}], color: "blue"}
]

export const Main = () => {
    const [data, setData] = useState<IDataItem[]>([])

    useEffect(() => {
        for(let i = 0; i< 2; i++){
            const generatedData:any[] = []

            for(let i = 0; i < 20; i++){
                generatedData.push({quantity: Math.round(Math.random() * i), date: "123"})
            }
            setData(prev =>  [...prev, {data: generatedData, color: "red"}])
        }
    },[])

    return data ? <Chart data={arr} xAxis={"date"} yAxis={"quantity"}/> : <div>Загрузка</div> 
}