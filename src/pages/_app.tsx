export default function ReactForEnterpriseCourse({ Component, pageProps }) {
  return (
    <div className="layout">
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        React for Enterprise course by{" "}
        <a href="https://twitter.com/tung__vu">Tung Vu</a>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        main {
          flex: 1;
        }

        footer {
          padding: 1rem;
          text-align: center;
        }
        a {
          color: hsl(200, 100%, 50%);
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100%;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
}
