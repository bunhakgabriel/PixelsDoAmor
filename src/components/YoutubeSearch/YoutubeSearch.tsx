import { useState } from 'react'
import { type Path, type FieldValues, useFormContext } from 'react-hook-form'
import { style } from '../../utils/classesCssGlobais'
import MsgErrorInput from '../MsgErrorInput/MsgErrorInput'
import { toast } from 'react-toastify';

type YouTubeSearchPropsBase<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  apiKey: string;
};

type YouTubeSearchPropsList<T extends FieldValues> = YouTubeSearchPropsBase<T> & {
  type: 'list';
  maxMusicas: number;
};

type YouTubeSearchPropsItem<T extends FieldValues> = YouTubeSearchPropsBase<T> & {
  type: 'item';
};

export type YouTubeSearchProps<T extends FieldValues> =
  | YouTubeSearchPropsList<T>
  | YouTubeSearchPropsItem<T>;

function YouTubeSearch<T extends FieldValues>(
  props: YouTubeSearchProps<T>
) {
  const { name, label, apiKey, type } = props;
  const maxMusicas = type === 'list' ? (props as YouTubeSearchPropsList<T>).maxMusicas : undefined;
  const { setValue, watch, formState: { errors }, trigger } = useFormContext<T>()
  const fieldError = (() => {
    const err = errors[name] as any;
    if (!err) return null;

    if (err.nome?.message) return err.nome;
    if (err.url?.message) return err.url;

    return err;
  })()

  const selectedValue = watch(name)
  const selectedVideos =
    type === 'list'
      ? (selectedValue as { nome: string; url: string }[]) || []
      : (selectedValue as { nome: string; url: string })

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch() {
    if (!query.trim()) return

    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=5&key=${apiKey}`
      )

      if (!response.ok) throw new Error('Erro na requisição ao YouTube')

      const data = await response.json()
      setResults(data.items || [])
    } catch (err: any) {
      setError('Erro ao buscar vídeos.')
    } finally {
      setLoading(false)
    }
  }

  function limparBusca() {
    setResults([])
    setQuery('')
  }

  function handleSelect(videoId: string, title: string) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    if (type === 'list') {
      const currentList = selectedVideos as { nome: string; url: string }[]
      if (maxMusicas && currentList.length >= maxMusicas) {
        toast.error('Você só pode adicionar até ' + maxMusicas + ' músicas.')
        limparBusca()
        return
      }
      if (currentList.some(item => item.nome == title)) {
        toast.error('Essa música já foi adicionada!')
        limparBusca()
        return
      }
      const novoArray = [...currentList, { nome: title, url: embedUrl }]
      setValue(name, novoArray as any)
    } else {
      setValue(name, { nome: title, url: embedUrl } as any)
    }

    limparBusca()
    trigger(name)
  }

  function handleRemove(index?: number) {
    if (type === 'list') {
      const currentList = selectedVideos as { nome: string; url: string }[]
      const novoArray = currentList.filter((_, i) => i !== index)
      setValue(name, novoArray as any)
    } else {
      setValue(name, {
        nome: '',
        url: ''
      } as any)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className={`${style.classLabel} text-sm font-medium text-gray-700`}>{label}</label>

      <div className="flex gap-2">
        <div className='w-full'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no YouTube"
            className={`${fieldError ? style.error : ''} border border-gray-300 rounded px-3 py-2 w-full`}
          />
          <div className='h-[20px]'>
            {fieldError && <MsgErrorInput msg={fieldError.message || ''} />}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading || !query}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 h-[42px]"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}

      {results.length > 0 && (
        <ul className="bg-white border rounded mt-2 max-h-64 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.id.videoId}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item.id.videoId, item.snippet.title)}
            >
              <img
                src={item.snippet.thumbnails.default.url}
                alt="Thumbnail"
                className="w-16 h-10 object-cover rounded"
              />
              <span className="text-sm">{item.snippet.title}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Visualização dos vídeos selecionados */}
      {type === 'list' && Array.isArray(selectedVideos) && selectedVideos.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4 max-h-[250px] overflow-auto">
          {selectedVideos.map((video, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden shadow-sm"
            >
              <iframe
                className="h-[140px] sm:h-[150px] md:h-[170px] w-full sm:w-[150px] md:w-[220px] lg:w-[215px]"
                src={video.url}
                title={video.nome}
                frameBorder="0"
                allowFullScreen
              />
              <button
                type="button"
                onClick={() => {
                  handleRemove(index)
                  trigger(name)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {type === 'item' && selectedVideos && selectedValue?.url && (
        <div className="relative mt-4 w-full max-w-md mx-auto">
          <iframe
            className="w-full h-48 sm:h-56 md:h-64 rounded"
            src={(selectedVideos as { url: string }).url}
            title={(selectedVideos as { nome: string }).nome}
            frameBorder="0"
            allowFullScreen
          />
          <button
            type="button"
            onClick={() => {
              handleRemove()
              trigger(name)
            }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default YouTubeSearch
