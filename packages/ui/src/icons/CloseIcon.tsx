import { SVGProps } from 'react';

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_b_4654_46626)">
      <rect width="30" height="30" rx="15" fill="#F5F5F7" />
      <path
        d="M10.0493 19.1811C9.73828 19.4921 9.73193 20.0444 10.0557 20.3681C10.3857 20.6918 10.938 20.6855 11.2427 20.3808L15.0005 16.623L18.752 20.3745C19.0693 20.6918 19.6152 20.6918 19.939 20.3681C20.2627 20.038 20.2627 19.4985 19.9453 19.1811L16.1938 15.4296L19.9453 11.6718C20.2627 11.3544 20.269 10.8085 19.939 10.4848C19.6152 10.1611 19.0693 10.1611 18.752 10.4785L15.0005 14.2299L11.2427 10.4785C10.938 10.1674 10.3794 10.1547 10.0557 10.4848C9.73193 10.8085 9.73828 11.3671 10.0493 11.6718L13.8008 15.4296L10.0493 19.1811Z"
        fill="#6E6E79"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_4654_46626"
        x="-54.3656"
        y="-54.3656"
        width="138.731"
        height="138.731"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4654_46626" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4654_46626" result="shape" />
      </filter>
    </defs>
  </svg>
);
