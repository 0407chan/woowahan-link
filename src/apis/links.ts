import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from 'react-query'
import { LinkType } from '../types/link'

export const getLinks = async (): Promise<LinkType[]> => {
  try {
    const doc = new GoogleSpreadsheet(
      process.env.REACT_APP_GOOGLE_SHEETS_ID || ''
    )
    doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_CLIENT_EMAIL || '',
      private_key:
        process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
    })
    await doc.loadInfo()
    const sheets = doc.sheetsByTitle.sheet1

    const rows = (await sheets.getRows()) as any[]
    const newLinkList: LinkType[] = []

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
  options?: UseQueryOptions<LinkType[], unknown, LinkType[], string[]>
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

const addLink = async (link?: LinkType): Promise<GoogleSpreadsheetRow> => {
  try {
    const doc = new GoogleSpreadsheet(
      process.env.REACT_APP_GOOGLE_SHEETS_ID || ''
    )
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_CLIENT_EMAIL || '',
      private_key:
        process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
    })
    await doc.loadInfo()
    const sheets = doc.sheetsByIndex[0]

    const result = await sheets.addRow({
      id: link?.id || '',
      createdAt: link?.createdAt || '',
      service: link?.service || '',
      tags: link?.tags?.join(',') || '',
      team: link?.team || '',
      title: link?.title || '',
      url: link?.url || ''
    })
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useAddLinkMutation = (): UseMutationResult<
  GoogleSpreadsheetRow,
  unknown,
  { link?: LinkType },
  unknown
> => {
  return useMutation(({ link }) => addLink(link))
}

const updateLink = async (link: Partial<LinkType>): Promise<void> => {
  try {
    const doc = new GoogleSpreadsheet(
      process.env.REACT_APP_GOOGLE_SHEETS_ID || ''
    )
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_CLIENT_EMAIL || '',
      private_key:
        process.env.REACT_APP_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
    })
    await doc.loadInfo()
    const sheets = doc.sheetsByIndex[0]

    const rows = await sheets.getRows()

    const currentRow = rows.find((row) => row.id === link.id)
    if (currentRow) {
      currentRow.createdAt = link?.createdAt || ''
      currentRow.service = link?.service || ''
      currentRow.tags = link?.tags?.join(',') || ''
      currentRow.team = link?.team || ''
      currentRow.title = link?.title || ''
      currentRow.url = link?.url || ''
      await currentRow.save()
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useUpdateLinkMutation = (): UseMutationResult<
  // GoogleSpreadsheetRow,
  void,
  unknown,
  { link: Partial<LinkType> },
  unknown
> => {
  return useMutation(({ link }) => updateLink(link))
}
