import { SVGProps } from 'react';

export const AddressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <circle cx={10} cy={10} r={10} fill="#fff" />
    <path
      fill="#CBB666"
      d="m8.091 2 2.027 2.027-2.027 2.028-2.027-2.028zM4.032 6.062l2.027 2.027-2.027 2.027L2.005 8.09z"
    />
    <path
      fill="#CBB666"
      d="M4.032 9.884 6.06 11.91l-2.028 2.027-2.027-2.027zM15.974 6.062 18 8.089l-2.027 2.027-2.027-2.027z"
    />
    <path
      fill="#CBB666"
      d="m15.974 9.884 2.028 2.027-2.028 2.028-2.027-2.028zM11.913 2l2.027 2.027-2.027 2.027-2.027-2.027zM8.09 13.946l2.028 2.027-2.027 2.028-2.027-2.028zM10.003 7.974 12.03 10l-2.027 2.027-2.028-2.027z"
    />
    <path fill="#CBB666" d="m11.913 13.946 2.027 2.027L11.913 18l-2.027-2.027z" />
    <circle cx={15.976} cy={4.15} r={1.195} fill="#E5D9B2" />
    <circle cx={4.027} cy={4.15} r={1.195} fill="#E5D9B2" />
    <circle cx={4.027} cy={16.096} r={1.195} fill="#E5D9B2" />
    <circle cx={15.976} cy={16.096} r={1.195} fill="#E5D9B2" />
  </svg>
);
