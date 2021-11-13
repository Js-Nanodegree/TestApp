/* eslint-disable id-length */
export const data = {
  itemRow() {
    return [
      {
        'desc': this.item?.repo?.name,
        'title': 'Repo',
      },
      {
        'desc': this.item?.type,
        'title': 'Make',
      },
      {
        'desc': this.item?.created_at,
        'title': 'Date',
      },
    ];
  },
  pushRepo() {
    return [
      {
        'desc': this.item?.payload?.push_id || '',
        'title': 'Push ID',
      },
      {
        'desc': this.item?.payload?.push_id,
        'title': 'Message',
      },
      {
        'commits': this.item?.payload?.commits?.map((x) => [
          {
            'desc': x?.author?.name,
            'title': 'Author',
          },
          {
            'desc': x?.author?.email,
            'title': 'Author Email',
          },
          {
            'desc': x?.author?.message,
            'title': 'Message',
          },
        ]),
      },
    ];
  },
};
