import "./globals.css";

export const metadata = {
  title: "SØPHIA",
  description: "Personal AI companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
