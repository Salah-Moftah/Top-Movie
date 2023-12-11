import "./globals.css";
import type { Metadata } from "next";
import { Footer, Nav } from "@/components";
import { SkeletonTheme } from "react-loading-skeleton";
import { WatchlistProvider } from "@/context/watchlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Home - Top Movie",
  description:
    "Welcome to our website, the perfect place to discover and enjoy the latest movies and series! We offer an exciting and complete experience for film and TV fans, where you can explore a variety of genres including action, drama, sci-fi, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-Inter bg-bg-primary">
        <WatchlistProvider>
          <SkeletonTheme
            borderRadius={16}
            baseColor="#0a2955"
            highlightColor="#193763"
          >
            <Nav />
            {children}
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              icon={false}
            />
          </SkeletonTheme>
        </WatchlistProvider>
      </body>
    </html>
  );
}
