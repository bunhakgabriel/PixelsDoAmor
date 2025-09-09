import { useFieldArray, useFormContext, type FieldValues, type Path, } from 'react-hook-form'
import { style } from '../../utils/classesCssGlobais'
import { IoAdd } from 'react-icons/io5'
import type { Imagem } from '../../models/ISpotify'
import { toast } from 'react-toastify'
import MsgErrorInput from '../MsgErrorInput/MsgErrorInput'

type MultipleImageUploadProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  maxImages: number
}

function MultipleImageUpload<T extends FieldValues>({ name, label, maxImages }: MultipleImageUploadProps<T>) {
  const { control, watch, formState: { errors } } = useFormContext<T>()
  const imagens = watch(name) as Imagem[] || []
  const fieldError = (errors[name] as any)

  const { append, remove } = useFieldArray<T>({
    control,
    name: name as any
  })

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (e.target.files[0] instanceof File) {
      const imagem = e.target.files[0]
      if(imagens.length >= maxImages){
        toast.error('Você só pode adicionar até ' + maxImages + ' imagens.')
        return
      }
      if (imagens.some(img => {
        if (img.imagem instanceof File && img.imagem.name == imagem.name) {
          return true
        }
        return false
      })) {
        toast.error('Essa imagem já foi adicionada!')
        e.target.value = ''
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        append({ imagem: imagem, previewImagem: reader.result } as any)
        e.target.value = ''
      }
      reader.readAsDataURL(imagem)
    }
  }

  return (
    <div className='flex flex-col'>
      <p className={`${style.classLabel} block text-sm font-medium text-gray-700`}>{label}</p>
      <div className='h-[20px] mb-2'>
        {fieldError && <MsgErrorInput msg={fieldError.message || ''} />}
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4">
        <div>
          <label
            htmlFor={`upload-${name}`}
            className={`${fieldError ? style.error : 'border-blue-400'} w-21 h-21 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-dashed rounded-lg flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-50 transition`}
          >
            <IoAdd size={50} className={`${fieldError ? 'text-red-500' : 'text-blue-400'}`} />
          </label>
          <input
            id={`upload-${name}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
        </div>
        {imagens.map((img, index) => (
          <div key={index} className="relative w-21 h-21 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <img src={img.previewImagem} className="object-cover w-full h-full rounded border" alt={`Imagem ${index}`} />
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultipleImageUpload
