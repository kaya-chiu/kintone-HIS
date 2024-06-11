import React, { ReactNode, createContext, useContext } from 'react'
import { KintoneTypes } from '../dts/types'

interface EventContextType {
  event: KintoneTypes.E.Appo;
}

interface Props {
  event: KintoneTypes.E.Appo;
  children: ReactNode;
}

const EventContext = createContext<EventContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useEventContext must be used within a EventProvider')
  }
  return context
}

export const EventProvider: React.FC<Props> = ({ event, children }) => {
  return <EventContext.Provider value={{ event }}>{children}</EventContext.Provider>
}
