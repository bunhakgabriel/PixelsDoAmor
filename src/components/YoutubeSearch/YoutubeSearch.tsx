import { useState } from 'react'
import type { UseFormReturn, Path, FieldValues } from 'react-hook-form'

type YouTubeSearchProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  apiKey: string
}

function YouTubeSearch<T extends FieldValues>({
  form,
  name,
  label,
  apiKey
}: YouTubeSearchProps<T>) {
  const { setValue, watch } = form
  const selectedVideos = watch(name) as { nome: string; url: string }[] || []

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

  function handleSelect(videoId: string, title: string) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    if (selectedVideos.length >= 5) {
      setError('Você só pode adicionar até 5 músicas.')
      return
    }

    const novoArray = [...selectedVideos, { nome: title, url: embedUrl }]
    setValue(name, novoArray as any)
    setResults([])
    setQuery('')
  }

  function handleRemove(index: number) {
    const novoArray = selectedVideos.filter((_, i) => i !== index)
    setValue(name, novoArray as any)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar no YouTube"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading || !query}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
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

      {selectedVideos.length > 0 && (
        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4 max-h-[250px] overflow-auto">
          {selectedVideos.map((video, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden shadow-sm"
            >
              <iframe
                width=""
                height=""
                className='h-[140px] sm:h-[150px] md:h-[170px] w-full sm:w-[150px] md:w-[220px] lg:w-[215px]'
                src={video.url}
                title={video.nome}
                frameBorder="0"
                allowFullScreen
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default YouTubeSearch
