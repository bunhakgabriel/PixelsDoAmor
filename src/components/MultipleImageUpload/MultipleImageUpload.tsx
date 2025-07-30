import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { converteFileBase64 } from '../../utils/ConverteFileBase64'

type MultipleImageUploadProps = {
  name: string
  form: UseFormReturn<any>
  label: string
}

function MultipleImageUpload({ name, form, label }: MultipleImageUploadProps) {
  const { control, setValue, watch } = form
  const imagens = watch(name) as string[] || []

  const { append, remove } = useFieldArray({
    control,
    name
  })

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64 = await converteFileBase64(e)
    append(base64)
  }

  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>

      <div className="flex flex-wrap gap-4">
        {imagens.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <img src={img} className="object-cover w-full h-full rounded border" alt={`Imagem ${index}`} />
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

      <label
        htmlFor={`upload-${name}`}
        className="mt-4 inline-block w-full h-24 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-50 transition"
      >
        <span>Adicionar imagem</span>
      </label>
      <input
        id={`upload-${name}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAddImage}
      />
    </div>
  )
}

export default MultipleImageUpload
