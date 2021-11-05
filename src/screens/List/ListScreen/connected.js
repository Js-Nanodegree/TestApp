import React from 'react';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from '../../../hooks/useNavigate'

import {Screen} from './Screen';


const LIST_AUTO_UPDATE_RATE = 60 * 100;
// Const LIST_USER_UPDATE_RATE = 15 * 100;

/**
 * Экран со списком ивентов (стили не вынес потому что их мало).
 * Ошибка загрузки данных не обработана. Можно обработать
 * используя подключенный @rematch/loading который вернет ошибку
 * @param props
 * @return {JSX.Element}
 * @constructor
 */


function ListScreen() {
  const isListLoading = useSelector(({loading}) => loading?.models?.list);
  const list = useSelector((root) => root?.list?.list);
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const ref = React.useRef(Date.now())

  const handleRefresh = () => {
    dispatch.list.loadList();
    ref.current = Date.now()
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

  // Const message = Date.now() - ref.current < LIST_USER_UPDATE_RATE


  return (
      <Screen
          handleRefresh={handleRefresh}
          isListLoading={isListLoading}
          list={list}
      />
  )
}


export default ListScreen;

