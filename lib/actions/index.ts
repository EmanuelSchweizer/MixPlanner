export async function serverAction<T>(fn: () => Promise<T>) {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}