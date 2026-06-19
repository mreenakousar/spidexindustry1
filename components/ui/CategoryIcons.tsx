import { SVGProps } from "react";

export function SportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v6" />
      <path d="M5 8c1.5 4 3 6 7 8 4-2 5.5-4 7-8" />
      <circle cx="12" cy="16" r="2" />
    </svg>
  );
}

export function GymIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12h4l2-2 4 4 2-2 4 2h2" />
      <rect x="1" y="10" width="22" height="4" rx="1" />
    </svg>
  );
}

export function StreetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h18" />
      <path d="M6 8h.01M6 16h.01M18 8h.01M18 16h.01" />
    </svg>
  );
}

export function JacketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7h16v13H4z" />
      <path d="M8 7V4h8v3" />
    </svg>
  );
}

export function GlovesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 12v4a2 2 0 002 2h1" />
      <path d="M12 12v6a2 2 0 002 2h1" />
      <path d="M18 8v10" />
    </svg>
  );
}

export default {
  SportIcon,
  GymIcon,
  StreetIcon,
  JacketIcon,
  GlovesIcon,
};
