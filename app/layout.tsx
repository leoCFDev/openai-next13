import "./globals.css";

export const metadata = {
  title: "GPT-YOUTUBE",
  description: "Make your video on GPT, one-click",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
