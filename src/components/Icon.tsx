import type { SVGProps } from 'react';

export type IconName =
  | 'home'
  | 'calendar'
  | 'stethoscope'
  | 'apple'
  | 'alert'
  | 'baby'
  | 'bag'
  | 'heart'
  | 'user'
  | 'drop'
  | 'scale'
  | 'activity'
  | 'clock'
  | 'plus'
  | 'trash'
  | 'check'
  | 'download'
  | 'globe'
  | 'chevronLeft'
  | 'chevronRight'
  | 'sparkles'
  | 'phone'
  | 'info'
  | 'book'
  | 'shield'
  | 'play'
  | 'stop'
  | 'reset'
  | 'close'
  | 'hospital'
  | 'bleeding'
  | 'headache'
  | 'vision'
  | 'pain'
  | 'fluid'
  | 'movement'
  | 'convulsion'
  | 'breastfeeding'
  | 'leaf';

const paths: Record<IconName, string> = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6',
  calendar: 'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10ZM8 3v4M16 3v4M4 10.5h16',
  stethoscope:
    'M6 4v5a4 4 0 0 0 8 0V4M6 4H4.5M14 4h1.5M10 13v3a4 4 0 0 0 8 0v-1.5M18 12.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Z',
  apple: 'M12 8.5c-1.4-2-3.4-2.6-5-1.7-2 1.1-2.6 4-1.4 6.6 1 2.2 2.6 4.1 4 4.1 1 0 1.5-.5 2.4-.5s1.4.5 2.4.5c1.4 0 3-1.9 4-4.1 1.2-2.6.6-5.5-1.4-6.6-1.6-.9-3.6-.3-5 1.7ZM12 8.5V5.5M12 5.5c1.6 0 2.5-1 2.5-2.5',
  alert: 'M12 4.5 21 20H3L12 4.5ZM12 10v4.5M12 17.2v.1',
  baby: 'M9 4.5a3 3 0 1 1 6 0M12 7.5v3M7.5 10.5h9l-1 4.5H8.5l-1-4.5ZM9.5 15v4.5M14.5 15v4.5M7 19.5h10',
  bag: 'M5 8.5h14l-1 11H6l-1-11ZM9 8.5V6a3 3 0 0 1 6 0v2.5M9.5 12.5v3.5M14.5 12.5v3.5',
  heart: 'M12 20s-7.5-4.3-7.5-9.2A4.3 4.3 0 0 1 12 7.9a4.3 4.3 0 0 1 7.5 2.9C19.5 15.7 12 20 12 20Z',
  user: 'M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c0-3.4 3.4-5.5 7.5-5.5s7.5 2.1 7.5 5.5',
  drop: 'M12 3.5c3.2 3.9 5.5 6.8 5.5 9.6a5.5 5.5 0 0 1-11 0c0-2.8 2.3-5.7 5.5-9.6Z',
  scale: 'M4 8h16l-1.5 12h-13L4 8ZM8 8a4 4 0 0 1 8 0M12 12.5v3',
  activity: 'M3 12h4l2.5-6 4 12L16 12h5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4.5 7.5h15M9.5 7.5V5h5v2.5M6.5 7.5 7.5 20h9l1-12.5M10.5 11v5.5M13.5 11v5.5',
  check: 'M4.5 12.5 9.5 17.5 19.5 6.5',
  download: 'M12 4v10.5M8 11l4 4 4-4M4.5 19.5h15',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.2 9.5h17.6M3.2 14.5h17.6M12 3c-2.5 2.6-3.7 5.6-3.7 9s1.2 6.4 3.7 9c2.5-2.6 3.7-5.6 3.7-9S14.5 5.6 12 3Z',
  chevronLeft: 'M14.5 5.5 8 12l6.5 6.5',
  chevronRight: 'M9.5 5.5 16 12l-6.5 6.5',
  sparkles: 'M12 3.5l1.8 4.4 4.4 1.8-4.4 1.8L12 15.9l-1.8-4.4-4.4-1.8 4.4-1.8L12 3.5ZM18 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9L18 15ZM6 15.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z',
  phone: 'M7.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.5 5.7a2 2 0 0 1 2-2.2Z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 10.5V16M12 7.6v.1',
  book: 'M4.5 5.5h5a2.5 2.5 0 0 1 2.5 2.5v11a2 2 0 0 0-2-2H4.5v-11ZM19.5 5.5h-5A2.5 2.5 0 0 0 12 8v11a2 2 0 0 1 2-2h5.5v-11Z',
  shield: 'M12 3.5 19.5 6v6c0 4-3.2 7.3-7.5 8.5C7.7 19.3 4.5 16 4.5 12V6L12 3.5ZM9 12l2 2 4-4',
  play: 'M8 5.5 18 12 8 18.5v-13Z',
  stop: 'M7 7h10v10H7z',
  reset: 'M4.5 12a7.5 7.5 0 1 0 2.6-5.7M4.5 4.5v4.5H9',
  close: 'M6 6l12 12M18 6 6 18',
  hospital: 'M4 20V9.5L12 4l8 5.5V20M9.5 20v-5.5h5V20M12 8.5v3M10.5 10h3',
  bleeding: 'M12 3.5c3 3.7 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5.3 5-9ZM9 14a3 3 0 0 0 3 3',
  headache: 'M12 20a8 8 0 1 1 8-8c0 2.5-1 3.5-2.5 3.5S15 16.5 15 18M12 8.5v4M9.5 10.5h5',
  vision: 'M3 12s3.5-5.5 9-5.5S21 12 21 12s-3.5 5.5-9 5.5S3 12 3 12ZM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4.5 19.5l15-15',
  pain: 'M12 20.5c3.6-2.6 6-5.3 6-8.4a6 6 0 0 0-12 0c0 3.1 2.4 5.8 6 8.4ZM9 11.5h2l1-2 1.5 4 1-2h1.5',
  fluid: 'M6 9.5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5M4 15.5c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0M4 19c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0',
  movement: 'M12 20.5c4 0 7-2.8 7-6.5 0-4.5-4-7.5-7-10-3 2.5-7 5.5-7 10 0 3.7 3 6.5 7 6.5ZM9.5 12.5c.7-1 1.6-1.5 2.5-1.5s1.8.5 2.5 1.5',
  convulsion: 'M13 3 7 13h4l-1 8 7-11h-4l1-7Z',
  breastfeeding: 'M9 4.5a2 2 0 1 1 4 0M11 7v4M8 11h6l.5 4.5h-7L8 11ZM6.5 20c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5M16.5 8.5c1.5 1 2.5 2.5 2.5 4.5',
  leaf: 'M4.5 19.5C4 13 8 6.5 19.5 4.5c1 9-4 15.5-13 14M4.5 19.5c1-4 3.5-7 7-9',
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.7, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
