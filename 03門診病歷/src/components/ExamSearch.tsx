/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Input, Select, Popover } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { searchDB } from '../api/searchDB'
import { KintoneTypes } from '../dts/types'
import { getDateString } from 'kchelper'

interface Props {
  priceCode: string;
  addToTable: any;
}

const { Option } = Select
const { Search } = Input

const ExamSearch: React.FC<Props> = ({ priceCode, addToTable }) => {
  const [searchType, setSearchType] = useState<string>('檢驗代碼')
  const [open, setOpen] = useState<boolean>(false)
  const [content, setContent] = useState([<p>查無資料</p>])
  const [value, setValue] = useState('')

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const handleSelectChange = (value: string) => {
    setSearchType(value)
  }

  const addNewRow = (item: KintoneTypes.EDB) => {
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
    // 建立新的列
    const newRow: KintoneTypes.ExamTable = {
      value: {
        檢驗單價: { type: 'NUMBER', value: price },
        分管組合: { type: 'SINGLE_LINE_TEXT', value: item.分管組合名稱.value },
        // @ts-expect-error: 帶入後要執行 lookup
        檢驗代碼: { type: 'SINGLE_LINE_TEXT' ,value: item.檢驗代碼.value, lookup: true },
        檢驗名稱: { type: 'SINGLE_LINE_TEXT' ,value: item.檢驗名稱.value },
        檢驗備註: {type: 'SINGLE_LINE_TEXT', value: ''},
        檢驗單號: {type: 'SINGLE_LINE_TEXT', value: ''},
        成數_檢驗: {type: 'NUMBER', value: '100'},
        檢驗日期: {type: 'DATE', value: getDateString('yyyy-mm-dd')},
        檢驗單狀態: {type: 'DROP_DOWN', value: '預開'},
        檢驗費小計: {type: 'CALC', value: price }
      }
    }
    addToTable(newRow)
  }

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (info?.source !== 'input') return

    // @ts-expect-error: 從檢驗資料管理取得項目資料
    const result: KintoneTypes.EDB[] = await searchDB('examination', searchType, value)
    
    if (result.length === 0) {
      setContent([<p>查無資料</p>])
      setOpen(true)
    } 
    else if (result.length === 1) {
      addNewRow(result[0])
    }
    else {
      const list = result.map((r, index) => (
        <a 
          key={index}
          onClick={() => {
            addNewRow(r)
            setOpen(false)
          }}
        >
          <p>【{r.檢驗代碼.value}】 {r.檢驗名稱.value}</p>
        </a>
      ))
      setContent(list)
      setOpen(true)
    }
    setValue('')
  }
  
  const selectBefore = (
    <Select defaultValue="檢驗代碼" onChange={handleSelectChange}>
      <Option value="檢驗代碼">檢驗代碼</Option>
      <Option value="檢驗名稱">檢驗名稱</Option>
    </Select>
  )

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

export default ExamSearch