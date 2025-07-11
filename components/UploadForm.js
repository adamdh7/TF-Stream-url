import { useState } from 'react'

export default function UploadForm() {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setUrl(data.url)
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
      {url && <p>URL: <a href={url} target="_blank">{url}</a></p>}
    </form>
  )
}
