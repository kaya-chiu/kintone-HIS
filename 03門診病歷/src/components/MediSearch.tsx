import React, { useState } from 'react'
import { Input, Select, Popover, Flex, InputNumber } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { searchDB } from '../api/searchDB'
import { KintoneTypes } from '../dts/types'
import drugCount from '../handlers/drugCount'

const { Option } = Select
const { Search } = Input

interface Props {
  priceCode: string;
  addToTable: (newRow: KintoneTypes.MediTable) => void;
}


// *** MAIN COMPONENT ***
const MediSearch: React.FC<Props> = ({ priceCode, addToTable }) => {
  const [searchType, setSearchType] = useState<string>('藥品代碼')
  const [open, setOpen] = useState<boolean>(false)
  const [content, setContent] = useState([<p>查無資料</p>])
  const [value, setValue] = useState('')
  const [day, setDay] = useState<number>(1)

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen)
  const handleSelectChange = (value: string) => setSearchType(value)

  // * 產生新的一列
  const addNewRow = (item: KintoneTypes.MDB) => {
    // 根據批價代碼決定單價
    let price: number | string = 0
    switch (priceCode) {
    case '1':
      price = item.價格1.value
      break
    case '2':
      price = item.價格2.value
      break
    case '3':
      price = item.價格3.value
      break
    default:
      price = item.價格1.value
      break
    }

    // 計算藥物總量 & 費用小計
    const count = drugCount(Number(item.預設劑量.value), item.預設頻率.value as KintoneTypes.Freq, day)
    const subtotal = (Number(price) * count).toString()

    // @ts-expect-error: 產生新一列的內容
    const newRow: KintoneTypes.MediTable = {
      value: {
        藥品代碼: { type: 'SINGLE_LINE_TEXT', value: item.藥品代碼.value, lookup: true },
        藥品單價: { type: 'NUMBER', value: price },
        成數_藥品: { type: 'NUMBER', value: '100' },
        劑量: { type: 'NUMBER', value: item.預設劑量.value },
        天數: { type: 'NUMBER', value: day.toString() },
        藥品名稱: { type: 'SINGLE_LINE_TEXT', value: item.藥品名稱.value },
        總量: { type: 'NUMBER', value: count.toString() },
        用藥備註: { type: 'SINGLE_LINE_TEXT', value: '' },
        頻率: { type: 'DROP_DOWN', value: item.預設頻率.value },
        藥費小計: { type: 'CALC', value: subtotal }
      }
    }

    // 將新列加入到表格中
    addToTable(newRow)
  }

  // * 搜尋功能
  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (info?.source !== 'input') return

    // @ts-expect-error: 從藥品管理取得項目資料
    const result: KintoneTypes.MDB[] = await searchDB('medicine', searchType, value)
    
    // 查無結果時的處理
    if (result.length === 0) {
      setContent([<p>查無資料</p>])
      setOpen(true)
    } 

    // 結果為一筆時，直接帶入表格
    else if (result.length === 1) {
      addNewRow(result[0])
    }

    // 結果大一筆時，列出選單
    else {
      const list = result.map((r, index) => (
        <a 
          key={index}
          onClick={() => {
            addNewRow(r)
            setOpen(false)
          }}
        >
          <p>【{r.藥品代碼.value}】 {r.藥品名稱.value}</p>
        </a>
      ))
      setContent(list)
      setOpen(true)
    }

    // 搜尋完成後清空 input
    setValue('')
  }
  
  // * 搜尋選項
  const selectBefore = (
    <Select defaultValue="藥品代碼" onChange={handleSelectChange}>
      <Option value="藥品代碼">藥品代碼</Option>
      <Option value="藥品名稱">藥品名稱</Option>
    </Select>
  )

  // * RETURN
  return (
    <>
      <Popover
        content={content}
        title="搜尋結果"
        trigger="contextMenu"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div style={{ maxWidth: 500 }} />
      </Popover>
      <Flex gap="small" align="center">
        <Search 
          addonBefore={selectBefore}
          placeholder={`請輸入${searchType}`}
          allowClear onSearch={onSearch}
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ maxWidth: 500, margin: '10px 0' }} 
        />
        <InputNumber 
          addonBefore="用藥天數"
          min={1} style={{ width: 150 }} controls={false}
          value={day}
          onChange={n => setDay(n || 1)}
        />
      </Flex>
    </>
  )
}

export default MediSearch