import React from 'react';

import {useNavigation} from '@react-navigation/native';

interface iLoadData {
  loadData: () => void
}

const useNavigate = ({loadData}: iLoadData) => {
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


export default useNavigate;
