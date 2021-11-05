import React from 'react'

import {useNavigation} from '@react-navigation/native';

const useNavigate = ({loadData}) => {
    const navigation = useNavigation();

    React.useEffect(() => {
      loadData();
    }, []);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadData();
      });

      return unsubscribe;
    }, [navigation]);
  };

  React.memo(useNavigate)

  export {useNavigate};
