import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link
          href={'/'}
          className="font-medium items-center text-base flex space-x-3"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle:  */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 88 64"
            fill="none"
            color="rgb(194 65 12)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44 0L7.62939e-06 64H88L44 0ZM81.0847 63.3H6.91531L44 55.7145L81.0847 63.3ZM5.42343 62.8907L44 55L82.5766 62.8907L44 49.7396L5.42343 62.8907ZM44 43.7756L5.68805 62.0609L44 49L82.312 62.0609L44 43.7756ZM6.02277 61.1255L44 43L81.9772 61.1255L44 37.8213L6.02277 61.1255ZM44 31.875L6.41667 60.0625L44 37L81.5833 60.0625L44 31.875ZM6.85957 58.8553L44 31L81.1404 58.8553L44 25.9354L6.85957 58.8553ZM44 20.0013L7.34263 57.4918L44 25L80.6574 57.4918L44 20.0013ZM7.85829 55.9631L44 19L80.1416 55.9631L44 14.0716L7.85829 55.9631ZM44 7.1582L7.28012 55.5617L44 13L80.7199 55.5617L44 7.1582ZM9.061 52.056L44 6L78.939 52.0559L44 1.23559L9.061 52.056Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44 0L7.62939e-06 64H88L44 0ZM81.0847 63.3H6.91531L44 55.7145L81.0847 63.3ZM5.42343 62.8907L44 55L82.5766 62.8907L44 49.7396L5.42343 62.8907ZM44 43.7756L5.68805 62.0609L44 49L82.312 62.0609L44 43.7756ZM6.02277 61.1255L44 43L81.9772 61.1255L44 37.8213L6.02277 61.1255ZM44 31.875L6.41667 60.0625L44 37L81.5833 60.0625L44 31.875ZM6.85957 58.8553L44 31L81.1404 58.8553L44 25.9354L6.85957 58.8553ZM44 20.0013L7.34263 57.4918L44 25L80.6574 57.4918L44 20.0013ZM7.85829 55.9631L44 19L80.1416 55.9631L44 14.0716L7.85829 55.9631ZM44 7.1582L7.28012 55.5617L44 13L80.7199 55.5617L44 7.1582ZM9.061 52.056L44 6L78.939 52.0559L44 1.23559L9.061 52.056Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
          <span>linkly</span>
        </Link>
      </div>
      <nav className="flex items-center space-x-3">
        <Link href="/create">Create</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}
