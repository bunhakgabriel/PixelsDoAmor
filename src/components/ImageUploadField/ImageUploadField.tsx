import { Controller, type FieldValues, type Path, type PathValue, useFormContext } from "react-hook-form"
import { BsUpload } from "react-icons/bs"
import { style } from "../../utils/classesCssGlobais.ts"
import clsx from "clsx"
import type { Imagem } from "../../models/ISpotify.ts"
import { comprimirImagem } from "../../utils/comprimirImagens.ts"

type ImageUploadFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  height?: string
  width?: string
}

function ImageUploadField<T extends FieldValues>({ name, label, height, width }: ImageUploadFieldProps<T>) {
  const { control, watch, setValue, formState: { errors }, trigger } = useFormContext<T>()
  const currentValue: Imagem = watch(name)
  const hasError = (errors[name] as any)?.imagem

  return (
    <div>
      <p className={`${style.classLabel} block text-sm font-medium text-gray-700 mb-2`}>{label}</p>

      {currentValue.previewImagem ? (
        <div className="relative">
          <img
            src={currentValue.previewImagem}
            alt="Imagem"
            className={clsx('object-cover rounded-lg border-4 border-blue-100',
              width || 'w-full',
              height || 'h-48'
            )}
          />
          <button
            type="button"
            onClick={() => {
              setValue(name, {
              imagem: '',
              previewImagem: ''
            } as any)
            trigger(name)
            }}
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
                className={clsx(`${hasError ? style.error : ''} rounded-lg bg-blue-50 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors`,
                  width || 'w-full',
                  height || 'h-48'
                )}
              >
                <BsUpload className={`${hasError ? 'text-red-500' : 'text-blue-500'} h-8 w-8 mb-2`} />
                <span className={`${hasError ? 'text-red-500' : 'text-blue-600'} text-sm`}>Faça upload da imagem</span>
              </label>
              <input
                id={`file-${name}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (!e.target.files) return;
                  if (e.target.files[0] instanceof File) {
                    const originalFile = e.target.files[0];
              
                    try {
                      // 🔽 Comprime a imagem antes de salvar
                      const compressedFile = await comprimirImagem(originalFile, 0.5, 1280, 720);
              
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        field.onChange({
                          imagem: compressedFile,
                          previewImagem: reader.result,
                        });
                      };
                      reader.readAsDataURL(compressedFile);
                    } catch (err) {
                      console.error("Erro ao comprimir imagem:", err);
                    }
                  }
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
