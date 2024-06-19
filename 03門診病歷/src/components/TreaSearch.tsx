import React, { useState } from 'react'
import { Input, Select, Popover } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { searchDB } from '../api/searchDB'
import { KintoneTypes } from '../dts/types'

const { Option } = Select
const { Search } = Input

interface Props {
  priceCode: string;
  addToTable: (newRow: KintoneTypes.TreaTable) => void;
}

// *** MAIN COMPONENT ***
const TreaSearch: React.FC<Props> = ({ priceCode, addToTable }) => {
  const [searchType, setSearchType] = useState<string>('處置代碼')
  const [open, setOpen] = useState<boolean>(false)
  const [content, setContent] = useState([<p>查無資料</p>])
  const [value, setValue] = useState('')

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen)
  const handleSelectChange = (value: string) => setSearchType(value)

  // * 產生新的一列
  const addNewRow = (item: KintoneTypes.TDB) => {
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

    // @ts-expect-error: 產生新一列的內容
    const newRow: KintoneTypes.TreaTable = {
      value: {
        處置備註: { type: 'SINGLE_LINE_TEXT', value: '' },
        成數_處置: { type: 'NUMBER', value: '100' },
        處置名稱: { type: 'SINGLE_LINE_TEXT', value: item.處置名稱.value },
        處置代碼: { type: 'SINGLE_LINE_TEXT', value: item.處置代碼.value, lookup: true },
        數量_處置: { type: 'NUMBER', value: '1' },
        處置單價: { type: 'NUMBER', value: price },
        處置費小計: { type: 'CALC', value: price },
        績效: { type: 'USER_SELECT', value: [] }
      }
    }

    // 將新列加入到表格中
    addToTable(newRow)
  }

  // * 搜尋功能
  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (info?.source !== 'input') return

    // @ts-expect-error: 從處置管理取得項目資料
    const result: KintoneTypes.TDB[] = await searchDB('treatment', searchType, value)
    
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
          <p>【{r.處置代碼.value}】 {r.處置名稱.value}</p>
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
    <Select defaultValue="處置代碼" onChange={handleSelectChange}>
      <Option value="處置代碼">處置代碼</Option>
      <Option value="處置名稱">處置名稱</Option>
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
      <Search 
        addonBefore={selectBefore}
        placeholder={`請輸入${searchType}`}
        allowClear onSearch={onSearch}
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ maxWidth: 500, margin: '10px 0' }} 
      />
    </>
  )
}

export default TreaSearch