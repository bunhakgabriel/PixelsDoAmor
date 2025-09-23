import Snowfall from "react-snowfall"

type SnowfallEfeitoProps = {
  tipo: "flocos" | "coracao-preto" | "coracao-vermelho" | "rosa"
}

function SnowfallEfeito({ tipo }: SnowfallEfeitoProps) {

  function selectImage(tipo: string) {
    switch (tipo) {
      case 'coracao-preto':
        return "/imagens/animacoes/coracao-preto.png";
      case 'coracao-vermelho':
        return "/imagens/animacoes/coracao-vermelho.png";
      case 'rosa':
        return "/imagens/animacoes/rosa.png";
      default:
        return '';
    }
  }

  const images: HTMLImageElement[] = [
    (() => { const img = new Image(); img.src = selectImage(tipo); return img })(),
  ]
  if(!tipo) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {tipo == 'flocos' ? (
        <Snowfall snowflakeCount={100} />
      ) : (
        <Snowfall
          images={images}
          snowflakeCount={40}
          radius={[15, 30]}
          speed={[1, 3]}
          wind={[-1, 1]}
        />
      )}
    </div>
  )
}

export default SnowfallEfeito
