import "../styles/globals.css";
import ClientThemeProvider from "../components/ClientThemeProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Velora",
  description: "An AI-powered business management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ClientThemeProvider>
          <Header />
          <main style={{ flex: 1, minHeight: "calc(100vh - 120px)", padding: "20px" }}>
            {children}
          </main>
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}