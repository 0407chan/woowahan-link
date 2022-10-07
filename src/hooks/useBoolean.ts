import { useState } from 'react'

type SetTrue = () => void
type SetFalse = () => void

const useBoolean = (defaultValue = false): [boolean, SetTrue, SetFalse] => {
  const [value, setValue] = useState(defaultValue)

  return [value, () => setValue(true), () => setValue(false)]
}

export default useBoolean
