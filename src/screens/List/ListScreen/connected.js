/* eslint-disable consistent-return */
import React from 'react';

import {useIsFocused} from '@react-navigation/native';

import API from '../../../api'
import {useNavigate} from '../../../hooks/useNavigate'

import {Screen} from './Screen';


const LIST_AUTO_UPDATE_RATE = 60 * 1000;
const LIST_USER_UPDATE_RATE = 15 * 1000;

/**
 * Экран со списком ивентов (стили не вынес потому что их мало).
 * Ошибка загрузки данных не обработана. Можно обработать
 * используя подключенный @rematch/loading который вернет ошибку
 * @param props
 * @return {JSX.Element}
 * @constructor
 */


function ListScreen() {
  const isFocused = useIsFocused()
  const [state, setState] = React.useState({})


  const updateByTimeout = React.useCallback(() => {
    const rtime = state?.time + LIST_USER_UPDATE_RATE - Date.now()
    setTimeout(() => handleRefresh(), rtime)
  }, [Date.now()])

  const handleRefresh = async () => {
    setState((prev) => ({
      'error': false,
      'loading': true,
      ...prev,
    }))
    if (state?.time + LIST_USER_UPDATE_RATE > Date.now()) {
      setState((prev) => ({
        ...prev,
        'error': 'TimeNotOut',
        'loading': true,
      }))

      return updateByTimeout()
    }
    try {
      const data = await API.git_events(50)
      setState((prev) => {
        if (prev?.data === data?.data) {
          return prev
        }
        return {
          'error': false,
          'loading': true,
          'time': Date.now(),
          ...data,
        }
      })
    } catch (error) {
      setState((prev) => ({
        'loading': true,
        'time': Date.now(),
        ...prev,
        'error': error.toString(),
      }))
    }
  }


  useNavigate({
    'loadData': handleRefresh,
  })

  /**
   * При маунте компонента грузим список и создаем интервал который с LIST_AUTO_UPDATE_RATE обновляет список
   */

  React.useLayoutEffect(() => {
    const updater = setInterval(() => {
      if (isFocused) {
        handleRefresh()
      }
    }, LIST_AUTO_UPDATE_RATE);

    return () => clearInterval(updater);
  }, [isFocused])

  /**
   * Обновляем руками список если с последнего обновления прошло LIST_USER_UPDATE_RATE мс
   */

  return (
      <Screen
          error={state?.error}
          handleRefresh={handleRefresh}
          list={state?.data}
          loading={state?.loading}
          time={state?.time + LIST_USER_UPDATE_RATE < Date.now()}
      />
  )
}


export default ListScreen;

