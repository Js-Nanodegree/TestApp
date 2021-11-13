/* eslint-disable new-cap */
/* eslint-disable lines-around-comment */
import React from 'react';

import {useIsFocused} from '@react-navigation/native';
import API from 'src/api';
import useNavigate from 'src/hooks/useNavigate';
import {iData} from 'src/screens/List/ListItem';

import initial from './helper/initial';
import StateStatus from './helper/StateStatus';
import timer from './helper/timer';
import {Screen} from './Screen';

interface iState {
  time: number;
  message: string;
  error: boolean;
  loading: boolean;
  data: iData[];
}

export interface iList {
  handleRefresh: () => void;
  list: iData;
  time: number;
  error: boolean | string;
  loading: boolean;
}

function ListScreen() {
  const isFocused = useIsFocused();
  const [state, setState] = React.useState<iState>(initial);
  const ref = React.useRef<any>(null);

  const handleRefresh = () => {
    /**
     * Функция загрузки данных по Api по ручному обновлению
     */
    if (timer.RC_DIFF(state?.time)) {
      setState((prev: iState) => ({
        ...prev,
        ...StateStatus.timeOut,
      }));
      return;
    }

    setState((prev: iState) => ({
      ...prev,
      ...StateStatus.err,
    }));

    ref.current = setTimeout(() => {
      onLoad();
    }, timer.RC_TIMER(state?.time));
  };

  const onLoad = async () => {
    /**
     * Компонент загрузки данных по Api
     */
    try {
      setState((prev) => {
        ref.current = null;
        return {
          ...prev,
          ...StateStatus.diff,
        };
      });

      const response = await API.git_events(50);

      setState((prev: iState) => {
        if (prev?.data === response?.data) {
          return {
            ...prev,
            ...StateStatus['conn'],
          };
        }
        return {
          ...response,
          ...StateStatus['conn'],
        };
      });
    } catch (error: any) {
      setState((prev: iState) => ({
        ...prev,
        ...StateStatus.err,
        'error': error.toString(),
      }));
    }
  };

  /**
   * При маунте компонента грузим список и создаем интервал
   * который с LIST_AUTO_UPDATE_RATE обновляет список
   */

  useNavigate({
    'loadData': onLoad,
  });

  React.useLayoutEffect(() => {
    const timerUpdateData = setInterval(() => {
      if (isFocused) {
        onLoad();
      }
    }, timer.LIST_AUTO_UPDATE_RATE);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
      clearInterval(timerUpdateData);
    };
  }, [isFocused]);

  /**
   * Обновляем руками список если с последнего обновления прошло LIST_USER_UPDATE_RATE мс
   */

  return (<Screen
    error={state?.error}
    handleRefresh={handleRefresh}
    list={state?.data}
    loading={state?.loading}
    message={state?.message}
    time={state?.time}
  />
  );
}


export default ListScreen;
