export const metadata = {
  title: 'Posts Salvos',
  description: 'Posts Salvos Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
