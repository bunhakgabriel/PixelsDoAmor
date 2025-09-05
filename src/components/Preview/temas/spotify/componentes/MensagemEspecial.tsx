type mensagemParabensProps = {
  model: {
    autor?: string
    mensagem: string
  }
}

function MensagemEspecial({ model }: mensagemParabensProps) {
  if(!model || model.mensagem == '') return <></>

  return (
    <div className="text-white">
      {/* Título com ícone */}
      {/* <div className="flex items-center space-x-2 mb-4">
        <FaRegCommentDots className="text-green-500 text-xl" />
        <h2 className="text-xl sm:text-2xl font-semibold">Mensagem especial</h2>
      </div> */}

      {/* Card da mensagem */}
      <div>
        {/* Nome e ícone */}
        {model?.autor && (
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-semibold">
              {model.autor?.slice(0, 1)}
            </div>
            <span className="font-medium">{model.autor}</span>
          </div>
        )}

        {/* Mensagem */}
        {model?.mensagem && (
          <p className="text-gray-200">
            {model.mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default MensagemEspecial;