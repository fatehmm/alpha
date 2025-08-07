// const accessControl = {

// }

type Permission = {
  key: string;
  value: string;
  description?: string;
};

export const permissions: Permission[] = [
  {
    key: 'organization',
    value: 'create',
  },
];
