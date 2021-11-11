import "tailwindcss/tailwind.css";

export default function ReactForEnterpriseCourse({ Component, pageProps }) {
  return (
    <div className="grid grid-rows-[1fr,72px] h-screen">
      <div className="flex-1 relative">
        <Component {...pageProps} />
      </div>
      <footer className="p-2 text-center">
        React for Enterprise course by{" "}
        <a
          className="text-blue-800 font-bold"
          href="https://twitter.com/tung__vu"
        >
          Tung Vu
        </a>
      </footer>

      <style jsx global>{`
        body {
          overscroll-behavior-y: none;
        }
      `}</style>
    </div>
  );
}
