import React from 'react'
import { Button, ConfigProvider } from 'antd'
import { KintoneTypes } from '../dts/types'
import { getPatientBalance } from '../api/patient'
import { errToast, sucToast } from '../utils/myToast'
import { getRecord, isMobile, setRecord } from 'kchelper'

type Currency = '台幣' | '美金'
interface Props {
  event: KintoneTypes.E.Opd;
}

const style: React.CSSProperties = {
  margin: '32px 8px 0 8px'
}

const GetBalanceBtn: React.FC<Props> = ({ event }) => {
  const mobile = isMobile(event)
  const cn = event.record!.病歷號碼.value
  const currency = event.record!.批價幣別.value

  const onButtonClick = async () => {
    try {
      const balanceData = await getPatientBalance(cn)
      const balance = balanceData[currency as Currency] as string
      const updatedRecord: KintoneTypes.Opd = getRecord(mobile) 
      updatedRecord.預欠收.value = balance
      setRecord(updatedRecord, mobile)
      sucToast('已更新預欠收款', `預欠收：${balance} ${currency}`)
    } catch (err) {
      console.error(err)
      const errMsg = (err as Error).message || ''
      errToast('無法取得預欠收', errMsg)
    }
  }

  return (
    <ConfigProvider theme={{
      components: {
        Button: { colorPrimary: '#3498db', colorPrimaryHover: '#1d6fa5' }
      }
    }}>
      <Button
        type="primary" size="large" style={style}
        onClick={onButtonClick}
      >
      取得預欠收
      </Button>
    </ConfigProvider>
  )
}

export default GetBalanceBtn