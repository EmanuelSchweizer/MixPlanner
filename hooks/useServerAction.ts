import { useState, useTransition } from 'react'

type ServerActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export function useServerAction<TArgs, TData>(
  action: (args: TArgs) => Promise<TData>,
  initialData: TData
) {
  const [data, setData] = useState<TData>(initialData)
  const [isPending, startTransition] = useTransition()

  const execute = (args: TArgs): Promise<ServerActionResponse<TData>> => {
    return new Promise((resolve) => {
      startTransition(async () => {
        try {
          const result = await action(args)
          setData(result)
          resolve({ success: true, data: result })
        } catch (error) {
          resolve({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      })
    })
  }

  return {
    Action: execute,
    GetData: data,
    isPending,
  }
}