import { Controller, type FieldValues, type Path, type PathValue, useFormContext } from "react-hook-form"
import { BsUpload } from "react-icons/bs"
import { converteFileBase64 } from "../../utils/converteFileBase64.ts"
import { style } from "../../utils/classesCssGlobais.ts"
import clsx from "clsx"

type ImageUploadFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  height?: string
  width?: string
}

function ImageUploadField<T extends FieldValues>({ name, label, height, width }: ImageUploadFieldProps<T>) {
  const { control, watch, setValue } = useFormContext<T>()
  const currentValue = watch(name)

  return (
    <div>
      <p className={`${style.classLabel} block text-sm font-medium text-gray-700 mb-2`}>{label}</p>

      {currentValue ? (
        <div className="relative">
          <img
            src={currentValue as string}
            alt="Imagem"
            className={clsx('object-cover rounded-lg border-4 border-blue-100',
              width || 'w-full',
              height || 'h-48'
            )}
          />
          <button
            type="button"
            onClick={() => setValue(name, '' as any)}
            className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue={"" as PathValue<T, Path<T>>}
          render={({ field }) => (
            <div>
              <label
                htmlFor={`file-${name}`}
                className={clsx('rounded-lg bg-blue-50 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors',
                  width || 'w-full',
                  height || 'h-48'
                )}
              >
                <BsUpload className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-blue-600">Faça upload da imagem</span>
              </label>
              <input
                id={`file-${name}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async e => {
                  const base64 = await converteFileBase64(e)
                  field.onChange(base64)
                }}
              />
            </div>
          )}
        />
      )}
    </div>
  )
}

export default ImageUploadField
