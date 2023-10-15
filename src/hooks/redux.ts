import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppDispatch } from '@/store'

const useAppSelector = useSelector<RootState>
const useAppDispatch = () => useDispatch<AppDispatch>()

export { useAppDispatch, useAppSelector }

