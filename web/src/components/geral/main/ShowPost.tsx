export function ShowPost(artigo: any) {
  console.log(artigo.artigo)

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: artigo.artigo }} />
    </>
  )
}
