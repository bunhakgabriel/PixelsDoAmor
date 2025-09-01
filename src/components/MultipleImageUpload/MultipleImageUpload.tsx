import { useFieldArray, useFormContext, type FieldValues, type Path, } from 'react-hook-form'
import { style } from '../../utils/classesCssGlobais'
import { IoAdd } from 'react-icons/io5'
import type { Imagem } from '../../models/ISpotify'

type MultipleImageUploadProps<T extends FieldValues> = {
  name: Path<T>
  label: string
}

function MultipleImageUpload<T extends FieldValues>({ name, label }: MultipleImageUploadProps<T>) {
  const { control, watch } = useFormContext<T>()
  const imagens = watch(name) as Imagem[] || []

  const { append, remove } = useFieldArray<T>({
    control,
    name: name as any
  })

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (e.target.files[0] instanceof File) {
      const imagem = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        append({ imagem: imagem, previewImagem: reader.result } as any)
      }
      reader.readAsDataURL(imagem)
    }
  }

  return (
    <div>
      <p className={`${style.classLabel} block text-sm font-medium text-gray-700 mb-2`}>{label}</p>

      <div className="flex flex-wrap gap-2 sm:gap-4">
        <div>
          <label
            htmlFor={`upload-${name}`}
            className="w-21 h-21 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-50 transition"
          >
            <IoAdd size={50} className='text-blue-400' />
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
