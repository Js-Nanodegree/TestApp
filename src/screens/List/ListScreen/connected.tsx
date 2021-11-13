/* eslint-disable new-cap */
/* eslint-disable lines-around-comment */
import React from 'react';

import {useIsFocused} from '@react-navigation/native';
import API from 'src/api';
import useNavigate from 'src/hooks/useNavigate';
import {iData} from 'src/screens/List/ListItem';

import {Screen} from './Screen';


const LIST_AUTO_UPDATE_RATE = 60 * 1000;
export const LIST_USER_UPDATE_RATE = 15 * 1000;

const StateStatus = {
  'conn': {
    'error': false,
    'loading': false,
    'message': '',
    'time': Date.now(),
  },
  'diff': {
    'error': false,
    'loading': true,
    'message': '',
    'time': Date.now(),

  },
  'err': {
    'error': true,
    'loading': true,
    'message': 'Wait update data',
    'time': Date.now(),
  },
  'timeOut': {
    'error': true,
    'loading': false,
    'message': 'TimeNotOut',
    'time': Date.now(),
  },
};

const timer = {
  'LIST_AUTO_UPDATE_RATE': 60 * 1000,
  'LIST_USER_UPDATE_RATE': 15 * 1000,
  RC_DIFF(time: any) {
    let timer = 0;
    if (this.LIST_USER_UPDATE_RATE) {
      timer = this.LIST_USER_UPDATE_RATE;
    }
    return time + timer > Date.now();
  },
  RC_TIMER(time: any) {
    let timer = 0;
    if (this.LIST_USER_UPDATE_RATE) {
      timer = this.LIST_USER_UPDATE_RATE;
    }
    return time + timer - Date.now();
  },
};

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

const initial={
  'data': [],
  'error': false,
  'loading': false,
  'message': '',
  'time': Date.now(),
};

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
    }, LIST_AUTO_UPDATE_RATE);

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
