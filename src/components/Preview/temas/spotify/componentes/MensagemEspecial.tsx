type mensagemParabensProps = {
  model: {
    autor?: string
    mensagem: string
  }
}

function MensagemEspecial({ model }: mensagemParabensProps) {
  if(!model || model.mensagem == '') return <></>

  return (
    <div className="text-white text-xl edu-nsw-act-cursive">
      <div className="flex flex-col gap-2">
        {model?.mensagem && (
          <p className="text-gray-200 text-center">
            {model.mensagem}  
          </p>
        )}
        {model?.autor && (
          <div className="text-center">
            <span className="font-medium">Assinado: {model.autor}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MensagemEspecial;