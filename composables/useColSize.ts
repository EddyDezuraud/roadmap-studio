import { useState } from '#app'

export const useColSize = () => {
  const colSize = useState<number>('colSize', () => 0)

  const setColSize = (value: number) => {
    colSize.value = value
  }

  return {
    colSize,
    setColSize
  }
}