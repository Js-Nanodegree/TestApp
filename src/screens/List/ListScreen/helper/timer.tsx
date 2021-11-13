export default {
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
