import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, setUser } from '../feature/user/userSlice'
import { RootState } from '../store'
import { WLUserType } from '../types/user'

export default function useUser() {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const dispatch = useDispatch()

  const onSetUser = (newUser: WLUserType) => dispatch(setUser(newUser))
  const onRemoveUser = () => {
    message.success(`고생하셨어요. ${user?.name}님!`)
    dispatch(removeUser())
  }
  return {
    user,
    onSetUser,
    onRemoveUser
  }
}
