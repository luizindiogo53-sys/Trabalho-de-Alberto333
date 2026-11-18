import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ETEon",
  description: "ETEon — portal acadêmico das Escolas Técnicas de Pernambuco",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=JSON.parse(localStorage.getItem("escola.theme"));document.documentElement.classList.toggle("dark",theme==="dark");document.documentElement.style.colorScheme=theme==="dark"?"dark":"light";}catch(e){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
