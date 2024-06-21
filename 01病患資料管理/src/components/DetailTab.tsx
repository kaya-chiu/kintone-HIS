/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { RadioChangeEvent, ConfigProvider } from 'antd'
import { Radio } from 'antd'
import { KintoneTypes } from '../dts/types'
import changePage from '../handlers/changePage'

export type Pages = '基本資料' | '過往病史' | '門診病歷' | '檢驗報告' | '批價記錄'
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
    <ConfigProvider theme={{
      components: {
        Radio: {
          colorPrimary: '#3498db'
        }
      }
    }}>
      <Radio.Group 
        value={page} onChange={onChange} style={{ margin: '0 8px' }} size="large">
        <Radio.Button value="基本資料">基本資料</Radio.Button>
        <Radio.Button value="過往病史">過往病史</Radio.Button>
        <Radio.Button value="門診病歷">門診病歷</Radio.Button>
        <Radio.Button value="檢驗報告">檢驗報告</Radio.Button>
        <Radio.Button value="批價記錄">批價記錄</Radio.Button>
      </Radio.Group>
    </ConfigProvider>
  )
}

export default DetailTab