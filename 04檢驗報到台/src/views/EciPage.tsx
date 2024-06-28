import ExamTable from '../components/ExamTable'
import { KintoneTypes } from '../dts/types'

interface Props {
  event: KintoneTypes.E.ECI;
}

const EciPage: React.FC<Props> = ({ event }) => {

  return (
    <div style={{ padding: '20px' }}>
      <ExamTable event={event} />
    </div>
  )
}

export default EciPage