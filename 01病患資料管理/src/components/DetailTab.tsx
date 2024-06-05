/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { KintoneTypes } from '../dts/types'
import changePage from '../handlers/changePage'

export type Pages = '基本資料' | '病歷首頁' | '檢驗報告'
interface Props {
  event: KintoneTypes.E.Patient;
}

const DetailTab: React.FC<Props> = ({ event }) => {
  const [page, setPage] = useState<Pages>('基本資料')

  const onChange = (e: RadioChangeEvent) => {
    const targetPage = e.target.value
    setPage(targetPage)
    changePage(event, targetPage)
  }

  useEffect(() => {
    changePage(event, page)
  }, [])

  return (
    <div>
      <Radio.Group value={page} onChange={onChange} style={{ margin: '0 8px' }} size="large">
        <Radio.Button value="基本資料">基本資料</Radio.Button>
        <Radio.Button value="病歷首頁">病歷首頁</Radio.Button>
        <Radio.Button value="檢驗報告">檢驗報告</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default DetailTab