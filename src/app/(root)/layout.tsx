import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme-script";

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
