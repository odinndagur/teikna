import { google } from 'googleapis'
import { useEffect, useState } from 'react'
// 08a2971537164a34878e5f47a533d454

export function NotionTest() {
    const [data, setData] = useState()
    useEffect(() => {
        const init = async () => {
            const A = 1
            const Z = 999
            const range = `Shows!A${A}:Z${Z}`
            const sheetId = '178hiGb8CV0VNdupQZ_Btfmxns4FKjR0zfyi-dweOwFs'
            const apiKey = 'AIzaSyDsMy-CYpbmGpoeLuhJWBQiPwN0NNK2v1I'
            fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log({ data })
                    const [header, ...rows] = data.values
                    console.log({ header, rows })
                    const shows = rows.map((row) => {
                        return Object.fromEntries(
                            row.map((val, idx) => {
                                return [header[idx], val]
                            })
                        )
                    })
                    console.log({ shows })
                    setData(shows)
                })
        }
        init()
    }, [])
    return (
        <div>
            <div>{JSON.stringify(data)}</div>

            <table>
                <thead>
                    {Object.keys(data[0]).map((key) => {
                        return <th>{key}</th>
                    })}
                </thead>
                <tbody>
                    {data!.map((row) => {
                        return (
                            <tr>
                                {Object.entries((key, value) => (
                                    <td>{value}</td>
                                ))}
                                {row.name}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

// https://sheets.googleapis.com/v4/spreadsheets/178hiGb8CV0VNdupQZ_Btfmxns4FKjR0zfyi-dweOwFs/values/Sheet1!A1:C3?key=AIzaSyDsMy-CYpbmGpoeLuhJWBQiPwN0NNK2v1I
