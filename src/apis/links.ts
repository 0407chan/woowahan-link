import { GoogleSpreadsheet } from 'google-spreadsheet'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { LinkType } from '../types/link'

export const getLinks = async (): Promise<LinkType[]> => {
  try {
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_SHEETS_ID || '')
    doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_CLIENT_EMAIL || '',
      private_key: process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    })
    await doc.loadInfo()
    const sheets = doc.sheetsByTitle.sheet1

    const rows = await sheets.getRows() as any[]
    const newLinkList:LinkType[] = []

    rows.forEach((item) => {
      newLinkList.push({
        id: item.id,
        url: item.url,
        name: item.name,
        service: item.service,
        tags: item.tags.split(','),
        team: item.team,
        title: item.title
      })
    })
    return newLinkList
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useGetLinks = ({
  options
}: {
    options?: UseQueryOptions<
      LinkType[],
      unknown,
      LinkType[],
      string[]
    >
  }): UseQueryResult<LinkType[], unknown> => {
  return useQuery(
    ['getLinks'],
    async () => {
      return getLinks()
    },
    {
      ...options,
      enabled: options?.enabled
    }
  )
}
