import clsx from "clsx";
import Snowfall from "react-snowfall"

type SnowfallEfeitoProps = {
  tipo: "flocos" | "coracao-preto" | "coracao-vermelho" | "rosa" | "sem-animacao" | "";
  variant: "preview" | "modal" | "page";
}

function SnowfallEfeito({ tipo, variant }: SnowfallEfeitoProps) {

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
    <div className={clsx(`inset-0 pointer-events-none z-50`, {
      'fixed': variant != 'preview',
      'absolute': variant == 'preview'
    })}>
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
