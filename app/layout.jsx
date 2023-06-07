import "@styles/globals.css";
import Nav from "@components/Nav";
// import Provider from "@components/Provider";

export const metadata = {
  title: "BrainWave",
  description: " Discover &  Share AI ",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>
          {/* <Provider> */}
          <div className="main" v>
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
          {/* </Provider> */}
        </body>
      </html>
    </>
  );
};

export default RootLayout;
